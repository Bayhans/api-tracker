import React from 'react';
import DataProvider, { SearchIpContext } from './components/DataProvider';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function ApiTracker() {
	// State to store the user's search input
	const [searchValue, setSearchValue] = React.useState('');

	// Use the SearchIpContext to access the data and searchIp function from the DataProvider
	const { data, searchIp } = React.useContext(SearchIpContext);
	const { ip, location, timeZone, isp } = data;

	// Function to handle form submissions and call the searchIp function
	const onDataRequest = (e: any) => {
		e.preventDefault();
		searchIp(searchValue);
		setSearchValue(''); // reset the input field
	};

	return (
		<div className="w-screen h-screen flex flex-wrap justify-center p-36 text-3xl">
			<h1 className="fixed top-10">IP Address Tracker</h1>
			<form onSubmit={onDataRequest}>
				<input
					placeholder="Search for any IP address or domain"
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
			<div className="w-screen min-h-full">
				<MapContainer
					center={data.location ? [data.location.lat, data.location.lng] : [37.40599, -122.078514]}
					zoom={13}
					scrollWheelZoom={false}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					{data.location && data.location.lat && data.location.lng && (
						<Marker position={[data.location.lat, data.location.lng]}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					)}
				</MapContainer>
			</div>
		</div>
	);
}

export default ApiTracker;

// center={data.location ? [data.location.lat, data.location.lng] : [47.64343, -122.14318]}

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// import { MapContainer } from 'react-leaflet';
// import { TileLayer } from 'react-leaflet';
// import { Marker } from 'react-leaflet';
// import { Popup } from 'react-leaflet';

// center={[data.location.lat, data.location.lng]} for the MapContainer
// position={[data.location.lat, data.location.lng]} for the Marker

