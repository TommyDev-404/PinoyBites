import { MapPin } from 'lucide-react';

interface ViewLocationMapProps {
  location: { lat: number; lng: number; address: string };
  customerName: string;
}

export function ViewLocationMap({ location, customerName }: ViewLocationMapProps) {
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5385!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM1JzU4LjIiTiAxMjDCsDU5JzAzLjEiRQ!5e0!3m2!1sen!2sph!4v1234567890!5m2!1sen!2sph`;

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, '_blank');
  };

  return (
    <div className="space-y-3">
      {/* Map Display */}
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
        <div className="relative h-[300px]">
          {/* Google Maps Iframe */}
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Delivery Location for ${customerName}`}
            className="absolute inset-0"
          />
          
          {/* Pin Marker Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <MapPin className="text-red-600 drop-shadow-lg" size={48} fill="currentColor" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full opacity-30 animate-pulse" />
            </div>
          </div>

          {/* Customer Name Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <p className="text-xs font-semibold text-gray-900">{customerName}</p>
          </div>
        </div>
      </div>

      {/* Location Info Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Delivery Location</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">{location.address}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📍 Lat: {location.lat.toFixed(6)}</span>
                <span>Lng: {location.lng.toFixed(6)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={openInGoogleMaps}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <MapPin size={16} />
          Open in Google Maps
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${location.lat}, ${location.lng}`);
            alert('Coordinates copied to clipboard!');
          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Copy Coordinates
        </button>
      </div>

      {/* Distance Info (Mock) */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          🚚 Estimated distance from bakery: <span className="font-semibold text-gray-700">3.2 km</span> • 
          Delivery time: <span className="font-semibold text-gray-700">15-20 mins</span>
        </p>
      </div>
    </div>
  );
}
