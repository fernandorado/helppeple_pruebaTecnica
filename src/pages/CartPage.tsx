import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import useCustomSelector from "../hooks/useCustomSelector";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import {
  clearCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../redux/reducers/cartReducer";
import { Add, Delete, Remove } from "@mui/icons-material";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useCustomSelector((state) => state.cartReducer.items);

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateProductQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <Header />
      <Typography
        marginTop={10}
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
      >
        Carrito de Compras
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Tu carrito está vacio.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography variant="body1">
                      Precio: ${item.price * item.quantity}{" "}
                    </Typography>
                    <Typography variant="body1">
                      Cantidad: {item.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="success"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleRemoveProduct(item.id)}
                    >
                      <Delete />
                    </Button>
                    <Button
                      color="success"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Add />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearCart}
          >
            Limpiar Carrito
          </Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
