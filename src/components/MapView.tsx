// @ts-nocheck
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useVolunteerStore } from '@/stores/volunteerStore';
import { VolunteerCategory } from '@/types/volunteer.types';
import { Button } from '@/components/ui/button';

// Fix dla ikon Leaflet w React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Niestandardowe ikony dla kategorii
const createCustomIcon = (emoji: string, color: string) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

const categoryIcons = {
  education: createCustomIcon('📚', '#5B4B9C'),
  ecology: createCustomIcon('🌱', '#8BC53F'),
  sport: createCustomIcon('⚽', '#FF9500'),
  culture: createCustomIcon('🎭', '#E91E8C'),
  social: createCustomIcon('🤝', '#FF6B9D'),
  health: createCustomIcon('❤️', '#EF4444')
};

interface MapViewProps {
  selectedCategory?: string;
  onMarkerClick?: (id: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ selectedCategory = 'all', onMarkerClick }) => {
  const krakowCenter: [number, number] = [50.0614, 19.9366];
  const { opportunities } = useVolunteerStore();

  const filteredOpportunities = selectedCategory === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  return (
    // @ts-expect-error - react-leaflet prop types
    <MapContainer
      center={krakowCenter}
      zoom={12}
      style={{ height: '600px', width: '100%', borderRadius: '12px' }}
      scrollWheelZoom={true}
    >
      {/* @ts-expect-error - react-leaflet prop types */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {filteredOpportunities.map((opp) => (
        // @ts-expect-error - react-leaflet prop types
        <Marker
          key={opp.id}
          position={opp.location.coordinates as [number, number]}
          icon={categoryIcons[opp.category]}
        >
          {/* @ts-expect-error - react-leaflet prop types */}
          <Popup maxWidth={300}>
            <div className="p-2">
              {opp.imageUrl && (
                <img 
                  src={opp.imageUrl} 
                  alt={opp.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h3 className="font-bold text-lg mb-1">{opp.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{opp.organization}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span>📅 {new Date(opp.date.start).toLocaleDateString('pl-PL')}</span>
                <span>⏰ {opp.timeCommitment}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {opp.currentVolunteers}/{opp.maxVolunteers} uczestników
                </span>
              </div>
              <Button
                onClick={() => onMarkerClick && onMarkerClick(opp.id)}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition"
              >
                Zobacz szczegóły
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Legenda */}
      <div className="leaflet-top leaflet-left" style={{ marginTop: '80px' }}>
        <div className="leaflet-control bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold mb-3 text-sm">Kategorie</h4>
          <div className="space-y-2">
            {[
              { category: 'education' as VolunteerCategory, label: 'Edukacja', emoji: '📚' },
              { category: 'ecology' as VolunteerCategory, label: 'Ekologia', emoji: '🌱' },
              { category: 'sport' as VolunteerCategory, label: 'Sport', emoji: '⚽' },
              { category: 'culture' as VolunteerCategory, label: 'Kultura', emoji: '🎭' },
              { category: 'social' as VolunteerCategory, label: 'Społeczne', emoji: '🤝' },
              { category: 'health' as VolunteerCategory, label: 'Zdrowie', emoji: '❤️' }
            ].map(({ category, label, emoji }) => (
              <div key={category} className="flex items-center gap-2 text-xs">
                <span className="text-lg">{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MapContainer>
  );
};
