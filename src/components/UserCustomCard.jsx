import React, { useState } from "react";
import CustomBox from "./CustomBox";
import moment from "moment/moment";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Button } from "@mui/material";

const UserCard = (props) => {
  const { user, getUsersData, roomId } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [mobile, setMobile] = useState(user?.mobileNo || "");
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

  const handleSave = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/${id}`, {
        mobileNo: mobile,
      });
      toast.success("Mobile added");
      getUsersData(roomId);
    } catch (e) {
      toast.error(
        typeof e?.response?.data === "string"
          ? e.response.data
          : "Invalid request"
      );
      console.log(e);
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <CustomBox>
      <>
        <h4> Name : {user?.name}</h4>
        <h4>Start date: {moment(user?.startDate).format("DD/MM/YYYY")}</h4>
        <h4>Amount: {user?.amount}</h4>
        <h4>
          Phone: {" "}
          <span>
            {!isEdit ? (
              user?.mobileNo
            ) : (
              <input
                placeholder="Enter 10 digit Number"
                type="number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                style={{
                  height: "45px",
                  background: "#FAF0D7",
                }}
              />
            )}
          </span>
        </h4>
        <Button
          sx={{ marginRight: "2px" }}
          onClick={() => {
            {
              !isEdit ? setIsEdit(true) : handleSave(user?._id);
            }
          }}
          variant="contained"
          disabled={isEdit && mobile.length != 10}
        >
          {!isEdit ? "Edit mobile" : "Save"}
        </Button>
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
  );
};

export default UserCard;
