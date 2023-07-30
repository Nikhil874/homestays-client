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
                  <h3> Floor No : {floor?.floorNo}</h3>
                  <h3> No of rooms: {floor?.noOfRooms}</h3>
                  <table>
                    <thead>
                      <tr>
                        <td>Sharing type</td>
                        <td>Vacancies</td>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>1</td>
                      <td>{floor?.vacancies[1]}</td>
                      </tr>
                    <tr>
                      <td>2</td>
                      <td>{floor?.vacancies[2]}</td>
                      </tr>
                    <tr>
                      <td>3</td>
                      <td>{floor?.vacancies[3]}</td>
                      </tr>
                    <tr>
                      <td>4</td>
                      <td>{floor?.vacancies[4]}</td>
                      </tr>
                    <tr>
                      <td>5</td>
                      <td>{floor?.vacancies[5]}</td>
                      </tr>
                    </tbody>
                  </table>
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
