import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";

import { GridCloseIcon } from "@mui/x-data-grid";
const ProductView = ({ open, onClose, product }) => {
  const originalPrice = product.price;
  const discount = product.discount; // in %
  const finalPrice = Math.round(
    originalPrice - (originalPrice * discount) / 100,
  );
  //to fetch category name to display instead of id
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category")
      .then((res) => setCategory(res.data))
      .catch((err) => console.error(err));
  }, []);

  const categoryName =
    category.find((c) => c.id === product.categoryId)?.name || "Unknown";
  return (
    <>
      {/* modal for get by id */}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              p: 2,
              ml: 20,
            },
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          {product.name}
          <IconButton onClick={onClose}>
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent>
          {/* TOP SECTION */}
          <Grid container spacing={3}>
            {/* Image */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  width: 240,
                  height: 240,
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#f5f5f5",
                  flexShrink: 0,
                }}
              >
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 🔥 KEY LINE
                  }}
                />
              </Box>
            </Grid>

            {/* Details */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Price Section */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
              >
                {/* Discount Badge */}
                {discount > 0 && (
                  <Box
                    sx={{
                      backgroundColor: "#E6F4EA",
                      color: "#137333",
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {discount}% OFF
                  </Box>
                )}

                {/* Final Price */}
                <Typography sx={{ fontSize: 24, fontWeight: 800 }}>
                  ₹{finalPrice}
                </Typography>
              </Box>

              {/* Original Price */}
              {discount > 0 && (
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    fontSize: 18,
                    marginBottom: "15px",
                  }}
                >
                  ₹{originalPrice}
                </Typography>
              )}

              <Typography fontSize={14}>
                <strong>Material:</strong> {product.material}
              </Typography>

              <Typography fontSize={14}>
                <strong>Category:</strong> {categoryName}
              </Typography>

              <Typography fontSize={14}>
                <strong>Quantity Sold:</strong> {product.sold}
              </Typography>

              <Typography fontSize={14}>
                <strong> Average Rating:</strong> {product.rating}
              </Typography>

              <Typography fontSize={14}>
                <strong> Total Revenue:</strong> ₹{product.revenue}
              </Typography>

              {/* Tags */}
              <Box fontSize={14}>
                <strong> Tags:</strong> {product.tags}
              </Box>
            </Grid>
          </Grid>
          {/* DESCRIPTION */}
          <Typography mt={3}>{product.description}</Typography>
          <Divider sx={{ my: 3 }} />
          {/* SALES RECORD (optional table placeholder) */}
          <Typography
            fontWeight={600}
            mb={1}
            fontSize={30}
            margin={"0 auto"}
            borderBottom={"2px solid #18e15b"}
            width={"fit-content"}
          >
            Sales Record
          </Typography>
          <Typography fontSize={14} color="text.secondary"></Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductView;
