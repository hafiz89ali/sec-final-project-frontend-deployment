import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { deleteApiWithToken, getApiWithToken } from "../utils/api";
import { formatDate } from "../utils/dateFormat";
import "../App.css";
import "../styles/dashboardStyle.css";
import iconAdd from "../assets/iconAdd.svg";
import iconPower from "../assets/iconPower.svg";

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  async function fetchLinks() {
    try {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      const serverRes = await getApiWithToken(
        "http://localhost:3000/lessonplans",
        token
      );
      if (!serverRes.ok) {
        alert("You are not authorized to view this page.");
      }
      const data = await serverRes.json();
      setLinks(data.data);
      setUserName(data.username);
    } catch (error) {
      console.error("Error at fetchLessonPlans");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteLessonPlan(id) {
    if (window.confirm("Are you sure you want to delete this lesson plan?")) {
      try {
        const token = Cookies.get("authToken");
        const serverRes = await deleteApiWithToken(
          `http://localhost:3000/delete/lessonplan/${id}`,
          token
        );
        if (!serverRes.ok) {
          alert("You are not authorized to delete this lesson plan.");
        }
        alert("Lesson plan deleted successfully");
        fetchLinks();
      } catch (error) {
        console.error("Error at deleteLessonPlan");
        alert("Error at deleteLessonPlan");
      }
    }
  }

  useEffect(function () {
    fetchLinks();
  }, []);

  function handleLogOut() {
    Cookies.remove("authToken");
    navigate("/login");
  }

  return (
    <body>
      <div className="main-area">
        <div className="profile-sect">
          {/* <div className="profile-icon"></div> */}
          <div className="greeting">
            <h3 style={{ textTransform: "capitalize" }}>
              Selamat Datang, {userName}
            </h3>
          </div>
        </div>
        <div className="action-sect">
          {/* <p>Action Section</p> */}
          <div className="action">
            <Link to="/new">
              <img src={iconAdd} alt="" />
            </Link>
          </div>
          <div className="action">
            <Link onClick={handleLogOut}>
              <img src={iconPower} alt="" />
            </Link>
          </div>
        </div>
        <div className="content-area">
          {/* <p>Contents Area</p> */}
          <h3>Rancangan Pengajaran Harian</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id}>
                  <td>{formatDate(link.date)}</td>
                  <td>{link.time}</td>
                  <td>{link.subject_name}</td>
                  <td>{link.title}</td>
                  <td>
                    <div className="actionButton">
                      <Link to={`/view/lessonplan/${link.id}`}>View</Link>
                      <Link to={`/edit/lessonplan/${link.id}`}>Edit</Link>
                      <Link onClick={() => deleteLessonPlan(link.id)}>
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
}

export default Dashboard;
