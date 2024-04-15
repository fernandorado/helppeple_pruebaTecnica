import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import Header from "../components/Header";
import { Box } from "@mui/material";

const AdminPage = () => {
  return (
    <div>
      <Header />
      <Box my={2}>
        <AddProduct />
      </Box>
      <Box my={2}>
        <AddCategory />
      </Box>
    </div>
  );
};

export default AdminPage;
