import { redirect } from "react-router-dom";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    throw redirect("/login");
  }

  return null;
};

export default requireAuth;
