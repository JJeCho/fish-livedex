"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import styles from './SpeciesSearch.module.css'; // For custom styles

// Define a TypeScript interface to describe the species data from GBIF API
interface Species {
  key: number;
  nameKey: number;
  kingdom: string;
  phylum: string;
  order: string;
  family: string;
  genus: string;
  kingdomKey: number;
  phylumKey: number;
  orderKey: number;
  familyKey: number;
  genusKey: number;
  parent: string;
  parentKey: number;
  nubKey: number;
  scientificName: string;
  canonicalName: string;
  rank: string;
  status: string;
  higherClassificationMap: { [key: string]: string };
  synonym: boolean;
  class?: string;
  classKey?: number;
}

const SpeciesSearch: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Define query as a string
  const [species, setSpecies] = useState<Species[]>([]); // Define species as an array of Species


  // This function will fetch data from the GBIF API
  const fetchSpecies = async (query: string) => {
    try {
      const response = await axios.get<Species[]>(
        `https://api.gbif.org/v1/species/suggest?q=${query}`
      );
      console.log(response.data)
      setSpecies(response.data); // Update the species array with the API response
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
            <SpeciesCard key={item.key} species={item} />
          ))
        ) : (
          <p>No species found. Try typing something!</p>
        )}
      </div>
    </div>
  );
};

// New SpeciesCard component to handle individual species details
const SpeciesCard: React.FC<{ species: Species }> = ({ species }) => {
    const router = useRouter();

  const handleCardClick = () => {
    router.push(`/species/${species.key}`); // Navigate to species details page
  };
  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <h2 className={styles.hoverTitle}>{species.canonicalName}</h2>
        </HoverCardTrigger>
        <HoverCardContent className={styles.hoverContent}>
          <h4>Higher Classification Map:</h4>
          {Object.entries(species.higherClassificationMap).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
          <p><strong>{species.key}:</strong> {species.canonicalName}</p>
        </HoverCardContent>
      
      <p><strong>Scientific Name:</strong> {species.scientificName}</p>
      <p><strong>Kingdom:</strong> {species.kingdom}</p>
      <p><strong>Phylum:</strong> {species.phylum}</p>
      <p><strong>Order:</strong> {species.order}</p>
      <p><strong>Family:</strong> {species.family}</p>
      <p><strong>Genus:</strong> {species.genus}</p>

      {species.class && <p><strong>Class:</strong> {species.class}</p>}
      {species.order && <p><strong>Order:</strong> {species.order}</p>}
      <p><strong>Rank:</strong> {species.rank}</p>
      <p><strong>Status:</strong> {species.status}</p>
      <p><strong>Synonym:</strong> {species.synonym ? 'Yes' : 'No'}</p>
      </HoverCard>
    </div>
  );
};

export default SpeciesSearch;
