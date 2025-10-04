// @ts-nocheck
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useVolunteerStore } from '@/stores/volunteerStore';
import { VolunteerCategory } from '@/types/volunteer.types';
import { Button } from '@/components/ui/button';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCategoryIcon = (category: VolunteerCategory) => {
  const icons = {
    education: { emoji: '📚', color: '#5B4B9C' },
    ecology: { emoji: '🌱', color: '#8BC53F' },
    sport: { emoji: '⚽', color: '#FF9500' },
    culture: { emoji: '🎭', color: '#E91E8C' },
    social: { emoji: '🤝', color: '#FF6B9D' },
    health: { emoji: '❤️', color: '#EF4444' }
  };
  
  const icon = icons[category];
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${icon.color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        ${icon.emoji}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const getCategoryName = (category: VolunteerCategory): string => {
  const names = {
    education: 'Edukacja',
    ecology: 'Ekologia',
    sport: 'Sport',
    culture: 'Kultura',
    social: 'Pomoc społeczna',
    health: 'Zdrowie'
  };
  return names[category];
};

const getCategoryColor = (category: VolunteerCategory): string => {
  const colors = {
    education: 'bg-purple-100 text-purple-800',
    ecology: 'bg-green-100 text-green-800',
    sport: 'bg-orange-100 text-orange-800',
    culture: 'bg-pink-100 text-pink-800',
    social: 'bg-rose-100 text-rose-800',
    health: 'bg-red-100 text-red-800'
  };
  return colors[category];
};

export const MiniMapView = () => {
  const krakowCenter: [number, number] = [50.0614, 19.9366];
  const { opportunities } = useVolunteerStore();
  
  const upcomingOpportunities = opportunities
    .filter(opp => new Date(opp.date.start) > new Date())
    .slice(0, 10);

  return (
    <div className="w-full h-full relative">
      {/* @ts-expect-error - react-leaflet prop types */}
      <MapContainer
        center={krakowCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={true}
      >
        {/* @ts-expect-error - react-leaflet prop types */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {upcomingOpportunities.map((opp) => (
          // @ts-expect-error - react-leaflet prop types
          <Marker
            key={opp.id}
            position={opp.location.coordinates as [number, number]}
            icon={createCategoryIcon(opp.category)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${getCategoryColor(opp.category)}`}>
                  {getCategoryName(opp.category)}
                </div>
                <h4 className="font-bold text-sm mb-1">{opp.title}</h4>
                <p className="text-xs text-gray-600 mb-1">{opp.organization}</p>
                <p className="text-xs text-gray-500 mb-2">
                  📅 {new Date(opp.date.start).toLocaleDateString('pl-PL')} • {opp.timeCommitment}
                </p>
                <Button
                  onClick={() => window.location.href = `/opportunities/${opp.id}`}
                  className="w-full bg-primary text-white py-1 px-3 rounded text-xs font-semibold hover:bg-primary/90 transition"
                >
                  Zobacz więcej
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg z-[1000]">
        <p className="text-sm font-semibold text-gray-800">
          📍 {upcomingOpportunities.length} nadchodzących wolontariatów
        </p>
      </div>
    </div>
  );
};
