import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import { Box } from "@mui/material";
import CustomBox from "../components/CustomBox";
import NavButton from "../components/NavButton";

const FloorsPage = () => {
  const params = useParams();
  const [floors, setFloors] = useState([]);
  const navigate = useNavigate();
  const getFloorsData = async (id) => {
    const res = await axios.get(`${BASE_URL}/floors/${id}`);
    setFloors(res?.data);
  };
  useEffect(() => {
    getFloorsData(params?.id);
  }, []);

  return (
    <>
      <NavButton path={"/"} />
      <Box
        display="flex"
        sx={{ flexWrap: "wrap", gap: "20px", marginLeft: "25px" }}
      >
        {floors.map((floor) => {
          return (
            <div
              onClick={() => {
                  return navigate(`/rooms/${floor?._id}`);
              }}
            >
              <CustomBox>
                <>
                  <h2> No : {floor?.floorNo}</h2>
                  <h2> No of rooms: {floor?.noOfRooms}</h2>
                </>
              </CustomBox>
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default FloorsPage;
