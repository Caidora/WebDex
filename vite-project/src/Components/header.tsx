import React from "react";
import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
  search: boolean;
}

export function Header({ onSearch, search }: HeaderProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch!=undefined) {
    onSearch(event.target.value);
    }
  };

  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar sx={{ padding: 0 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Pokédex</Link>
        </Typography>
        {search && (
        <Box>
          <TextField
            variant="outlined"
            placeholder="Search Pokémon"
            size="small"
            onChange={handleSearchChange}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
