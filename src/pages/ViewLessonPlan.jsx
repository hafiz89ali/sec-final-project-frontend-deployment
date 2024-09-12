import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getApiWithToken } from "../utils/api";
import Cookies from "js-cookie";
import dateFormat from "dateformat";
import "../styles/viewLessonPlan.css";
import iconHome from "../assets/iconHome.svg";
import iconFileEdit from "../assets/iconFileEdit.svg";

function ViewLessonPlan() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonPlan, setLessonPlan] = useState({});

  async function fetchLinks() {
    try {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      const serverRes = await getApiWithToken(
        `https://sec-final-project-deployment.onrender.com//view/lessonplan/${id}`,
        token
      );
      if (!serverRes.ok) {
        alert("You are not authorized to view this page.");
      }
      const data = await serverRes.json();
      setLessonPlan(data.data);
    } catch {
      console.error("Error at fetchLessonPlans");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchLinks();
  }, []);

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
      <h1>{lessonPlan.title}</h1>
      <div className="lessonPlanDetails">
        <p>{lessonPlan.subject_name} .</p>
        <p>{lessonPlan.class_name} .</p>
        <p>{dateFormat(lessonPlan.date, "dd/mm/yyyy")}</p>
        <p>{lessonPlan.time}</p>
      </div>
      <p>{lessonPlan.lesson_plan}</p>
    </div>
  );
}

export default ViewLessonPlan;
