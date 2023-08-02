import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constants";
import UsersTable from "../components/UsersTable";
import { toast } from "react-hot-toast";

const PaymentsTrackingPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  
  
  const getUsersOfPg = async (id, currentPage, size) => {
    try {
      let { data } = await axios.get(
        `${BASE_URL}/users?page=${currentPage}&size=${size}`
      );
      const { response = [], noOfPages = 0, totalEntries = 0 } = data;
      if (!!response?.length) {
        let pgUsers = response.filter(
          (user) => user.room?.pgId && user.room.pgId === id
        );
        console.log("pgUsers", pgUsers);
        if (!!pgUsers?.length) {
          setUsersData(pgUsers);
          setTotalEntries(totalEntries);
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  
  return (
    <div style={{ padding: "2rem"}}>
      <UsersTable rows={usersData} getUsersOfPg={getUsersOfPg} totalEntries={totalEntries} />
    </div>
  );
}

export default PaymentsTrackingPage;