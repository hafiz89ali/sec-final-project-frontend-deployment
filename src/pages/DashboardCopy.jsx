import { Link, useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import "../App.css";
import "../styles/dashboardStyle.css";
import iconMessage from "../assets/iconMessage.svg";
import iconBell from "../assets/iconBell.svg";
import iconAdd from "../assets/iconAdd.svg";
import iconSetting from "../assets/iconSetting.svg";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <body>
        <div className="side-nav">
          {/* <p>Side Navigation</p> */}
          <SideNav />
        </div>
        <div className="main-area">
          <div className="sub-main1">
            <div className="profile-sect">
              <div className="profile-icon"></div>
              <div className="greeting">
                <h3>Selamat Datang</h3>
                <h3>Afifah Aliya</h3>
              </div>
            </div>
            <div className="comm-sect">
              <a href="#">
                <img src={iconMessage} alt="message" />
              </a>
              <a href="#">
                <img src={iconBell} alt="notification" />
              </a>
            </div>
          </div>
          <div className="action-sect">
            {/* <p>Action Section</p> */}
            <div className="action">
              <img src={iconAdd} alt="" />
            </div>
          </div>
          <div className="content-area">
            {/* <p>Contents Area</p> */}
            <h3>Rancangan Pengajaran Harian</h3>
            {/* <div>
              <p>Sorting Area</p>
              <div className="sort-area">
                <label>Susun Mengikut</label>
                <div className="dropdown-content">
                  <a href="#">Kelas</a>
                  <a href="#">Matapelajaran</a>
                  <a href="#">Tarikh</a>
                </div>
              </div>
            </div> */}
            <div>{/* <p>Real Contents</p> */}</div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;
