import { Link, useNavigate } from "react-router-dom";
import "../styles/componentSideNav.css";
import Logo from "./Logo";
import iconHome from "../assets/iconHome.svg";
import iconPaper from "../assets/iconPaper.svg";
import iconSetting from "../assets/iconSetting.svg";
import iconPower from "../assets/iconPower.svg";
// import "../App.css";

function SideNav() {
  const navigate = useNavigate();
  return (
    <>
      <div className="sideNav">
        {/* <p>Side Navigation</p> */}
        <Logo />
        <menu>
          <li>
            <a href="#">
              <img src={iconHome} alt="home" />
              <h4>Laman</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={iconPaper} alt="home" />
              <h4>RPH</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={iconPaper} alt="home" />
              <h4>RPT</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={iconSetting} alt="home" />
              <h4>Tetapan</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={iconPower} alt="home" />
              <h4>Keluar</h4>
            </a>
          </li>
        </menu>
      </div>
    </>
  );
}

export default SideNav;
