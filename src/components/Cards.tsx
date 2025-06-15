import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useBoardStore } from "../state/BoardStore";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useGroupStore } from "../state/GroupsStore";
import { useNavigate } from "react-router-dom";

const base_words = [
  "מחשב",
  "טלפון",
  "חתול",
  "כלב",
  "אוטובוס",
  "ספר",
  "עיפרון",
  "שולחן",
  "כיסא",
  "חלון",
  "דלת",
  "כוס",
  "בקבוק",
  "מטוס",
  "רכבת",
  "מעלית",
  "חולצה",
  "מכנסיים",
  "כובע",
  "נעליים",
  "אור",
  "מים",
  "אש",
  "רוח",
  "גשם",
  "שלג",
  "שמש",
  "ירח",
  "כוכב",
  "שמיים",
  "עכבר",
  "מקלדת",
  "מסך",
  "עכברוש",
  "נמר",
  "דוב",
  "פינגווין",
  "גמל",
  "סוס",
  "כבשה",
  "עץ",
  "פרח",
  "עלה",
  "שדה",
  "הר",
  "נהר",
  "ים",
  "אגם",
  "יער",
  "מדבר",
  "בית",
  "דירה",
  "חדר",
  "סלון",
  "מטבח",
  "שירותים",
  "מרפסת",
  "מקלחת",
  "מיטה",
  "שולחן אוכל",
  "עוגה",
  "לחם",
  "חלב",
  "בשר",
  "ירק",
  "פרי",
  "תפוח",
  "בננה",
  "ענב",
  "תות",
  "משטרה",
  "כבאי",
  "רופא",
  "אחות",
  "מורה",
  "תלמיד",
  "ספרייה",
  "בית חולים",
  "אוניברסיטה",
  "גן ילדים",
  "אוזניים",
  "עיניים",
  "יד",
  "רגל",
  "לב",
  "ראש",
  "פנים",
  "אף",
  "פה",
  "שיניים",
];

export const Cards = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [open, setOpen] = useState(false);
  const [endingGroupName, setEndingGroupName] = useState<string | undefined>(
    undefined
  );
  const { addUsedWord, usedWords } = useBoardStore();
  const { groups, advanceGroup, currentGroupName } = useGroupStore();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    advanceGroup(currentGroupName as string, currentAmount);
    advanceGroup(endingGroupName as string, 1);
    navigate("/game");
  };

  const handleClick = () => {
    addUsedWord(base_words[currIndex]);
    setCurrentAmount((prev) => prev + 1);
    setCurrentIndex((prev) => prev + 1);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const handleEndSession = () => {
    setEndSession(true);
  };

  return (
    <Box
      sx={{
        gap: "1rem",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        mt: "2rem",
      }}
    >
      <CountdownCircleTimer
        isPlaying
        onComplete={handleEndSession}
        duration={5}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[45, 30, 10, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>

      <Typography fontSize="3rem">{currentAmount}</Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: clicked ? "lightgreen" : "#f0f0f0",
          border: "1px solid #ccc",
          height: "30rem",
          opacity: endSession ? 0.65 : 1,
          pointerEvents: endSession ? "none" : "initial",
          width: "20rem",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          fontSize: "5rem",
          display: "grid",
          fontWeight: "bold",
          transition: "background-color 0.3s",
          cursor: "pointer",
          flexWrap: "wrap",
        }}
        onClick={handleClick}
        //only use the word if it hasn't been used before
      >
        {base_words[currIndex]}
      </Box>
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          gap: "3rem",
        }}
      >
        <Button
          disabled={!endSession}
          variant="contained"
          style={{ width: "5rem" }}
          onClick={handleClickOpen}
        >
          סיים תור
        </Button>
        <Button
          disabled={endSession}
          variant="contained"
          style={{ width: "3rem" }}
          onClick={() => {
            setCurrentIndex((prev) => prev + 1);
            addUsedWord(base_words[currIndex]);
            setCurrentAmount((prev) => prev - 1);
          }}
        >
          דלג
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>איזו קבוצה הצליחה את המילה האחרונה?</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={endingGroupName}
            displayEmpty
            onChange={(e) => setEndingGroupName(e.target.value)}
          >
            {groups.map((group) => (
              <MenuItem key={group.name} value={group.name}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סיים</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
