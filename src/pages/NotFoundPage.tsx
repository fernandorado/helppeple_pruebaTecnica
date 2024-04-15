import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box className="page-not-found">
      <Typography className="page-not-found__title" variant="h1" component="h1">
        ¡Sitio no encontrado!
      </Typography>
      <Typography className="page-not-found__message" component="p">
        Parece que te has desviado del camino de las compras.
      </Typography>
      <Link to="/" className="page-not-found__link">
        Volver al Inicio
      </Link>
    </Box>
  );
};

export default NotFoundPage;
