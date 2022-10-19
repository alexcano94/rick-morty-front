import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import styles from "./styles.module.css";

export type UserLoginData = {
  username: string;
  email: string;
  password: string;
};

export const Login = () => {
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
  } = useForm<UserLoginData>();

  const [userData, setUserData] = useState<UserLoginData>({
    email: "",
    password: "",
    username: "",
  });

  const onSubmit: SubmitHandler<UserLoginData> = async (data) => {
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
            <b>E-mail: </b>
          </label>
          <input
            {...register("email", { required: true })}
            placeholder="Your awesome email address"
            type="text"
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className={styles.loginInput}>
          <label>
            <b>Password: </b>
          </label>
          <input
            {...register("password", { required: true })}
            placeholder="Your so secret password"
            type="password"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button className={styles.loginButton} type="submit">
          Log In
        </button>
        Not registered yet?
        <Link to={`/signup`}>Singup!</Link>
      </form>
    </div>
  );
};
