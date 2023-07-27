import { Box } from "@mui/material";
import React, { Children } from "react";

const CustomBox = (props) => {
  console.log(props);
  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        border: "1px solid black",
        background: "#FAF0D7",
      }}
      marginTop="25px"
      padding="25px"
    >
      {props.children}
    </Box>
  );
};

export default CustomBox;
