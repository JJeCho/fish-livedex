import axios from 'axios';
import styles from './SpeciesDetails.module.css';

// Define the Distribution interface based on the example API response
interface Distribution {
  taxonKey: number;
  locationId: string;
  locality?: string;
  establishmentMeans?: string;
  threatStatus?: string;
  source?: string;
  sourceTaxonKey?: number;
  remarks?: string;
}

// Fetch data for the species distribution
const fetchSpeciesDistributions = async (speciesId: string): Promise<Distribution[]> => {
  const response = await axios.get(`https://api.gbif.org/v1/species/${speciesId}/distributions`);
  console.log(response.data)
  return response.data.results || [];
};

interface SpeciesDetailsProps {
  params: { id: string };
}

const SpeciesDetails = async ({ params }: SpeciesDetailsProps) => {
  const distributions = await fetchSpeciesDistributions(params.id);

  return (
    <div className="distributionCard">
      <h1>Species Distribution for ID: {params.id}</h1>

      {distributions.length > 0 ? (
        <div className={styles.gridContainer}>
          {distributions.map((dist) => (
            <div key={dist.taxonKey} className={styles.card}>
              <p><strong>Location:</strong> {dist.locality || dist.locationId}</p>
              {dist.establishmentMeans && <p><strong>Establishment Means:</strong> {dist.establishmentMeans}</p>}
              {dist.threatStatus && <p><strong>Threat Status:</strong> {dist.threatStatus}</p>}
              {dist.source && <p><strong>Source:</strong> {dist.source}</p>}
              {dist.remarks && <p><strong>Remarks:</strong> {dist.remarks}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No distribution data found for this species.</p>
      )}
    </div>
  );
};

export default SpeciesDetails;
