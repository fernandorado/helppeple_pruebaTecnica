import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useCustomSelector from "../hooks/useCustomSelector";
import {
  deleteCategory,
  fetchAllCategories,
} from "../redux/reducers/categoriesReducer";
import Header from "./Header";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories, loading, error } = useCustomSelector(
    (state) => state.cartegoriesReducer
  );
  const currentUser = useCustomSelector(
    (state) => state.usersReducer.currentUser
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleDelete = (categoryId: number) => {
    dispatch(deleteCategory(categoryId));
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            paddingTop: "2.5em",
            paddingBottom: "1.0em",
            textAlign: "center",
          }}
        >
          Categorias
        </Typography>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item key={category.id} xs={12} sm={6} md={3} lg={2}>
                <CardActionArea
                  component={Link}
                  to={`/categories/${category.id}`}
                >
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.name}
                    style={{ borderRadius: "50%" }}
                  />
                  <CardContent style={{ textAlign: "center" }}>
                    <Typography variant="h6" component="h6" gutterBottom>
                      {category.name}
                    </Typography>
                    {currentUser?.role === "admin" && (
                      <>
                        <IconButton onClick={() => handleDelete(category.id)}>
                          <Delete />
                        </IconButton>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </>
                    )}
                  </CardContent>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        )}
      </main>
    </div>
  );
};

export default Categories;
