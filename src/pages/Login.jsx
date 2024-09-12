import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postApi } from "../utils/api";
import Cookies from "js-cookie";
import "../App.css";
import "../styles/loginStyle.css";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function loginApi(data) {
    try {
      const res = await postApi("http://localhost:3000/login", data);
      if (!res.ok) {
        const serverError = await res.json();
        const message = serverError.error;
        alert(message);
        console.log(serverError);
        console.log(message);
        throw new Error(message);
      }
      const resData = await res.json();
      console.log(resData);
      const token = resData.token;
      const message = resData.message;
      console.log(message);
      console.log(token);
      if (!token) {
        throw new Error("Token is undefined");
      }
      navigate("/dashboard");

      // Store the token in a cookie
      Cookies.set("authToken", token);
      reset();
    } catch (error) {
      console.error("Error at loginApi", error);
    }
  }
  function onSubmit(data) {
    loginApi(data);
    console.log(data);
  }

  return (
    <>
      <div className="login-container">
        <h1>Write . Plan . Organize</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Email"
          />
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <h5 className="message">
          Not yet register? <Link to="/register">Create an account.</Link>
        </h5>
      </div>
    </>
  );
}

export default Login;
