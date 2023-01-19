import 'leaflet/dist/leaflet.css';
import React from 'react';
import DataProvider, { SearchIpContext } from './components/DataProvider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function ApiTracker() {
	const [searchValue, setSearchValue] = React.useState('');

	const { data, searchIp } = React.useContext(SearchIpContext);
	const { ip, location, timeZone, isp } = data;
	const [map, setMap] = React.useState(null);
	const [mapCenter, setMapCenter] = React.useState(
		data.location ? [data.location.lat, data.location.lng] : [47.64343, -122.14318]
	);
	const [markerPosition, setMarkerPosition] = React.useState(
		data.location ? [data.location.lat, data.location.lng] : [47.64343, -122.14318]
	);

	const onDataRequest = (e: any) => {
		e.preventDefault();
		searchIp(searchValue);
		setSearchValue('');
	};
	
	React.useEffect(() => {
		if(map && data.location) {
		  map.setView([data.location.lat, data.location.lng], 15);
		}
	  }, [map, data.location]);

	React.useEffect(() => {
		if (data.location) {
			setMarkerPosition([data.location.lat, data.location.lng]);
			setMapCenter([data.location.lat, data.location.lng]);
		}
	}, [data]);

	return (
		<div className="w-screen h-screen flex flex-wrap justify-center p-1 text-3xl">
			<h1 className="fixed top-10 text-6xl">IP Address Tracker</h1>
			<form onSubmit={onDataRequest}>
				<input
					placeholder="Search for your IP address ?"
					className="bg-gray-200 p-3 rounded-full"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-indigo-500 text-white p-3 rounded-full"
				>
					Search
				</button>
			</form>
			<div className="w-screen">
				<p>IP ADRESS: {data.ip && data.ip}</p>
				<p>Region: {data.location && data.location.region}</p>
				<p>LOCATION : {data.location && data.location.country}</p>
				<p>TIMEZONE: {data.location && data.location.timezone}</p>
				<p>lat: {data.location && data.location.lat}</p>
				<p>lng: {data.location && data.location.lng}</p>
				<p>ISP: {data.isp && data.isp}</p>
				<p>AS Name: {data.as && data.as.name}</p>
				<p>AS Domain: {data.as && data.as.domain}</p>
			</div>
			<MapContainer
				className="w-screen h-32 flex-1"
				center={mapCenter}
				zoom={15}
				scrollWheelZoom={false}
				ref={setMap}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={markerPosition}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default ApiTracker;

