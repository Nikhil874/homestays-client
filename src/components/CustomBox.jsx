import styled from "@emotion/styled";
import React from "react";

const CustomBox = (props) => {
  return (
    <BoxContainer>
      {props.children}
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  & {
    min-height: 200px;
    min-width:245px;
    background: #faf0d7;
    margin-top: 25px;
    padding: 25px;
    text-align: center;
  }
  &:hover {
    cursor: pointer;
  }
  &>table>tr{
  }
  &>table td{
    border:1px solid;
    padding: 2px;
    text-align: center;
  }
`;

export default CustomBox;
