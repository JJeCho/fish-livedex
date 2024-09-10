"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import styles from './SpeciesSearch.module.css'; // For custom styles

// Define TypeScript interface for the iNaturalist API Taxon Record
interface TaxonRecord {
  id: number;
  name: string;
  canonicalName: string;
  scientificName: string;
  rank: string;
  status: string;
  preferred_common_name: string;
  observations_count: number;
  default_photo?: {
    medium_url: string;
    attribution: string;
  };
}

// Define the structure for API response type
interface ApiResponse {
  results: Array<{
    type: string;
    record: TaxonRecord;
  }>;
}

const SpeciesSearch: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Define query as a string
  const [species, setSpecies] = useState<TaxonRecord[]>([]); // Define species as an array of TaxonRecord

  // This function will fetch data from the iNaturalist API
  const fetchSpecies = async (query: string) => {
    try {
      const response = await axios.get<ApiResponse>(`https://api.inaturalist.org/v1/search?q=${query}&sources=taxa`);
      const speciesData = response.data.results
        .filter(result => result.type === 'Taxon')
        .map(result => result.record);
      setSpecies(speciesData); // Update the species array with the API response
    } catch (error) {
      console.error('Error fetching species data:', error);
    }
  };

  // Trigger fetch when the query changes
  useEffect(() => {
    if (query) {
      fetchSpecies(query);
    } else {
      setSpecies([]);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <h1>Search for Species</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a species name..."
        className={styles.input}
      />
      <div className={styles.grid}>
        {species.length > 0 ? (
          species.map((item) => (
            <SpeciesCard key={item.id} species={item} />
          ))
        ) : (
          <p>No species found. Try typing something!</p>
        )}
      </div>
    </div>
  );
};

// New SpeciesCard component to handle individual species details
const SpeciesCard: React.FC<{ species: TaxonRecord }> = ({ species }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/species/${species.id}`); // Navigate to species details page
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <h2 className={styles.hoverTitle}>{species.canonicalName || species.name}</h2>
        </HoverCardTrigger>
        <HoverCardContent className={styles.hoverContent}>
          <h4>Common Name: {species.preferred_common_name || 'N/A'}</h4>
          <p><strong>Scientific Name:</strong> {species.scientificName}</p>
          <p><strong>Observation Count:</strong> {species.observations_count}</p>
          <p><strong>Rank:</strong> {species.rank}</p>
          <p><strong>Status:</strong> {species.status}</p>
          {species.default_photo && (
            <div>
              <img src={species.default_photo.medium_url} alt={species.scientificName} />
              <p><small>{species.default_photo.attribution}</small></p>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SpeciesSearch;
