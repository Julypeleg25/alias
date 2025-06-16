import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useGroupStore } from "../../state/GroupsStore";
import { Board } from "../Board";
import { GroupCards } from "../GroupCards";

export const Game = () => {
  const { currentGroupId, groups } = useGroupStore();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#ed8c57ba",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:"1rem",
      }}
    >
      <GroupCards />
      <Board />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          style={{
            direction: "rtl",
            fontSize: "2.7rem",
            fontWeight: 600,
            color: "#fff",
            borderRadius: "1rem",
          }}
        >
          קבוצת "
          {groups.find((group) => group.id === currentGroupId)?.name ||
            "הקבוצה שלך"}
          "
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/cards"
          sx={{
            direction: "rtl",
            fontSize: "1.5rem",
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: "2rem",
          }}
        >
          התחילו את התור
        </Button>
      </Box>
    </Box>
  );
};
