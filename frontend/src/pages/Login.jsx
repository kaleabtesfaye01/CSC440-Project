import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithMicrosoft } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await login(values);
      setStatus({ success: "Login successful" });
      navigate("/"); // redirect to protected route
    } catch (error) {
      console.error("Login error:", error);
      setStatus({ error: "Login failed. Please check your credentials." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await loginWithMicrosoft();
      navigate("/");
    } catch (error) {
      console.error("Apple login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 ">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center animate-fade-in transition duration-500">
        <h2 className="text-3xl font-semibold mb-4">Welcome back!</h2>
        <p className="text-sm text-gray-500 mb-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4 text-left">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-label="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  aria-label="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </div>

              {status?.error && (
                <div className="text-red-500 text-sm text-center">
                  {status.error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-2 bg-black text-white rounded-xl hover:bg-gray-800 transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="my-6 flex items-center justify-center text-sm text-gray-400">
          <hr className="flex-grow border-t border-gray-200" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-200" />
        </div>

        <div className="space-y-3 mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <button
            onClick={handleMicrosoftLogin}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/448239/microsoft.svg"
              alt="Apple"
              className="h-5 w-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">
              Continue with Microsoft
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
