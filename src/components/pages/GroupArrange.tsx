import {
  Box,
  Button,
  Divider,
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

export const GroupArrange = () => {
  const { addGroup, groups, setCurrentGroupId } = useGroupStore();
  const [currentGroupName, setGroupName] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const handleAddGroup = () => {
    if (groups.length === 4) {
      enqueueSnackbar("לא ניתן לשחק יותר מארבע קבוצות במשחק", {
        variant: "error",
        autoHideDuration: 1500,
        preventDuplicate: true,
      });

      return;
    }
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
        id: groups.length + 1,
      });
      setGroupName("");
      setSelectedColor("");
      enqueueSnackbar('הקבוצה נוספה בהצלחה', {
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
    setCurrentGroupId(groups[0].id);
    navigate("/game");
  };

  return (
    <Box
      dir="rtl"
      sx={{
        display: "grid",
        justifyItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#ededed",
      }}
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          display: "grid",
        }}
      >
        <h1>ארגון קבוצות</h1>
        <TextField
          style={{ minWidth: "100%" }}
          onChange={handleGroupNameChange}
          label="הכנס שם קבוצה"
          value={currentGroupName}
        />
        <Select
          style={{ minWidth: "100%" }}
          value={selectedColor}
          onChange={handleChange}
          displayEmpty
          renderValue={() => (
            <Box
              sx={{
                width: "15rem",
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
              <MenuItem
                key={color}
                value={color}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "14rem",
                    height: "1.7rem",
                    backgroundColor: color,
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
          style={{
            fontSize: "1.2rem",
            display: "flex",
            placeSelf: "center",
            minWidth: "55%",
          }}
        >
          הוסף קבוצה
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{
          fontSize: "1.5rem",
          placeSelf: "center",
        }}
      >
        סיים והמשך לתחילת המשחק
      </Button>
    </Box>
  );
};
