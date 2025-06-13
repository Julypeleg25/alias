import { Alert, Button, Input, Snackbar, TextField } from "@mui/material";
import { useState } from "react";

export const GroupArrange = () => {
  const [groupNames, setGroupNames] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleAddGroup = () => {
    if (groupNames.includes("")) {
      setOpen(true);
      return;
    }
    setGroupNames([...groupNames, ""]); // Add an empty string for a new group
  };

  return (
    <div dir="rtl">
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpen(false)}
        autoHideDuration={1500}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          שם קבוצה לא תקין או שקיים כבר
        </Alert>
      </Snackbar>
      <h1>ארגון קבוצות</h1>
      <TextField label="הכנס שם קבוצה">שם קבוצה מספר </TextField>
      <Button variant="contained" color="primary" onClick={handleAddGroup}>
        הוסף קבוצה
      </Button>
      <Button style={{ position: "absolute", bottom: 30, left: 30 }}>
        סיים והמשך לתחילת המשחק
      </Button>
    </div>
  );
};
