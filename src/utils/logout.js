import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
function handleLogout() {
  Cookies.remove("authToken");
  navigate("/login");
}

export default handleLogout;
