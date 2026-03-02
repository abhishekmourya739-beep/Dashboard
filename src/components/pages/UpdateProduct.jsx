import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";

const UpdateProduct = ({ open, onClose, product, setUpdate }) => {
  //   console.log(product);

  //   destructuring the product fields from object
  const {
    id,
    name,
    image,
    description,
    material,
    price,
    discount,
    sold,
    revenue,
    tags,
    rating,
    categoryId,
  } = product;

  //to fetch categories for dropdown

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  //   to clear success message when open
  useEffect(() => {
    if (open) {
      setSuccess("");
      setError("");
    }
  }, [open]);

  const addProductSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("image is required"),
    description: Yup.string().required("description is required"),
    material: Yup.string().required("Material is required"),
    price: Yup.string().required("Price is required"),
    discount: Yup.string().required("discount is required"),
    sold: Yup.string().required("sold is required"),
    revenue: Yup.string().required("revenue is required"),
    tags: Yup.string().required("tags is required"),
    rating: Yup.string().required("rating is required"),
    categoryId: Yup.string().required("category is required"),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 3, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
          },
        }}
      >
        {/* Title + Close icon */}
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1,
          }}
        >
          Update Product
          <IconButton size="small" color="error" onClick={onClose}>
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <div className=" p-6 min-h-full">
            <div className="flex ">
              <div className="w-full p-8">
                <Formik
                  initialValues={{
                    name,
                    image,
                    description,
                    material,
                    price,
                    discount,
                    sold,
                    revenue,
                    tags,
                    rating,
                    categoryId,
                  }}
                  validationSchema={addProductSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      const res = await axios.put(
                        ` https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/product/${id}`,
                        values,
                      );
                      setUpdate((u) => u + 1);

                      setSuccess("Product Updated successfully!");
                      setError("");
                      resetForm({ values });
                    } catch (err) {
                      setError(
                        err.response?.data?.message || "Invalid details",
                      );
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
                      <fieldset className=" rounded-md p-4 mb-4">
                        <legend style={{ position: "absolute" }}>
                          Product Information
                        </legend>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <TextField
                              label=" Product Name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />
                            {errors.name && touched.name && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <TextField
                              label=" Product Image"
                              name="image"
                              value={values.image}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />
                            {errors.image && touched.image && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.image}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <TextField
                            multiline
                            rows={4}
                            label=" Product Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            size="small"
                            sx={{
                              mt: 1,
                            }}
                          />

                          {errors.description && touched.description && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.description}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <TextField
                              label=" Product Material"
                              name="material"
                              value={values.material}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />

                            {errors.material && touched.material && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.material}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <TextField
                              type="number"
                              label=" Product Price"
                              name="price"
                              value={values.price}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />
                            {errors.price && touched.price && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.price}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <TextField
                              type="number"
                              label=" Product discount"
                              name="discount"
                              value={values.discount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />
                            {errors.discount && touched.discount && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.discount}
                              </p>
                            )}
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className=" rounded-md p-4 mb-4">
                        <legend style={{ position: "absolute" }}>
                          Product Category
                        </legend>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <TextField
                              select
                              label="Category"
                              name="categoryId"
                              value={values.categoryId ?? ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              //   error={Boolean(errors.categoryId)}
                              //   helperText={errors.categoryId}
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            >
                              <MenuItem value="">Select category</MenuItem>
                              {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </MenuItem>
                              ))}
                            </TextField>

                            {errors.categoryId && touched.categoryId && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.categoryId}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <TextField
                              type="number"
                              label=" Quantity Sold"
                              name="sold"
                              value={values.sold}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />

                            {errors.sold && touched.sold && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.sold}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <TextField
                              type="number"
                              label="   Total Revenue"
                              name="revenue"
                              value={values.revenue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />
                            {errors.revenue && touched.revenue && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.revenue}
                              </p>
                            )}
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className=" rounded-md p-4 mb-4">
                        <legend style={{ position: "absolute" }}>
                          Additional Information
                        </legend>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <TextField
                              label="Tags"
                              name="tags"
                              value={values.tags}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            ></TextField>

                            {errors.tags && touched.tags && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.tags}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <TextField
                              type="number"
                              label=" avgRating"
                              name="rating"
                              value={values.rating}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 2,
                              }}
                            />

                            {errors.rating && touched.rating && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.rating}
                              </p>
                            )}
                          </div>
                        </div>
                      </fieldset>

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
                        {isSubmitting ? "Adding Product..." : "Add Product"}
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProduct;
