import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { Children } from "react";

const CustomBox = (props) => {
  return (
    <BoxContainer
      style={{
        width: "200px",
        height: "200px",
        border: "1px solid black",
        background: "#FAF0D7",
        marginTop:"25px",
        padding:"25px"
      }}
    >
      {props.children}
    </BoxContainer>
  );
};

const BoxContainer =styled.div`
  :hover{
    cursor: pointer;
  }
`

export default CustomBox;
