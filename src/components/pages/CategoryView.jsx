import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
const CategoryView = ({ open, onClose, category }) => {
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
          Product Category
          <IconButton onClick={onClose}>
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent>
          <Box sx={{ display: "flex", gap: 3 }}>
            {/* Image */}
            <Avatar
              src={category.image}
              variant="rounded"
              sx={{
                width: 140,
                height: 180,
                borderRadius: 2,
              }}
            />

            {/* Text */}
            <Box>
              <Typography fontWeight={600} mb={1}>
                {category.name}
              </Typography>

              <Typography color="text.secondary" fontSize={14}>
                {category.description}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryView;
