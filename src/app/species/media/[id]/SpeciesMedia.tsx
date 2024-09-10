'use client'; // Declare it as a Client Component
import { useState } from 'react';
import "./SpeciesMedia.css"

interface Photo {
  id: number;
  attribution: string;
  license_code: string;
  url: string;
  medium_url?: string;
  square_url?: string;
}

interface Observation {
  id: number;
  photos: Photo[];
  observed_on: string;
  taxon: {
    name: string;
    preferred_common_name: string;
    rank: string;
  };
}

interface SpeciesMediaProps {
  observations: Observation[];
  id: string;
}

const SpeciesMedia = ({ observations , id}: SpeciesMediaProps) => {
  return (
    <div className="media-container">
      <h1>Media for Species ID: {id}</h1>
      {observations.length > 0 ? (
        <div className="media-grid">
          {observations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
      ) : (
        <p>No media available for this species.</p>
      )}
    </div>
  );
};

interface ObservationCardProps {
  observation: Observation;
}

const ObservationCard = ({ observation }: ObservationCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === observation.photos.length - 1 ? 0 : prevIndex + 1
    );
    console.log(observation)
  };

  const previousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? observation.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card">
        <div className="mediacard-info">
      <h4>
        {observation.taxon.preferred_common_name || observation.taxon.name} ({observation.taxon.rank})
      </h4>
      <p>Observed on: {new Date(observation.observed_on).toLocaleDateString()}</p>
      </div>
      {observation.photos.length > 0 && (
        <div className="photo-container">
          <img
            src={observation.photos[currentPhotoIndex].url}
            alt="Species Media"
            className="photo"
          />
          {observation.photos.length > 1 && (
            <div className="photo-controls">
              <button onClick={previousPhoto}>Previous</button>
              <button onClick={nextPhoto}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  
  
};

export default SpeciesMedia;
