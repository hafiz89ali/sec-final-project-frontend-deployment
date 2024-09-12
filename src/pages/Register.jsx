import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postApi } from "../utils/api";
import "../App.css";
import "../styles/loginStyle.css";

function Register() {
  const { register, handleSubmit } = useForm();

  async function registerApi(data) {
    try {
      const res = await postApi("http://localhost:3000/register", data);
      // Check if the response is not okay by using the ok property of the response object
      if (!res.ok) {
        const serverError = await res.json();
        console.log(serverError);
        const error = serverError.error;
        console.log(error);

        if (error && Array.isArray(error)) {
          error.forEach((error) => {
            alert(error);
          });
        } else {
          alert(error);
        }
        throw new Error(serverError);
      }

      const resData = await res.json();
      console.log(resData);
      alert("User registered successfully");
      res();
    } catch (error) {
      console.error("Error at registerApi:", error);
      // alert(error.message);
    }
  }

  function onSubmit(data) {
    registerApi(data);
    console.log(data);
  }

  return (
    <>
      <div className="login-container">
        <h2>Register to start writing your lesson plan.</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
          action="#"
        >
          <input {...register("username")} type="text" placeholder="Username" />
          <input {...register("email")} type="text" placeholder="Email" />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
          />
          <button>Register</button>
        </form>
        <h5 className="message">
          Already registered? <Link to="/login">Login</Link>
        </h5>
      </div>
    </>
  );
}

export default Register;
