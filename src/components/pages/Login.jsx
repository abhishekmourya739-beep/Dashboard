import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const loginSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to your dashboard
          </p>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await axios.post(
                "https://dummyjson.com/auth/login",
                values,
              );

              sessionStorage.setItem("token", res.data.accessToken);
              setError("");
              navigate("/dashboard");
            } catch (err) {
              setError(err.response?.data?.message || "Invalid credentials");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.username && touched.username && (
                  <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.password && touched.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* API Error */}
              {error && (
                <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
