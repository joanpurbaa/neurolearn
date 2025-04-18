import { memo, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	ZoomControl,
} from "react-leaflet";
import { Icon, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

type MapLocation = LatLngLiteral & { id: string };

type MapProps = {
	center: LatLngLiteral;
	locations: MapLocation[];
};

const SelectedLocation = ({ center }: { center: LatLngLiteral }) => {
	const map = useMap();
	map.panTo(center, { animate: true });
	return null;
};

// eslint-disable-next-line react/display-name
export const Map: React.FC<MapProps> = memo(({ center, locations }) => {
	const [mapType, setMapType] = useState<MapType>("roadmap");
	const [selectedLocation, setSelectedLocation] = useState<
		MapLocation | undefined
	>();
	const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);

	const getUrl = () => {
		const mapTypeUrls: Record<MapType, string> = {
			roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
			satellite: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
			hybrid: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
			terrain: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
		};
		return mapTypeUrls[mapType];
	};

	const mapMarkIcon = new Icon({
		iconUrl: "map-marker.png",
		iconSize: [47, 55],
	});
	const mapMarkActiveIcon = new Icon({
		iconUrl: "active-map-marker.png",
		iconSize: [57, 65],
	});

	const renderMarks = () => {
		return locations.map((location) => (
			<div key={location.id}>
				<Marker
					icon={
						new Icon({
							iconUrl: markerIconPng,
							iconSize: [25, 41],
							iconAnchor: [12, 41],
						})
					}
					position={{ lat: location.lat, lng: location.lng }}
					eventHandlers={{
						click: () => {
							setSelectedLocation(location);
						},
					}}
				/>
			</div>
		));
	};

	const handleMarkLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					const newLocation = { lat: latitude, lng: longitude };

					setUserLocation(newLocation);
					setSelectedLocation({
						id: "user-location",
						lat: latitude,
						lng: longitude,
					});

					const map = useMap();
					map.panTo(newLocation, { animate: true });
				},
				(error) => {
					console.error("Error getting location", error);
				}
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	return (
		<>
			<div
				style={{
					width: "80%",
					height: "80vh",
					borderRadius: "20px",
					overflow: "hidden",
				}}>
				<MapContainer
					center={center}
					zoom={13}
					minZoom={5}
					zoomControl={false}
					attributionControl={false}
					style={{ width: "100%", height: "100%" }}>
					<TileLayer url={getUrl()} />
					{selectedLocation && <SelectedLocation center={selectedLocation} />}
					{renderMarks()}
					{userLocation && (
						<Marker
							icon={
								new Icon({
									iconUrl: markerIconPng,
									iconSize: [25, 41],
									iconAnchor: [12, 41],
								})
							}
							position={userLocation}
						/>
					)}
					<ZoomControl position="topright" />
				</MapContainer>
			</div>
			<div style={{ display: "flex", marginTop: "10px", gap: "20px" }}>
				<button onClick={() => setMapType("roadmap")}>roadmap</button>
				<button onClick={() => setMapType("satellite")}>satellite</button>
				<button onClick={() => setMapType("hybrid")}>hybrid</button>
				<button onClick={() => setMapType("terrain")}>terrain</button>
				<button onClick={handleMarkLocation}>Tandai</button>
			</div>
		</>
	);
});
