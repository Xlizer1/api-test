import Link from "next/link";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

function index() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/Login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        window.location.assign("/Login");
      } else {
        console.log(user);
      }
    } else {
      window.location.assign("/Login");
    }
  }, []);
  return (
    <div className="app">
      <h1>HomePage</h1>
      <input type="submit" value="Logout" className="input" onClick={logout} />
    </div>
  );
}

export default index;
