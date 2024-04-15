import { Box, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
  YouTube,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box className="social__links">
        <Link href="https://www.facebook.com/" underline="none">
          <Facebook />
        </Link>
        <Link href="https://youtube.com/" underline="none">
          <YouTube />
        </Link>
        <Link href="https://www.instagram.com" underline="none">
          <Instagram />
        </Link>
        <Link href="https://www.pinterest.com/" underline="none">
          <Pinterest />
        </Link>
        <Link href="https://github.com/SamAddy" underline="none">
          <GitHub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/samuel-k-addison/"
          underline="none"
        >
          <LinkedIn />
        </Link>
        <Link href="https://twitter.com/prof_addy" underline="none">
          <Twitter />
        </Link>
      </Box>
      <Box className="copyright">
        <Typography>
          Copyright © 2024
          <Link href="https://fernandorado.github.io/" target="_blank">
            fernandorado
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
