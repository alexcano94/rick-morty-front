import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import styles from "./styles.module.css";

export type UserSignupData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup = () => {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserSignupData>();
  const password = useRef({});
  password.current = watch("password", "");

  const [userData, setUserData] = useState<UserSignupData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit: SubmitHandler<UserSignupData> = async (data) => {
    setUserData(data);
    const errors = await signup(userData.username, userData.email, userData.password);
    if (errors) {
      console.log(errors);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.cardForm} onSubmit={handleSubmit(onSubmit)}>
        <h3>Welcome back!</h3>
        <div className={styles.loginInput}>
          <label>
            <b>Username: </b>
          </label>
          <input
            {...register("username", { required: true })}
            placeholder="E.g: EvilMorty"
            type="text"
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div className={styles.loginInput}>
          <label>
            <b>E-mail: </b>
          </label>
          <input
            {...register("email", { required: true })}
            placeholder="E.g: rick@vindicators.dub"
            type="text"
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className={styles.loginInput}>
          <label>
            <b>Password: </b>
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            placeholder="8 characters are mandatory"
            type="password"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className={styles.loginInput}>
          <label>
            <b>Password: </b>
          </label>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            placeholder="Type it again"
            type="password"
          />
          {errors.confirmPassword && <span>This field is required</span>}
        </div>
        <button className={styles.loginButton} type="submit">
          Sign Up
        </button>
        Already have a portal gun?
        <Link to={`/login`}>Log In</Link>
      </form>
    </div>
  );
};
