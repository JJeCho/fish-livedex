// components/DistributionCard.tsx
import styles from './DistributionCard.module.css';

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

interface DistributionCardProps {
  distributions: Distribution[];
}

const DistributionCard = ({ distributions }: DistributionCardProps) => {
  return (
    <div className={styles.gridContainer}>
      {distributions.length > 0 ? (
        distributions.map((dist) => (
          <div key={dist.taxonKey} className={styles.card}>
            <p><strong>Location:</strong> {dist.locality || dist.locationId}</p>
            {dist.establishmentMeans && <p><strong>Establishment Means:</strong> {dist.establishmentMeans}</p>}
            {dist.threatStatus && <p><strong>Threat Status:</strong> {dist.threatStatus}</p>}
            {dist.source && <p><strong>Source:</strong> {dist.source}</p>}
            {dist.remarks && <p><strong>Remarks:</strong> {dist.remarks}</p>}
          </div>
        ))
      ) : (
        <p>No distribution data available.</p>
      )}
    </div>
  );
};

export default DistributionCard;
