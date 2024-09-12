import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getApiWithToken, putApiWithToken } from "../utils/api";
import Cookies from "js-cookie";
import "../styles/viewLessonPlan.css";
import iconHome from "../assets/iconHome.svg";
import iconFileEdit from "../assets/iconFileEdit.svg";

function EditLessonPlan() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonPlan, setLessonPlan] = useState({});
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function editLP(data) {
    try {
      const token = Cookies.get("authToken");
      const serverRes = await putApiWithToken(
        `http://localhost:3000/edit/lessonplan/${id}`,
        token,
        data
      );
      if (!serverRes.ok) {
        alert("You are not authorized to edit this lesson plan.");
        return;
      }
      alert("Lesson plan edited successfully");
    } catch (error) {
      console.error("Error at editLP");
      alert("Error at editLP");
    }
  }

  function onSubmit(data) {
    editLP(data);
    console.log(data);
  }

  return (
    <div className="viewLessonPlan">
      <div className="action-sect">
        {/* <p>Action Section</p> */}
        <div className="action">
          <Link to="/dashboard">
            <img src={iconHome} alt="" />
          </Link>
        </div>
        <div className="action">
          <Link to={`/edit/lessonplan/${id}`}>
            <img src={iconFileEdit} alt="" />
          </Link>
        </div>
      </div>
      {/* <h1>View Lesson Plan</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} id="newLP" className="newLP">
        <label for="title">Title:</label>
        <input
          {...register("title")}
          defaultValue={lessonPlan.title}
          type="text"
          id="title"
          name="title"
        />
        <label for="date">Date:</label>
        <input
          {...register("date")}
          defaultValue={lessonPlan.date}
          type="date"
          id="date"
          name="date"
        />
        <label for="time">Time:</label>
        <input
          {...register("time")}
          defaultValue={lessonPlan.time}
          type="time"
          id="time"
          name="time"
        />
        <label for="class_name">Class Name:</label>
        <input
          {...register("className")}
          defaultValue={lessonPlan.class_name}
          type="text"
          id="className"
          name="className"
        />
        <label for="subject_name">Subject Name:</label>
        <input
          {...register("subjectName")}
          defaultValue={lessonPlan.subject_name}
          type="text"
          id="subjectName"
          name="subjectName"
        />
        <label for="lesson_plan_text">Lesson Plan:</label>
        <textarea
          {...register("lessonPlan")}
          defaultValue={lessonPlan.lesson_plan}
          id="lessonPlan"
          name="lessonPlan"
          rows="4"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditLessonPlan;
