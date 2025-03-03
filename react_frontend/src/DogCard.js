import React from 'react';

function DogCard({ dog }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{dog.name}</h5>
            <p className="card-text">{dog.breed} | {dog.age} years old</p>
            <hr />
            <p className="card-text">{dog.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DogCard;