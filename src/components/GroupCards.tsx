import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useGroupStore, type GroupDetails } from "../state/GroupsStore";
import { Groups } from "@mui/icons-material";

export const GroupCards = () => {
  const { groups } = useGroupStore();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "center",
        marginTop: "2rem",
        overflowY: "auto",
      }}
    >
      {groups.map((group: GroupDetails) => (
        <Card
          key={group.name}
          sx={{
            minWidth: { xs: "5rem", sm: "14rem", md: "25rem" },
            width: "max-content",
            bgcolor: "#f6f6f6",
            borderRadius: 2,
          }}
          style={{ direction: "rtl" }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: group.color, opacity: 0.8 }}>
                <Groups />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  קבוצת
                  <br />"{group.name}"
                </Typography>
                <Typography color="text.secondary">
                  מיקום:
                  {group.position}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
