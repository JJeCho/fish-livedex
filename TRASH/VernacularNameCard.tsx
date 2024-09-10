// components/VernacularNameCard.tsx
import styles from './VernacularNameCard.module.css';

interface VernacularName {
    taxonKey: number;
    vernacularName: string;
    language?: string;
    source?: string;
    sourceTaxonKey?: number;
    country?: string;
    area?: string;
  }
  
interface VernacularNameCardProps {
  names: VernacularName[];
}

const VernacularNameCard = ({ names }: VernacularNameCardProps) => {
  return (
    <div className={styles.gridContainer}>
      {names.length > 0 ? (
        names.map((name) => (
          <div key={name.taxonKey} className={styles.card}>
            <p><strong>Name:</strong> {name.vernacularName}</p>
            {name.language && <p><strong>Language:</strong> {name.language}</p>}
            {name.country && <p><strong>Country:</strong> {name.country}</p>}
            {name.area && <p><strong>Area:</strong> {name.area}</p>}
            {name.source && <p><strong>Source:</strong> {name.source}</p>}
          </div>
        ))
      ) : (
        <p>No vernacular names available.</p>
      )}
    </div>
  );
};

export default VernacularNameCard;
