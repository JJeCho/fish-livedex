"use client"; // Declare it as a Client Component
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import "./SpeciesMedia.css";

interface Photo {
  id: number;
  attribution: string;
  license_code: string | null;
  url: string;
  medium_url?: string;
  square_url?: string;
}

interface Taxon {
  name: string;
  preferred_common_name: string;
  rank: string;
  wikipedia_url?: string;
}

interface User {
  name: string;
  login: string;
}

interface Observation {
  id: number;
  photos: Photo[];
  observed_on: string;
  taxon: Taxon;
  location?: string;
  user: User;
  description?: string;
  place_guess?: string;
  identifications_count?: number;
  comments_count?: number;
}

interface SpeciesMediaProps {
  observations: Observation[];
  id: string;
}

const getModifiedPhotoUrl = (url: string, size: string) => {
    // Replace the last part of the URL that contains the size (e.g., "square.jpg" or "square.jpeg") with the desired size (e.g., "medium.jpg" or "medium.jpeg")
    return url.replace(/(square|thumb|small|medium|large|original)\.(jpg|jpeg)$/, `${size}.$2`);
  };
  

const SpeciesMedia = ({ observations, id }: SpeciesMediaProps) => {
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
  };

  const previousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? observation.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card">
      <div className="mediacard-info">
        {/* Title with Wikipedia link */}
        <h4>
          {observation.taxon.wikipedia_url ? (
            <a
              href={observation.taxon.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {observation.taxon.preferred_common_name ||
                observation.taxon.name}{" "}
              ({observation.taxon.rank})
            </a>
          ) : (
            `${
              observation.taxon.preferred_common_name || observation.taxon.name
            } (${observation.taxon.rank})`
          )}
        </h4>

        <p>
          Observed on: {new Date(observation.observed_on).toLocaleDateString()}
        </p>
        <p>
          Location:{" "}
          {observation.location || observation.place_guess || "Unknown"}
        </p>

        {/* Description hover card */}
        {observation.description && (
          <HoverCard>
            <HoverCardTrigger>
              <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                View Description
              </p>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>{observation.description}</p>
            </HoverCardContent>
          </HoverCard>
        )}

        <p>
          User: {observation.user.name} (@{observation.user.login})
        </p>
        <p>Identifications: {observation.identifications_count || 0}</p>
        <p>Comments: {observation.comments_count || 0}</p>
      </div>

      {observation.photos.length > 0 && (
        <div className="photo-container">
          <img
            src={getModifiedPhotoUrl(
              observation.photos[currentPhotoIndex].url,
              "medium"
            )}
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
