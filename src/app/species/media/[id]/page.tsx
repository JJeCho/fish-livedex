import SpeciesMedia from './SpeciesMedia'; // Import the client component
import "./SpeciesMedia"
// Define the structure for media and observations

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

  

// This is the Server Component that fetches data
const SpeciesMediaPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // Fetch observations with photos for the given species ID
  const response = await fetch(`https://api.inaturalist.org/v1/observations?taxon_id=${id}&has[]=photos`);
  const data = await response.json();

  // Safely handle the case when no results are returned
  if (!data.results || data.results.length === 0) {
    return <p>No media available for species ID: {id}</p>;
  }

  const observations: Observation[] = data.results; // Assuming API returns a list of observations

  // Pass the fetched media data to the Client Component
  return <SpeciesMedia observations={observations} id={id}/>;
};

export default SpeciesMediaPage;
