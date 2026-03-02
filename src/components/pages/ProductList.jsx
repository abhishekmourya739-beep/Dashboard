import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductView from "./ProductView";
import UpdateProduct from "./UpdateProduct";
const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  //to fetch category name to display instead of id
  const [category, setCategory] = useState([]);

  //to get by id
  const [openView, setOpenView] = useState(false);
  const [product, setProduct] = useState({});

  //to update by id

  const [update, setUpdate] = useState(0);
  const [openEditView, setOpenEditView] = useState(false);

  useEffect(() => {
    axios
      .get("https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category")
      .then((res) => setCategory(res.data))
      .catch((err) => console.error(err));
  }, []);
  const columns = [
    // {
    //   field: "sr",
    //   headerName: "Sr No",
    //   flex: 0.4,
    //   valueGetter: (_value, row, column, apiRef) =>
    //     apiRef.current.getRowIndexRelativeToVisibleRows(row.id) + 1,
    // },

    { field: "id", headerName: "ID", flex: 0.4 },

    { field: "name", headerName: " Name", flex: 1 },

    {
      field: "image",
      headerName: "Image",
      flex: 0.6,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar src={params.value} />
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "categoryId",
      headerName: "Category",
      flex: 0.8,
      //   // Find the category whose id matches the product's categoryId and display its name if category dont exist display empty string

      renderCell: (params) =>
        category.find((c) => c.id === params.value)?.name || "",
    },

    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.4,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 0.4,
    },
    {
      field: "sold",
      headerName: "Sold",
      flex: 0.4,
    },
    // {
    //   field: "revenue",
    //   headerName: "Revenue",
    //   flex: 0.4,
    // },
    // {
    //   field: "rating",
    //   headerName: "Rating",
    //   flex: 1,
    // },
    {
      field: "tags",
      headerName: "Tags",
      flex: 0.6,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" onClick={() => getById(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            color="success"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  //to get all products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/product",
        );
        // console.log(res);
        const formattedData = res.data.map((e) => ({
          id: e.id,
          name: e.name,
          image: e.image,
          categoryId: e.categoryId,
          description: e.description,
          material: e.material,
          price: e.price,
          discount: e.discount,
          sold: e.sold,
          revenue: e.revenue,
          tags: e.tags,
          rating: e.rating,
        }));

        setRows(formattedData);
      } catch (err) {
        console.error("failed to fetch products: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [update]);

  //to delete products

  const handleDelete = async (row) => {
    if (!window.confirm("are you sure you want to delete this product")) return;
    // Product is a nested resource in MockAPI, so we must delete it using both categoryId (parent) and product id (child) thats whywe passed row as a parameter here to get both category id and product id

    try {
      await axios.delete(
        `https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category/${row.categoryId}/product/${row.id}`,
      );
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (err) {
      console.error(err);
    }
  };

  //to get single product by id
  //get by id

  const getById = async (cat) => {
    document.activeElement?.blur(); // remove focus

    setProduct(cat);
    setOpenView(true);
  };

  //update by id

  const handleEdit = async (cat) => {
    document.activeElement?.blur(); // remove focus

    setProduct(cat);
    setOpenEditView(true);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Typography variant="h5" fontWeight={600} mb={1}>
          Products
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          View, Edit and Delete Products
        </Typography>

        {/* DataGrid Card */}
        <Box
          sx={{
            height: 480,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={rows}
            getRowId={(row) => row.id}
            loading={loading}
            columns={columns.map((col) => ({
              ...col,
              headerAlign: "center",
              align: "center",
            }))}
            disableRowSelectionOnClick
            showToolbar
            slotProps={{
              toolbar: {
                sx: {
                  justifyContent: "flex-start",
                },
              },
            }}
          />
        </Box>
      </Box>

      <ProductView
        open={openView}
        onClose={() => setOpenView(false)}
        product={product}
      />

      <UpdateProduct
        open={openEditView}
        onClose={() => setOpenEditView(false)}
        product={product}
        setUpdate={setUpdate}
      />
    </>
  );
};

export default ProductList;
