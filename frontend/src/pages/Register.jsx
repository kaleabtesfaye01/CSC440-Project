import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loginWithMicrosoft } = useAuth();

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("Required"),
    lastname: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    agree: Yup.boolean().oneOf([true], "You must agree to continue"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await register(values);
      setStatus({ success: "Registration successful" });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setStatus({ error: "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleMicrosoftRegister = async () => {
    try {
      await loginWithMicrosoft();
      navigate("/");
    } catch (error) {
      console.error("Microsoft login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center animate-fade-in transition duration-500">
        <h2 className="text-3xl font-semibold mb-1">Create an account</h2>
        <p className="text-sm text-gray-500 mb-6 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </button>
        </p>

        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            agree: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4 text-left">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    aria-label="First name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                    aria-label="Last name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

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

              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-label="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <div className="flex items-start gap-2">
                <Field type="checkbox" name="agree" className="mt-1" />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              <ErrorMessage
                name="agree"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              {status?.error && (
                <div className="text-red-500 text-sm text-center">
                  {status.error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="my-6 flex items-center justify-center text-sm text-gray-400">
          <hr className="flex-grow border-t border-gray-200" />
          <span className="mx-4 text-gray-500">Or register with</span>
          <hr className="flex-grow border-t border-gray-200" />
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleRegister}
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
            onClick={handleMicrosoftRegister}
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
