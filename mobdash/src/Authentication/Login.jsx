import React, { useState } from "react";
import Image from "../assets/image.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  // console.log("inputCaptcha-", inputCaptcha);
  // console.log("captcha-", captcha);

  console.log("isCaptchaValid-", isCaptchaValid);
  //   console.log("errors-", errors);
  // Function to generate a random string for CAPTCHA
  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setCaptcha(captcha);
    setIsCaptchaValid(false); // Reset captcha validation
  };

  useState(() => {
    generateCaptcha();
  }, []);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Initialize or clear previous errors
    setErrors({});

    // Basic front-end validation
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!inputCaptcha) newErrors.captcha = "CAPTCHA is required";
    else if (inputCaptcha !== captcha)
      newErrors.captcha = "CAPTCHA is incorrect";
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0 && isCaptchaValid) {
      try {
        setLoader(true);
        const response = await axios.post(
          "https://api.cyberbriefs.org/mobility/login/",
          {
            email,
            password,
          }
        );

        let token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        // Assuming the API returns a success message
        setLoader(false);
        toast({
          title: "Login successful",
          description: response.data.message, // Example: Use a message returned from your API if available
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        // Reset form and state after successful login
        setEmail("");
        setPassword("");
        setInputCaptcha("");
        generateCaptcha(); // Generate new captcha for security purposes
        // Optionally, redirect the user or perform further actions after login
        navigate("/");
      } catch (error) {
        if (error.response) {
          setLoader(false);
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          // Example: Displaying error message from server
          toast({
            title: "An error occurred",
            description:
              error.response.data.message || "Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setLoader(false);

          console.log(error.request);
          toast({
            title: "Network error",
            description: "Please check your internet connection and try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoader(false);

          console.log("Error", error.message);
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    }
  };

  // Function to handle changes in CAPTCHA input
  const handleCaptchaChange = (e) => {
    setInputCaptcha(e.target.value);
    if (e.target.value === captcha) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h5 className="text-sm font-normal text-gray-500 text-center">
          Welcome Back!
        </h5>
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login to your Account
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.email && "border-red-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.password && "border-red-500"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="captcha mb-4 flex items-center">
            <div
              className="bg-cyan-300 text-center rounded-md shadow-sm p-2 mr-2"
              style={{ width: "160px", backgroundColor: "#d9d9d9" }}
            >
              {captcha}
            </div>
            <input
              type="text"
              id="captcha"
              value={inputCaptcha}
              onChange={handleCaptchaChange}
              className={`w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.captcha && "border-red-500"
              }`}
              placeholder="Enter CAPTCHA"
            />
            <button
              type="button"
              onClick={generateCaptcha}
              className="ml-2 px-3 py-2 bg-gray-300 rounded-md shadow-sm hover:bg-gray-400"
            >
              Refresh
            </button>
          </div>
          <Button
            isLoading={loader}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </Button>
        </form>
        <div className="text-lg text-center mt-4">
          Not Registered?{" "}
          <Link to="/signup" className="text-cyan-600 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
