import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VisitedCity {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

const visitedCities: VisitedCity[] = [
  // Turkey
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Izmir', country: 'Turkey', lat: 38.4192, lng: 27.1287 },
  { name: 'Ankara', country: 'Turkey', lat: 39.9334, lng: 32.8597 },
  { name: 'Eskişehir', country: 'Turkey', lat: 39.7767, lng: 30.5206 },
  { name: 'Edirne', country: 'Turkey', lat: 41.6818, lng: 26.5623 },
  { name: 'Konya', country: 'Turkey', lat: 37.8746, lng: 32.4932 },
  { name: 'Antalya', country: 'Turkey', lat: 36.8969, lng: 30.7133 },
  { name: 'Muğla', country: 'Turkey', lat: 37.2153, lng: 28.3636 },
  { name: 'Iğdır', country: 'Turkey', lat: 39.9237, lng: 44.0450 },
  { name: 'Balıkesir', country: 'Turkey', lat: 39.6484, lng: 27.8826 },
  { name: 'Çanakkale', country: 'Turkey', lat: 40.1553, lng: 26.4142 },
  { name: 'Bursa', country: 'Turkey', lat: 40.1826, lng: 29.0669 },
  // Azerbaijan
  { name: 'Baku', country: 'Azerbaijan', lat: 40.4093, lng: 49.8671 },
  { name: 'Nakhchivan', country: 'Azerbaijan', lat: 39.2090, lng: 45.4123 },
];

// Create custom icons with hover state
const createCustomIcon = (color: string, isHovered: boolean = false) => {
  const size = isHovered ? 16 : 12;
  const opacity = isHovered ? 1 : 0.8;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid rgba(255,255,255,0.9);
        border-radius: 50%;
        box-shadow: 0 0 ${isHovered ? '12px' : '6px'} rgba(255,255,255,${opacity * 0.5});
        transition: all 0.2s ease;
        cursor: pointer;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 5],
  });
};

export const TravelMap: React.FC = () => {
  const [mapKey, setMapKey] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  
  // Center coordinates (between Turkey and Azerbaijan)
  const centerLat = 39.5;
  const centerLng = 35.0;

  // Inject custom CSS for Leaflet styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: rgba(0,0,0,0.9) !important;
        backdrop-filter: blur(8px) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        border-radius: 8px !important;
        padding: 0 !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
      }
      
      .leaflet-popup-content {
        margin: 0 !important;
        padding: 0 !important;
        border-radius: 8px !important;
      }
      
      .leaflet-popup-tip {
        background: rgba(0,0,0,0.9) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
      }
      
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      
      .leaflet-container {
        filter: grayscale(25%) brightness(0.95) contrast(1.05);
        background: transparent !important;
      }
      
      .leaflet-tile-pane {
        filter: brightness(0.9) grayscale(15%);
      }
      
      .leaflet-control-zoom {
        display: none !important;
      }
      
      .leaflet-popup-close-button {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.section 
      className="w-full mt-8 max-md:mt-6 max-md:max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.0 }}
    >
      <div className="flex items-center justify-between mb-[18px] max-md:mb-4 px-4 max-md:px-0">
        <motion.h2 
          className="text-white text-xl max-md:text-lg font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
        >
          Places I've Been
        </motion.h2>
      </div>

      <motion.div 
        className="relative bg-[rgba(21,21,21,1)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] rounded-3xl max-md:rounded-2xl overflow-hidden h-[350px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 2.2 }}
      >
        {/* OpenStreetMap with Leaflet */}
        <div className="absolute inset-0 rounded-3xl max-md:rounded-2xl overflow-hidden bg-[rgba(21,21,21,1)]">
          <MapContainer
            key={mapKey}
            center={[centerLat, centerLng]}
            zoom={5}
            style={{ 
              height: '100%', 
              width: '100%',
              borderRadius: 'inherit',
              background: 'transparent'
            }}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            dragging={true}
            zoomSnap={0.25}
            zoomDelta={0.5}
            wheelPxPerZoomLevel={60}
          >
            {/* Custom medium brightness tile layer */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              opacity={0.55}
            />
            
            {/* City markers */}
            {visitedCities.map((city, index) => (
              <Marker
                key={city.name}
                position={[city.lat, city.lng]}
                icon={createCustomIcon(
                  city.country === 'Turkey' ? '#f87171' : '#60a5fa',
                  hoveredCity === city.name
                )}
                eventHandlers={{
                  mouseover: () => setHoveredCity(city.name),
                  mouseout: () => setHoveredCity(null),
                }}
              >
                <Popup
                  className="custom-popup"
                  closeButton={false}
                  autoClose={true}
                  closeOnClick={true}
                >
                  <div className="p-2.5 text-center min-w-[100px]">
                    <div className="text-white font-medium text-sm">{city.name}</div>
                    <div className="text-gray-400 text-xs">{city.country}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Statistics */}
        <div className="absolute bottom-4 left-6 right-6 max-md:left-4 max-md:right-4 z-[1000]">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              {visitedCities.length} cities visited
            </span>
            <span className="text-gray-400">
              {new Set(visitedCities.map(city => city.country)).size} countries
            </span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}; 