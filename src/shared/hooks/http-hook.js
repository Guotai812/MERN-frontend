import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";

export const useHttp = (method, path) => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(path);
        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message);
        }
        setUsers(resData.users || []);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "somthing went wrong");
        setIsLoading(false);
      }
    };
    if (method === "get") {
      fetchUsers();
    }
  }, [method, path]);

  const sendRequest = async (secondPath, body) => {
    try {
      const response = await fetch(secondPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      auth.login();
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  return [users, error, isLoading, setError, setIsLoading, sendRequest];
};
