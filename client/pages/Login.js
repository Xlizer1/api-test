import Link from "next/link";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
  };

  function loginUser(e) {
    e.preventDefault();

    axios.post("http://localhost:4000/login", user).then((res) => {
      if (res.data === "bad passowrd" || res.data === "User NOT Found!!!") {
        alert(res.data);
      } else {
        window.location.assign("/");
        localStorage.setItem("token", res.data.user);
      }
    });
  }

  return (
    <div className="loginForm">
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input
            value={user.email}
            id="email"
            onChange={handleChange}
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <label>Passowrd</label>
          <input
            value={user.password}
            id="password"
            onChange={handleChange}
            type="passowrd"
            placeholder="password"
          />
        </div>
        <input
          className="input"
          type="submit"
          value="Login"
          onClick={loginUser}
        />
      </form>
      <label>
        <span>you don't have an account? </span>
        <Link href="/Register">
          <a>Register</a>
        </Link>
      </label>
    </div>
  );
}

export default Login;
