import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useGroupStore } from "../../state/GroupsStore";
import { useNavigate } from "react-router-dom";

const DEFAULT_COLOR = "#FF6B6B";
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "black",
  "white",
];

export interface GroupDetails {
  name: string;
  color: string;
  position: number;
}

export const GroupArrange = () => {
  const { addGroup, groups, setCurrentGroupName } = useGroupStore();
  const [currentGroupName, setGroupName] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const handleAddGroup = () => {
    if (currentGroupName && selectedColor) {
      if (
        groups
          .map((groupsDetail) => groupsDetail.name)
          .includes(currentGroupName) ||
        currentGroupName.trim() === ""
      ) {
        enqueueSnackbar("שם קבוצה לא תקין או שקיים כבר", {
          variant: "error",
          autoHideDuration: 1500,
          preventDuplicate: true,
        });
        return;
      }
      addGroup({
        name: currentGroupName,
        color: selectedColor || DEFAULT_COLOR,
        position: 0,
      });
      setGroupName("");
      setSelectedColor("");
      enqueueSnackbar("קבוצה פפפפ נוספה בהצלחה", {
        variant: "success",
        autoHideDuration: 1500,
        preventDuplicate: true,
      });
    } else {
      enqueueSnackbar("יש למלא שם קבוצה וצבע", {
        variant: "error",
        autoHideDuration: 1500,
        preventDuplicate: true,
      });
    }
  };

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = () => {
    if (groups.length < 2) {
      enqueueSnackbar("יש להוסיף לפחות שתי קבוצות", {
        variant: "error",
        autoHideDuration: 1500,
        preventDuplicate: true,
      });
      return;
    }
    setCurrentGroupName(groups[0].name);
    navigate("/game");
  };

  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        backgroundColor: "#ededed",
      }}
    >
      <h1>ארגון קבוצות</h1>
      <div
        style={{
          alignItems: "center",
          placeItems: "start",
          display: "grid",
          gap: "2.5rem",
          marginTop: "-12rem",
        }}
      >
        <TextField
          onChange={handleGroupNameChange}
          label="הכנס שם קבוצה"
          value={currentGroupName}
        />
        <Select
          value={selectedColor}
          onChange={handleChange}
          displayEmpty
          sx={{
            width: "11.5rem",
          }}
          renderValue={() => (
            <Box
              sx={{
                width: "9rem",
                height: "1.5rem",
                backgroundColor: selectedColor || "#ccc",
                border: "1px solid #999",
              }}
            />
          )}
        >
          {colors
            .filter((color) => !groups.some((group) => group.color === color))
            .map((color) => (
              <MenuItem key={color} value={color} sx={{ p: 0 }}>
                <Box
                  sx={{
                    width: "9rem",
                    height: "1.5rem",
                    backgroundColor: color,
                    m: "auto",
                    border: "1px solid #999",
                  }}
                />
              </MenuItem>
            ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddGroup}
          style={{ display: "flex", placeSelf: "center" }}
        >
          הוסף קבוצה
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "4rem",
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          סיים והמשך לתחילת המשחק
        </Button>
      </Box>
    </Box>
  );
};
