import { useEffect } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import openImage from "../assets/home.webp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useCustomSelector from "../hooks/useCustomSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  deleteCategory,
  fetchAllCategories,
} from "../redux/reducers/categoriesReducer";
import { Delete, Edit } from "@mui/icons-material";
import Categories from "../components/Categories";

const LandingPage = () => {
  const { categories, loading, error } = useCustomSelector(
    (state) => state.cartegoriesReducer
  );
  const currentUser = useCustomSelector(
    (state) => state.usersReducer.currentUser
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  const handleButtonClick = () => {
    navigate("/products");
  };
  const handleDelete = (categoryId: number) => {
    dispatch(deleteCategory(categoryId));
  };
  const slicedCategory = categories.slice(0, 5);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            className="explore-grid"
          >
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Descubra una amplia gama de productos de alta calidad para todas
                sus necesidades.
              </Typography>
              <Button
                variant="contained"
                onClick={handleButtonClick}
                color="success"
              >
                Explorar Productos
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                className="hero"
                component="div"
                style={{ backgroundImage: `url(${openImage})` }}
              />
            </Grid>
          </Grid>
        </Container>
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
