import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const AddCategory = () => {
  const addCategorySchema = Yup.object({
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("image is required"),
    description: Yup.string().required("description is required"),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <>
      <div className=" p-6 min-h-full">
        <div className="flex ">
          <div className="w-full max-w-2xl   p-8">
            {/* Header */}
            <div className=" mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Add Category 👋
              </h2>
              <p className="text-md text-gray-500 mt-2">
                Create or Add Categories here
              </p>
            </div>

            <Formik
              initialValues={{ name: "", image: "", description: "" }}
              validationSchema={addCategorySchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const res = await axios.post(
                    "https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category",
                    values,
                  );

                  setSuccess("Category added successfully!");
                  setError("");
                  resetForm();
                } catch (err) {
                  setError(err.response?.data?.message || "Invalid details");
                  setSuccess("");
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
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      {errors.name && touched.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <input
                        name="image"
                        type="text"
                        value={values.image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      {errors.image && touched.image && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.image}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    {errors.description && touched.description && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* API Error */}
                  {error && (
                    <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  {/* Success Message */}
                  {success && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 text-sm p-3 rounded-lg mt-4">
                      <FaCheckCircle className="text-green-600" />
                      <span>{success}</span>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-60"
                  >
                    {isSubmitting ? "Adding Category..." : "Add Category"}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCategory;
