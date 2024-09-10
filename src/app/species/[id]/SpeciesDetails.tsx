'use client'; // This is the Client Component

import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

interface SpeciesDetailsProps {
  species: {
    id: number;
    name: string;
    rank: string;
    extinct: boolean;
    observations_count: number;
    wikipedia_url?: string;
    default_photo?: {
      medium_url: string;
      url: string;
    };
    ancestors: Array<{
      id: number;
      rank: string;
      name: string;
      default_photo?: {
        medium_url: string;
        url: string;
      };
    }>;
    children?: Array<{
      id: number;
      name: string;
      rank: string;
      default_photo?: {
        medium_url: string;
        url: string;
      };
    }>;
  };
}

const SpeciesDetails = ({ species }: SpeciesDetailsProps) => {
  const router = useRouter(); // Initialize the router

  // Handler function to navigate on click
  const handleNavigate = (id: number) => {
    router.push(`/species/${id}`); // Push the route with the species ID
  };

  return (
    <div className="species-id-container">
      <h1>Species Information for ID: {species.id}</h1>

      <div className="species-id-info">
        {/* Basic species information */}
        <div className="species-basic-info">
          <h2>{species.name} ({species.rank})</h2>
          {species.default_photo && (
            <img src={species.default_photo.medium_url} alt={species.name} />
          )}
          <p><strong>Scientific Name:</strong> {species.name}</p>
          <p><strong>Rank:</strong> {species.rank}</p>
          <p><strong>Observations Count:</strong> {species.observations_count}</p>
          <p><strong>Extinct:</strong> {species.extinct ? 'Yes' : 'No'}</p>
        </div>

        {/* Ancestry Section */}
        <div className="species-ancestry">
          <h3>Ancestry</h3>
          <ul>
            {species.ancestors.map((ancestor) => (
              <li
                key={ancestor.id}
                onClick={() => handleNavigate(ancestor.id)} // Navigate on card click
                style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickable
              >
                <p><strong>{ancestor.rank}:</strong> {ancestor.name}</p>
                {ancestor.default_photo && (
                  <img
                    src={ancestor.default_photo.medium_url}
                    alt={ancestor.name}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Related Species Section */}
        <div className="species-relatives">
          <h3>Species in this Genus</h3>
          {species.children && species.children.length > 0 ? (
            <ul>
              {species.children.map((child) => (
                <li
                  key={child.id}
                  onClick={() => handleNavigate(child.id)} // Navigate on card click
                  style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickable
                >
                  <p><strong>{child.name}:</strong> ({child.rank})</p>
                  {child.default_photo && (
                    <img
                      src={child.default_photo.medium_url}
                      alt={child.name}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No child species available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetails;
