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
  const trapCount = 15;
  const tiles = useMemo(() => generateBoard(size, trapCount), []);
  const { groups } = useGroupStore();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 50px)`,
        gap: 1,
        justifyContent: "center",
        mt: 4,
      }}
    >
      {tiles.map((tile) => {
        const tilePlayers = groups.filter((p) => p.position === tile.id);
        return (
          <Box
            key={tile.id}
            sx={{
              width: 50,
              height: 50,
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
              color: tile.isTrap || tile.isStart ? "#fff" : "#333",
            }}
          >
            {tile.id}
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                bottom: 2,
                gap: "2px",
              }}
            >
              {tilePlayers.map((player) => (
                <Box
                  key={player.name}
                  sx={{
                    width: 12,
                    height: 12,
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
