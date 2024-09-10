// Server Component for fetching species details
import "./SpeciesPage.css";
import SpeciesDetails from './SpeciesDetails'; // Import your Client Component

// Define the structure for ancestor and child species
interface Photo {
  medium_url: string;
  url: string;
}

interface Ancestor {
  id: number;
  rank: string;
  name: string;
  default_photo?: Photo;
}

interface Child {
  id: number;
  name: string;
  rank: string;
  default_photo?: Photo;
  preferred_common_name?: string;
}

interface Species {
  id: number;
  name: string;
  rank: string;
  extinct: boolean;
  observations_count: number;
  wikipedia_url?: string;
  default_photo?: Photo;
  ancestors: Ancestor[];
  children?: Child[];
  preferred_common_name?: string;
}

// This is the Server Component that fetches data
const SpeciesPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // Fetch species details from iNaturalist API
  const response = await fetch(`https://api.inaturalist.org/v1/taxa/${id}`);
  const data = await response.json();

  // Safely handle the case when no results are returned
  if (!data.results || data.results.length === 0) {
    return <p>No species data found for ID: {id}</p>;
  }

  const species: Species = data.results[0]; // Assuming the API returns a single result

  // Pass the fetched species data to the Client Component
  return <SpeciesDetails species={species} />;
};

export default SpeciesPage;
