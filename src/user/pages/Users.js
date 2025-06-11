import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5001/api/users");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(resData.message);
        }
        const resData = await response.json();
        setUsers(resData.users || []);
        setLoading(false);
      } catch (error) {
        setError(error.message || "somthing went wrong");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <UsersList items={users} />
    </>
  );
};

export default Users;
