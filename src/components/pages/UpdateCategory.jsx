import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

const UpdateCategory = ({ open, onClose, form, onUpdate, setForm }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
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
          Update Category
          <IconButton size="small" color="error" onClick={onClose}>
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          {/* Top two fields */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <TextField
              label="Category Name"
              size="small"
              sx={{ mt: 2 }}
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <TextField
              label="Category Image"
              size="small"
              sx={{ mt: 2 }}
              fullWidth
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </Box>

          {/* Description */}
          <TextField
            label="Category Description"
            size="small"
            multiline
            rows={3}
            fullWidth
            sx={{ mt: 2 }}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Centered button */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={onUpdate}
              sx={{
                bgcolor: "#2dd4bf",
                color: "#000",
                px: 5,
                py: 1,
                fontWeight: 600,
                borderRadius: "6px",
                "&:hover": {
                  bgcolor: "#14b8a6",
                },
              }}
            >
              UPDATE
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategory;
