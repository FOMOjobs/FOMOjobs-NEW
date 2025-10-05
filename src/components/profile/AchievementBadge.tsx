import obwarzanekBrown from '@/assets/obwarzanek-brown.png';
import obwarzanekSilver from '@/assets/obwarzanek-silver.png';
import obwarzanekBronze from '@/assets/obwarzanek-bronze.png';
import obwarzanekGold from '@/assets/obwarzanek-gold.png';
import obwarzanekDiamond from '@/assets/obwarzanek-diamond.png';

export type BadgeTier = 'odkrywca' | 'galopujacy' | 'straznik' | 'hejnalista' | 'ambasador';

interface AchievementBadgeProps {
  tier: BadgeTier;
  activitiesCompleted: number;
  className?: string;
}

const badgeConfig = {
  odkrywca: {
    name: 'Odkrywca Krakowa',
    image: obwarzanekBrown,
    minActivities: 1,
  },
  galopujacy: {
    name: 'Galopujący Pomocnik',
    image: obwarzanekSilver,
    minActivities: 3,
  },
  straznik: {
    name: 'Strażnik Smoka',
    image: obwarzanekBronze,
    minActivities: 6,
  },
  hejnalista: {
    name: 'Hejnalista Dobroci',
    image: obwarzanekGold,
    minActivities: 11,
  },
  ambasador: {
    name: 'Ambasador Krakowa',
    image: obwarzanekDiamond,
    minActivities: 21,
  },
};

export const getBadgeTier = (activitiesCompleted: number): BadgeTier => {
  if (activitiesCompleted >= 21) return 'ambasador';
  if (activitiesCompleted >= 11) return 'hejnalista';
  if (activitiesCompleted >= 6) return 'straznik';
  if (activitiesCompleted >= 3) return 'galopujacy';
  return 'odkrywca';
};

export const getAllBadges = (): BadgeTier[] => {
  return ['odkrywca', 'galopujacy', 'straznik', 'hejnalista', 'ambasador'];
};

export const AchievementBadge = ({ tier, activitiesCompleted, className = '' }: AchievementBadgeProps) => {
  const config = badgeConfig[tier];
  const isUnlocked = activitiesCompleted >= config.minActivities;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`relative ${!isUnlocked && 'opacity-30 grayscale'}`}>
        <img 
          src={config.image} 
          alt={config.name}
          className="w-16 h-16 object-contain"
        />
      </div>
      <p className="text-xs font-medium text-center">{config.name}</p>
      {!isUnlocked && (
        <p className="text-[10px] text-muted-foreground">
          Wymagane: {config.minActivities}
        </p>
      )}
    </div>
  );
};
