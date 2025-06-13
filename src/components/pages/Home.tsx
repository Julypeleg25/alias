import { Link } from "react-router-dom";
import alias from "../../assets/alias.png";
import { Box, Button, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        margin: 0,
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        direction: "rtl",
        backgroundColor: "#ed8c57",
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2" sx={{ m: 0 }} fontWeight={600} color="white">
           ברוכים הבאים לאליאס
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={alias}
          alt="Alias"
          sx={{ maxWidth: "90%", maxHeight: "60vh", objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          px: 3,
          pb: 4,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/groupArrange"
          sx={{ fontSize: 18 }}
        >
          התחל משחק
        </Button>
      </Box>
    </Box>
  );
};
