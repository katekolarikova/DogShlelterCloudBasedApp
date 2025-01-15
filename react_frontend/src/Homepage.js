import React, { useEffect, useState } from "react";
import DogCard from "./DogCard";

function Homepage() {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://152.94.163.198:30003/api/dogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data.");
        }
        return response.json();
      })
      .then((data) => setDogs(data))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <h1 className="my-4 text-center">Dogs in Our Shelter</h1>
      {error ? (
        <p className="text-center text-danger">
          Failed to load data. Please try again later.
        </p>
      ) : (
        <div className="row">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      )}
    </>
  );
}

export default Homepage;
