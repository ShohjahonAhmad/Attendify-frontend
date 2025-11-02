import { redirect } from "react-router-dom";

const requireAuth = () => {
  if (localStorage.getItem("token") === null) {
    throw redirect("/login");
  }
};

export default requireAuth;
