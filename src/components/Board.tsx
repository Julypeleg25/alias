import { Box } from "@mui/material";
import { useMemo } from "react";
import { useGroupStore } from "../state/GroupsStore";

type Tile = {
  id: number;
  isTrap: boolean;
  isStart: boolean;
};

const generateBoard = (size: number, trapCount: number): Tile[] => {
  const tiles: Tile[] = Array.from({ length: size * size }, (_, i) => ({
    id: i,
    isTrap: false,
    isStart: i === 0,
  }));

  const trapIndices = new Set<number>();
  while (trapIndices.size < trapCount) {
    const index = Math.floor(Math.random() * tiles.length);
    if (index !== 0) trapIndices.add(index);
  }

  for (const i of trapIndices) {
    tiles[i].isTrap = true;
  }

  return tiles;
};

export const Board = () => {
  const size = 10;
  const trapCount = 10;
  const tiles = useMemo(() => generateBoard(size, trapCount), []);
  const { groups } = useGroupStore();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: `repeat(${size}, 2rem)`, // full-width columns on small screens
          sm: `repeat(${size}, 3.4rem)`,
          md: `repeat(${size}, 3.8rem)`,
          lg: `repeat(${size}, 4rem)`,
        },
        gap: { xs: "0.5rem", sm: "0.8rem" },
        justifyContent: "center",
        mt: "1rem",
      }}
    >
      {tiles.map((tile) => {
        const tilePlayers = groups.filter((p) => p.position === tile.id);
        return (
          <Box
            key={tile.id}
            sx={{
              aspectRatio: "1",
              backgroundColor: tile.isStart
                ? "#4CAF50"
                : tile.isTrap
                ? "#f44336"
                : "#e0e0e0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              border: "1px solid #999",
              position: "relative",
              fontWeight: "bold",
              width:{ xs: "1.95rem", sm: "3.3rem", md: "4.2rem", lg: "6rem" },
              fontSize: { xs: "0.8rem", sm: "1.2rem", md: "2rem" },
              color: tile.isTrap || tile.isStart ? "#fff" : "#333",
            }}
          >
            {tile.id}
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                bottom: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {tilePlayers.map((player) => (
                <Box
                  key={player.name}
                  sx={{
                    width: { xs: 8, sm: 10, md: 12 },
                    height: { xs: 8, sm: 10, md: 12 },
                    borderRadius: "50%",
                    backgroundColor: player.color,
                    border: "1px solid #fff",
                  }}
                />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
