import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Cookie from "js-cookie";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NewLessonPlan from "../pages/NewLessonPlan";
import ViewLessonPlan from "../pages/ViewLessonPlan";
import EditLessonPlan from "../pages/EditLessonPlan";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<PublicRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<PublicRoutes />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewLessonPlan />} />
          <Route path="/view/lessonplan/:id" element={<ViewLessonPlan />} />
          <Route path="/edit/lessonplan/:id" element={<EditLessonPlan />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<h1>404: Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

function PublicRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  const selectedRoutes = ["/login", "/register"];
  const isRouteSelected = selectedRoutes.includes(pathname);

  const authToken = Cookie.get("authToken");
  // if authToken is present, redirect to dashboard
  if (authToken && isRouteSelected) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
}

function PrivateRoutes() {
  const authToken = Cookie.get("authToken");
  if (!authToken) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default AppRoutes;
