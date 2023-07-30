import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavButton from "../components/NavButton";
import { Box, Button, TextField } from "@mui/material";
import CustomBox from "../components/CustomBox";
import axios from "axios";
import { BASE_URL } from "../constants";
import moment from "moment/moment";
import { toast } from "react-hot-toast";

const TenentsPage = () => {
  const params = useParams();
  const { id: roomId } = params;
  const [users, setUsers] = useState([]);
  const defaultUser = {
    name: "",
    startDate: "",
    amount: "",
  };
  const [userData, setUserData] = useState(defaultUser);
  const [roomData, setRoomData] = useState({});
  const [sharingType, setSharingType] = useState();
  //   setUserData({...defaultUser})
  // function clear()=()=>
  const addUser = async () => {
    try {
      const payload = {
        ...userData,
        room: roomId,
        amount: Number(userData.amount),
      };
      const res = await axios.post(`${BASE_URL}/users`, payload);
      toast.success("user added success");
      console.log("current", userData);
      setUserData({ ...defaultUser });
      // console.log(res.data);
    } catch (e) {
      toast.error(
        typeof e?.response?.data === "string"
          ? e.response.data
          : "Invalid request"
      );
      console.log(e);
    } finally {
      getUsersData(roomId);
    }
  };
  const getUsersData = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${id}`);
      setUsers(res?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getRoomData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/rooms/roomDetails/${roomId}`);
      console.log(res?.data);
      setRoomData(res?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/users/${id}`);
      toast.success("User deleted");
      getUsersData(roomId);
    } catch (e) {
      toast.error(
        typeof e?.response?.data === "string"
          ? e.response.data
          : "Invalid request"
      );
      console.log(e);
    }
  };

  const editSharingType = async () => {
    try {
      if(Number(sharingType) < users.length){
        toast.error(`Please delete ${users.length - sharingType} users`);
        return;
      }
      const res = await axios.post(`${BASE_URL}/rooms/${roomId}`, {
        sharingType: Number(sharingType),
      });
      toast.success("Updated sharing type");
      setSharingType("");
      getRoomData();
    } catch (e) {
      toast.error(
        typeof e?.response?.data === "string"
          ? e.response.data
          : "Invalid request"
      );
      console.log(e?.message);
    }
  };

  const handleChange = (e, key) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  useEffect(() => {
    getUsersData(roomId);
    getRoomData();
  }, []);
  return (
    <div>
      {" "}
      <NavButton path={`/floors/${params.id}`} />
      <Box
        style={{
          width: "200px",
          height: "auto",
          border: "1px solid black",
          background: "#FAF0D7",
          marginTop: "25px",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "25px",
        }}
      >
        <h4>Room Details</h4>
        <h5 style={{ padding: "0px", margin: "0px" }}>
          Room no: {roomData?.roomNo}
        </h5>
        <h5 style={{ padding: "0px", margin: "0px" }}>
          Sharing type: {roomData?.sharingType}
        </h5>
        <input
          placeholder="Enter Sharing type"
          type="number"
          value={sharingType}
          onChange={(e) => {
            setSharingType(Number(e.target.value) > 5 ? 5 : e.target.value);
          }}
          style={{
            height: "45px",
            background: "#FAF0D7",
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            editSharingType();
          }}
          disabled={!sharingType}
        >
          Edit sharing type
        </Button>
      </Box>
      <Box
        style={{
          width: "200px",
          height: "350px",
          border: "1px solid black",
          background: "#FAF0D7",
          marginTop: "25px",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "25px",
        }}
      >
        <h4>Add User</h4>
        <input
          placeholder="Enter Name"
          value={userData?.name}
          onChange={(e) => {
            handleChange(e, "name");
          }}
          style={{
            height: "45px",
            background: "#FAF0D7",
          }}
        />
        <input
          placeholder="Start Date"
          type="date"
          value={userData.startDate}
          onChange={(e) => {
            handleChange(e, "startDate");
          }}
          style={{
            height: "45px",
            background: "#FAF0D7",
          }}
        />
        <input
          placeholder="Enter Amount"
          type="number"
          value={userData.amount}
          onChange={(e) => {
            handleChange(e, "amount");
          }}
          style={{
            height: "45px",
            background: "#FAF0D7",
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            addUser();
          }}
          disabled={!userData.name || !userData.amount || !userData.startDate}
        >
          Add
        </Button>
      </Box>
      <Box
        display="flex"
        sx={{ flexWrap: "wrap", gap: "20px", marginLeft: "25px" }}
      >
        {users?.map((user) => {
          return (
            <div
              onClick={() => {
                // return navigate(`/tenents/${user?._id}`);
              }}
            >
              <CustomBox>
                <>
                  <h4> Name : {user?.name}</h4>
                  <h4>
                    Start date: {moment(user?.startDate).format("DD/MM/YYYY")}
                  </h4>
                  <h4>Amount: {user?.amount}</h4>
                  <Button
                    onClick={() => {
                      deleteUser(user?._id);
                    }}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </>
              </CustomBox>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default TenentsPage;
