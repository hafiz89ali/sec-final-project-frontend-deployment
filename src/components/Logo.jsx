import { Link, useNavigate } from "react-router-dom";
import iconPencil from "../assets/iconPencil.svg";
import "../styles/logo.css";

function Logo() {
  const navigate = useNavigate();
  return (
    <>
      <div className="logo">
        <img src={iconPencil} alt="logo" />
        <h3>Lesson</h3>
        <div className="line"></div>
        <h3>Plan</h3>
        <div className="line"></div>
      </div>
    </>
  );
}

export default Logo;
