import { useEffect, useState } from "react";
import { USER_URL } from "../../../utils/constants";
import { fetchData } from "../../../utils/functions";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetchData(USER_URL);

    if (response.status === 200) {
      setUsers(response.data);
    }
  };

  return <div></div>;
};

export default Users;
