import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "../Reducers/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const existingUser = storedUsers.find(
        (user: any) => user.email === email
      );

      if (!existingUser) {
        throw new Error("No account exists with this email.");
      }

      if (existingUser.password !== password) {
        throw new Error("Incorrect email or password.");
      }

      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      dispatch(loginAction(existingUser));
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center">
      <form className="p-5" onSubmit={handleSubmit}>
        <>
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black p-2 border rounded mb-3"
            required
          />
          <button type="submit" className="w-full bg-green-500 p-2 rounded">
            Login
          </button>
        </>
        <div className="mt-4">
          <p className="text-center mb-4">Or</p>
          <button
            className="w-full bg-red-500 p-2 rounded"
            onClick={onSignupClick}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
