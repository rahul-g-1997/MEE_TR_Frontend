import style from "./signin.module.css";
import { useState } from "react"; // Import useState hook if you plan to manage form state

export default function Signin() {
  // You can use useState hook to manage form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Handle form submission logic here, e.g., make an API request to authenticate the user
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className={style.container}>
      <div className={style.background}>
        <div className={style.shape}></div>
        <div className={style.shape}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
        <button type="submit">Registr</button>
      </form>
    </div>
  );
}
