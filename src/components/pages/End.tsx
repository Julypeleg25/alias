import { useNavigate } from "react-router-dom";
import { useGroupStore } from "../../state/GroupsStore";
import winner from "../../assets/winner.png";
import { Box, Button, Typography } from "@mui/material";
import { RestartAlt } from "@mui/icons-material";

const EndPage = () => {
  const navigate = useNavigate();
  const { restartGame, winingGroup } = useGroupStore();

  return (
    <div
      style={{
        textAlign: "center",
        display: "grid",
        gap: "2rem",
        direction: "rtl",
        backgroundColor: "#ed8c57ba",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1 style={{ marginTop: "2rem" }}>המשחק הסתיים!</h1>
      <Typography
        fontSize={{ xs: "2rem", sm: "3rem", md: "4rem" }}
        fontWeight={600}
        color={winingGroup?.color || "black"}
      >
        קבוצת "{winingGroup?.name || "הקבוצה שלך"}" ניצחה!
      </Typography>
      <Typography fontSize={"2rem"} fontWeight={600}>
        תודה ששיחקתם באליאס!
        <br />
        מקווים שנהניתם!
      </Typography>
      <Button
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
          width: "fit-content",
          justifySelf: "center",
        }}
        onClick={() => {
          window.localStorage.clear();
          restartGame();
          navigate("/game");
        }}
        endIcon={<RestartAlt style={{ fontSize: "2.3rem" }} />}
        variant="contained"
      >
        התחל מחדש
      </Button>
      <Button
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
          width: "fit-content",
          justifySelf: "center",
        }}
        onClick={() => navigate("/")}
        variant="contained"
      >
        התחל משחק חדש{" "}
      </Button>

      <Box
        component="img"
        src={winner}
        alt="winner"
        sx={{
          justifySelf: "center",
          display: "flex",
          width: { xs: "20rem", sm: "40rem", md: "50rem" },
          maxHeight: "40rem",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default EndPage;
