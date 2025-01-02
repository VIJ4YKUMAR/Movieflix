import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/authservice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePasswordMatch = (e: any) => {
    if (e.target.value !== password) {
      return "passwrods don't match"
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form className="p-5" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
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
        <input
          type="password"
          placeholder="Re-enter Password"
          onChange={handlePasswordMatch}
          className="w-full text-black p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
