import { Link } from "react-router-dom";
import alias from "../../assets/alias.png";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useGroupStore } from "../../state/GroupsStore";

export const Home = () => {
  const { restartGame } = useGroupStore();

  useEffect(() => {
    restartGame(true);
    window.localStorage.clear();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#ed8c57",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={12}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <Typography
          fontWeight={600}
          color="white"
          fontFamily={"Assistant"}
          sx={{
            fontSize: { xs: "2rem", sm: "5rem", md: "3rem", lg: "9rem" },
          }}
        >
          ברוכים הבאים לאליאס
        </Typography>

        <Box
          component="img"
          src={alias}
          alt="Alias"
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%" },
            maxHeight: "300px",
            objectFit: "contain",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/groupArrange"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            px: 4,
            py: 1.5,
          }}
        >
          התחל משחק
        </Button>
      </Stack>
    </Box>
  );
};
