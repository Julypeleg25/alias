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
import { theme } from "../themeCreate";
import words from "../alias_words.json";

const base_words = [
  "מחשב lkhkylhjlyj kk",
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
  const [skipped, setSkipped] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [open, setOpen] = useState(false);
  const [endingGroupId, setEndingGroupId] = useState<number | undefined>(
    undefined
  );
  const { addUsedWord, usedWords } = useBoardStore();
  const {
    groups,
    advanceGroup,
    currentGroupId,
    setCurrentGroupId,
    setWiningGroup,
  } = useGroupStore();
  const navigate = useNavigate();
  const currentGroup = groups.find((group) => group.id === currentGroupId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (answered?: boolean) => {
    if (currentGroup && currentGroupId) {
      setOpen(false);
      if (currentGroup?.position + currentAmount >= 100) {
        setWiningGroup(currentGroup);
        navigate("/end");
        return;
      }
      advanceGroup(currentGroupId, currentAmount);
      const endingGroup = groups.find((group) => group.id === endingGroupId);
      if (endingGroup && endingGroup.position + 1 >= 100) {
        setWiningGroup(endingGroup);
        navigate("/end");
        return;
      }
      endingGroupId && answered && advanceGroup(endingGroupId, 1);
      setCurrentGroupId(((currentGroupId ?? 1) % groups.length) + 1);
      navigate("/game");
    }
  };

  const handleClick = () => {
    addUsedWord(base_words[currIndex]);
    words[currIndex].used = true;

    setCurrentAmount((prev) => prev + 1);
    setCurrentIndex((prev) => prev + 1);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const handleEndSession = () => {
    setEndSession(true);
  };

  const handleFinalSession = (event: { target: { value: string } }) => {
    setEndingGroupId(
      groups.find((group) => group.name === event.target.value)?.id
    );
  };

  const handleSkipped = () => {
    setCurrentIndex((prev) => prev + 1);
    addUsedWord(base_words[currIndex]);
    words[currIndex].used = true;
    setCurrentAmount((prev) => prev - 1);
    setSkipped(true);
    setTimeout(() => setSkipped(false), 200);
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
        duration={6}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[45, 30, 10, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>

      <Typography fontSize="3rem"> {currentAmount} :סה"כ </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: clicked ? "lightgreen" : skipped ? "red" : "#f0f0f0",
          border: "1px solid #ccc",
          height: { xs: "30rem", sm: "35rem", md: "38rem", lg: "40rem" },
          opacity: endSession ? 0.65 : 1,
          pointerEvents: endSession ? "none" : "initial",
          width: { xs: "20rem", sm: "35rem", md: "30rem", lg: "35rem" },
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          fontSize: { xs: "5rem", sm: "7rem", md: "9rem", lg: "10rem" },
          display: "grid",
          fontWeight: "bold",
          transition: "background-color 0.3s",
          flexWrap: "wrap",
          textAlign: "center",
        }}
        onClick={handleClick}
      >
        {words[currIndex].word}
      </Box>
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          gap: "3rem",
        }}
      >
        <Button
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            width: { xs: "8rem", sm: "10rem", md: "20rem", lg: "25rem" },
          }}
          disabled={!endSession}
          variant="contained"
          onClick={handleClickOpen}
        >
          סיים תור
        </Button>
        <Button
          disabled={endSession}
          variant="contained"
          onClick={handleSkipped}
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            width: { xs: "8rem", sm: "10rem", md: "20rem", lg: "25rem" },
          }}
        >
          דלג
        </Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>איזו קבוצה הצליחה את המילה האחרונה?</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={groups.find((group) => group.id === endingGroupId)?.name}
            displayEmpty
            onChange={handleFinalSession}
          >
            {groups.map((group) => (
              <MenuItem key={group.name} value={group.name}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            style={{ backgroundColor: theme.palette.secondary.main }}
            onClick={() => handleClose()}
          >
            דלג
          </Button>
          <Button onClick={() => handleClose(true)}>סיים</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
