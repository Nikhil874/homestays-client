import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ path }) => {
  const naviagte = useNavigate();
  return <Button onClick={() => window.history.back()} sx={{marginTop:"25px"}} variant="contained">Back</Button>;
};

export default NavButton;
