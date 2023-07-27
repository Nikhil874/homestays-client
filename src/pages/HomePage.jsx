import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import CustomBox from "../components/CustomBox";

const HomePage = () => {
  const defualtHotelDetails = {
    name: null,
    noOfFloors: null,
  };
  const [availableHotels, setAvailableHotels] = useState([]);
  const [addHotel, setAddHotel] = useState(defualtHotelDetails);
  const [flag, setFLag] = useState(true);
  const getAllHotels = async () => {
    const res = await axios.get("http://localhost:1333/api/v1/pg");
    setAvailableHotels(res?.data);
  };
  useEffect(() => {
    getAllHotels();
  }, [flag]);
  const handleChange = (e, key) => {
    setAddHotel({ ...addHotel, [key]: e.target.value });
  };
  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:1333/api/v1/pg", addHotel);
    setAddHotel(defualtHotelDetails);
    setFLag(!flag);
  };
  return (
    <HomePageContainer>
      <Box display="flex" sx={{ flexWrap: "wrap", gap: "20px" }}>
        {availableHotels.map((hotel) => {
          return (
            <CustomBox>
              <>
              <h2> PG : {hotel?.name}</h2>
              <h2> No of floors: {hotel?.noOfFloors}</h2></>
            </CustomBox>
          );
        })}
      </Box>
      <Box
        marginLeft="25px"
        sx={{ display: "flex", flexDirection: "column", width: "250px" }}
      >
        <h3>Add new PG</h3>
        <TextField
          type="text"
          value={addHotel.name}
          className="hotelName"
          onChange={(e) => {
            handleChange(e, "name");
          }}
        />
        <br />
        <TextField
          type="number"
          value={addHotel.noOfFloors}
          className="hotelFloors"
          onChange={(e) => {
            handleChange(e, "noOfFloors");
          }}
        />
        <br />
        <Button
          variant="contained"
          className="submitButton"
          onClick={handleSubmit}
          disabled={!addHotel.name || !addHotel.noOfFloors}
        >
          Submit
        </Button>
      </Box>
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  //background-color: "red" !important;
`;

export default HomePage;
