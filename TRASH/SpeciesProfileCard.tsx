// components/SpeciesProfileCard.tsx
import styles from './SpeciesProfileCard.module.css';

interface SpeciesProfile {
    taxonKey: number;
    marine?: boolean;
    freshwater?: boolean;
    terrestrial?: boolean;
    extinct?: boolean;
    hybrid?: boolean;
    livingPeriod?: string;
    lifeForm?: string;
    habitat?: string;
    ageInDays?: number;
    sizeInMillimeter?: number;
    massInGram?: number;
    source?: string;
    sourceTaxonKey?: number;
  }
  
interface SpeciesProfileCardProps {
  profiles: SpeciesProfile[];
}

const SpeciesProfileCard = ({ profiles }: SpeciesProfileCardProps) => {
  return (
    <div className={styles.gridContainer}>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div key={profile.taxonKey} className={styles.card}>
            {profile.livingPeriod && <p><strong>Living Period:</strong> {profile.livingPeriod}</p>}
            {profile.lifeForm && <p><strong>Life Form:</strong> {profile.lifeForm}</p>}
            {profile.habitat && <p><strong>Habitat:</strong> {profile.habitat}</p>}
            {profile.marine && <p><strong>Marine:</strong> Yes</p>}
            {profile.freshwater && <p><strong>Freshwater:</strong> Yes</p>}
            {profile.terrestrial && <p><strong>Terrestrial:</strong> Yes</p>}
            {profile.extinct && <p><strong>Extinct:</strong> Yes</p>}
            {profile.hybrid && <p><strong>Hybrid:</strong> Yes</p>}
            {profile.ageInDays && <p><strong>Age in Days:</strong> {profile.ageInDays}</p>}
            {profile.sizeInMillimeter && <p><strong>Size in Millimeters:</strong> {profile.sizeInMillimeter}</p>}
            {profile.massInGram && <p><strong>Mass in Grams:</strong> {profile.massInGram}</p>}
            {profile.source && <p><strong>Source:</strong> {profile.source}</p>}
          </div>
        ))
      ) : (
        <p>No species profile data available.</p>
      )}
    </div>
  );
};

export default SpeciesProfileCard;
