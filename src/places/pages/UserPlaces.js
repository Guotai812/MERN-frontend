import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const userId = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5001/api/places/user/${userId}`
        );
        setPlaces(data.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [(sendRequest, userId)]);

  const deleteHandler = (id) => {
    setPlaces(pre => pre.filter(place => place.id !== id))
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList items={places} onDelete={deleteHandler} />
    </>
  );
};

export default UserPlaces;
