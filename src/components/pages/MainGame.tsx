import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useGroupStore } from "../../state/GroupsStore";
import { Board } from "../Board";

export const Game = () => {
  const { currentGroupName } = useGroupStore();

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
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2" sx={{ m: 0 }} fontWeight={600} color="white">
          ברוכים הבאים לאליאס
        </Typography>
      </Box>
      <Board />
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
          to="/cards"
          sx={{ fontSize: 18 }}
        >
          "{currentGroupName || "הקבוצה שלך"}" התחילו לשחק קבוצת
        </Button>
      </Box>
    </Box>
  );
};
