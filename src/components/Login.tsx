import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { TypographyProps } from "@mui/material/Typography";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
//import useCustomSelector from "../hooks/useCustomSelector";
import { login } from "../redux/reducers/userReducer";
import { UserCredentials } from "../types/User";

interface Props {
  handleCloseLogin: () => void; // Prop para cerrar la modal
}

const Login = ({ handleCloseLogin }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCredentials>();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (data: UserCredentials) => {
    dispatch(login(data))
      .then((action) => {
        const loginResult = action.payload;
        if (loginResult instanceof AxiosError) {
          window.alert("Datos incorrectos, por favor inténtalo de nuevo.");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        setErrorMessage("Ocurrió un error durante el inicio de sesión");
        handleOpen(); // Abre la modal si hay un error de inicio de sesión
      });
  };

  return (
    <Dialog open={true} onClose={handleCloseLogin}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "300px",
          padding: "24px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ marginLeft: "auto" }}>
              {" "}
              {/* Estilo para mover el botón a la derecha */}
              <IconButton onClick={handleCloseLogin}>
                <Close />
              </IconButton>
            </div>
          </Box>
        </DialogTitle>

        <Typography variant="h6" align="center">
          ¡Hola! <br></br>Inicia sesión para comprar
        </Typography>

        <TextField
          label="Correo Electrónico"
          variant="outlined"
          type="email"
          {...register("email", {
            required: "Digita tu correo electrónico",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Dirección de correo electrónico no válida",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          {...register("password", {
            required: "Digita tu contraseña",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Ingresar
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            ¿Aún no tienes cuenta?
            <Link to="/register">Regístrate</Link>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default Login;
