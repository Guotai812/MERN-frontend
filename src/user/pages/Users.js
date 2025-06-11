import React from "react";
import { useHttp } from "../../shared/hooks/http-hook";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [users, error, isLoading] = useHttp("get", "http://localhost:5001/api/users/");

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <UsersList items={users} />
    </>
  );
};

export default Users;
