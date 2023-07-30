import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavButton from "../components/NavButton";
import CustomBox from "../components/CustomBox";
import { Box } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../constants";

const RoomsPage = () => {
  const params = useParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const getRoomsData = async (id) => {
    const res = await axios.get(`${BASE_URL}/rooms/${id}`);
    setRooms(res?.data);
  };
  useEffect(() => {
    getRoomsData(params?.id);
  }, []);
  return (
    <div>
      {" "}
      <NavButton path={`/floors/${params.id}`} />
      <Box
        display="flex"
        sx={{ flexWrap: "wrap", gap: "20px", marginLeft: "25px" }}
      >
        {rooms?.map((room) => {
          return (
            <div
              onClick={() => {
                return navigate(`/tenents/${room?._id}`);
              }}
            >
              <CustomBox>
                <>
                  <h4> No : {room?.roomNo}</h4>
                  <h4> sharing type: {room?.sharingType}</h4>
                  <h4>No of People: {room.tenants?.length}</h4>
                </>
              </CustomBox>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default RoomsPage;
