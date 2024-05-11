import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in successfully")
      navigate('/course-listing')
    } catch (err) {
        console.error('Failed to sign in', err);
    }
  };
  return (
    <div className="flex flex-col mt-10">
      <input
        type="email"
        placeholder="Email..."
        className="mb-5 rounded-lg p-2 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        className="mb-5 rounded-lg p-2 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> 
      <button onClick={handleSignIn} className="bg-sky-700 text-black rounded-lg py-2 px-5">Sign In</button>
    </div>
  );
};

export default SignIn;
