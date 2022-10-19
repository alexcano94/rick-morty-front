import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import styles from "./styles.module.css";

export type UserLoginData = {
  email: string;
  password: string;
};

export const Login = () => {
  document.body.style.overflow = "hidden";
  const { login, user } = useAuth();
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
  });

  const onSubmit: SubmitHandler<UserLoginData> = async (data) => {
    setUserData(data);
    const errors = await login(data.email, data.password);
    console.log(errors);
    if (errors === undefined) {
      console.log("tiene que navegar");
      navigate("/", { replace: true });
      navigate(0);
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
