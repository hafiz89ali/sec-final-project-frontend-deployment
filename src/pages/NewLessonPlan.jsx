import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postApi, postApiWithToken } from "../utils/api";
import Cookies from "js-cookie";
import "../styles/newLPStyle.css";
function NewLessonPlan() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function NewLP(data) {
    try {
      // setIsLoading(true);
      const token = Cookies.get("authToken");
      const res = await postApiWithToken(
        "http://localhost:3000/newlessonplan",
        data,
        token
      );
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
      const message = resData.message;
      console.log(message);
      if (!Cookies.get("authToken")) {
        throw new Error("Token is undefined");
      }
      alert("Lesson Plan created successfully");
      navigate("/dashboard");
      reset();
    } catch (error) {
      console.error("Error at newLP", error);
    }
  }

  function onSubmit(data) {
    NewLP(data);
    console.log(data);
  }
  return (
    <>
      <div>
        <h1>New Lesson Plan</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="newLP" className="newLP">
          <label for="title">Title:</label>
          <input {...register("title")} type="text" id="title" name="title" />
          <label for="date">Date:</label>
          <input {...register("date")} type="date" id="date" name="date" />
          <label for="time">Time:</label>
          <input {...register("time")} type="time" id="time" name="time" />
          <label for="class_name">Class Name:</label>
          <input
            {...register("className")}
            type="text"
            id="className"
            name="className"
          />
          <label for="subject_name">Subject Name:</label>
          <input
            {...register("subjectName")}
            type="text"
            id="subjectName"
            name="subjectName"
          />
          <label for="lesson_plan_text">Lesson Plan:</label>
          <textarea
            {...register("lessonPlan")}
            id="lessonPlan"
            name="lessonPlan"
            rows="4"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewLessonPlan;
