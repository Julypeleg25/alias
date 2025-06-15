import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Container disableGutters sx={{ mt: 0, px: 0, direction: "rtl" }}>
      <Outlet />
    </Container>
  );
};

export default Layout;
