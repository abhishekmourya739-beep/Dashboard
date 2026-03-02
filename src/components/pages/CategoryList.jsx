import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryView from "./CategoryView";
import UpdateCategory from "./UpdateCategory";

const CategoryList = () => {
  const [loading, setLoading] = useState(true);

  //for delete and fetching all categories
  const [rows, setRows] = useState([]);

  //for update
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
  });

  //for get by id
  const [category, setCategory] = useState({});
  const [openView, setOpenView] = useState(false);

  const columns = [
    {
      field: "sr",
      headerName: "Sr No",
      flex: 0.4,
      valueGetter: (_value, row, column, apiRef) =>
        apiRef.current.getRowIndexRelativeToVisibleRows(row.id) + 1,
    },

    { field: "id", headerName: "ID", flex: 0.4 },

    { field: "name", headerName: "Category Name", flex: 1 },

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
      field: "description",
      headerName: "Description",
      flex: 2,
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
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category",
        );

        // IMPORTANT: DataGrid needs `id`
        const formattedData = res.data.map((item) => ({
          id: item.id, // required
          name: item.name,
          image: item.image,
          description: item.description,
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(
        `https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category/${id}`,
      );

      // remove row from UI
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // GET BY ID + OPEN MODAL for update
  const handleEdit = async (id) => {
    document.activeElement?.blur(); // remove focus

    const res = await axios.get(
      `https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category/${id}`,
    );
    setForm(res.data);
    setOpenEdit(true);
  };

  // UPDATE BY ID
  const handleUpdate = async () => {
    await axios.put(
      `https://698044076570ee87d50e9627.mockapi.io/dashboard/v1/category/${form.id}`,
      {
        name: form.name,
        image: form.image,
        description: form.description,
      },
    );

    setRows((prev) =>
      prev.map((row) =>
        row.id === form.id
          ? {
              ...row,
              name: form.name,
              image: form.image,
              description: form.description,
            }
          : row,
      ),
    );

    setOpenEdit(false);
  };

  //get by id

  const getById = async (cat) => {
    document.activeElement?.blur(); // remove focus

    setCategory(cat);
    setOpenView(true);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Typography variant="h5" fontWeight={600} mb={1}>
          Category
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          View, Edit and Delete Category
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
      {/* MODAL for update */}
      <UpdateCategory
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        form={form}
        setForm={setForm}
        onUpdate={handleUpdate}
      />

      {/* view by id */}
      <CategoryView
        open={openView}
        onClose={() => setOpenView(false)}
        category={category}
      />
    </>
  );
};

export default CategoryList;
