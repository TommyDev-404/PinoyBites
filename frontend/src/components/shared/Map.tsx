import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker() {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [modalPosition, setModalPosition] = useState<[number, number] | null>(null);

	useMapEvents({
	click(e) {
		const { lat, lng } = e.latlng;

		// Set marker position
		setPosition([lat, lng]);

		// Open modal
		setModalPosition([lat, lng]);
		setShowModal(true);

		// Log coordinates (for saving to DB later)
		console.log("Marker clicked at:", { lat, lng });
	},
	});

	return (
		<>
			{position && (
				<Marker position={position}>
					<Popup>Delivery location</Popup>
				</Marker>
				)}

				{/* Tailwind Modal */}
				{showModal && modalPosition && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
						<div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full">
							<h2 className="text-lg font-semibold mb-4">Delivery Location</h2>
							<p className="mb-4">
							Lat: {modalPosition[0].toFixed(5)}, Lng: {modalPosition[1].toFixed(5)}
							</p>
							<div className="flex justify-end space-x-2">
							<button
							className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
							onClick={() => setShowModal(false)}
							>
							Close
							</button>
							<button
							className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
							onClick={() => {
								console.log("Saved to DB:", modalPosition);
								setShowModal(false);
								// TODO: replace console.log with your API call to save coords
							}}
							>
							Save
							</button>
							</div>
						</div>
					</div>
				)}
		</>
	);
}

export default function MapComponent() {
	return (
		<MapContainer
			center={[9.875, 124.150]} // general center of Bohol
			zoom={10}
			style={{ height: "400px", width: "100%" }}
			maxBounds={[[9.50, 123.67], [10.25, 124.50]]} // SW & NE bounds
			maxBoundsViscosity={1.0}
			minZoom={8}
			maxZoom={18}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker />
		</MapContainer>
	);
}