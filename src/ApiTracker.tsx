import React, { useContext } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import DataProvider, { SearchIpContext } from './components/DataProvider';

function ApiTracker() {
	// State to store the user's search input
	const [searchValue, setSearchValue] = React.useState('');

	// Use the SearchIpContext to access the data and searchIp function from the DataProvider
	const { data, searchIp } = useContext(SearchIpContext);
	const { location } = data;

	// Function to handle form submissions and call the searchIp function
	const onDataRequest = (e: any) => {
		e.preventDefault();
		searchIp(searchValue);
	};

	return (
		<div className="w-screen h-screen flex flex-wrap justify-center p-36 text-3xl">
			<h1 className="fixed top-10">IP Address Tracker</h1>
			<form onSubmit={onDataRequest}>
				<input
					placeholder="Search for any IP address or domain"
					className="cursor-pointer m-3 p-3 rounded-full"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button
					type="submit"
					className="cursor-pointer m-3 p-3 rounded-full"
				>
					Search
				</button>
			</form>
			<div className="w-screen">
				<p>IP ADRESS: {data.ip && data.ip}</p>
				<p>Region: {data.location && data.location.region}</p>
				<p>LOCATION : {data.location && data.location.country}</p>
				<p>TIMEZONE: {data.location && data.location.timezone}</p>
				<p>ISP: {data.isp && data.isp}</p>
				<p>AS Name: {data.as && data.as.name}</p>
				<p>AS Domain: {data.as && data.as.domain}</p>
			</div>
			{location && (
				<div className="w-screen">
					<Map
						center={[location.latitude, location.longitude]}
						zoom={13}
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
						<Marker position={[location.latitude, location.longitude]} />
					</Map>
				</div>
			)}
		</div>
	);
}

export default ApiTracker;

// import React { useContext } from 'react';
// import DataProvider, { SearchIpContext } from './components/DataProvider';

// function ApiTracker() {
// 	// State to store the user's search input
// 	const [searchValue, setSearchValue] = React.useState('');

// 	// Use the SearchIpContext to access the data and searchIp function from the DataProvider
// 	const { data, searchIp } = React.useContext(SearchIpContext);
// 	const { ip, location, timeZone, isp } = data;

// 	// Function to handle form submissions and call the searchIp function
// 	const onDataRequest = (e: any) => {
// 		e.preventDefault();
// 		searchIp(searchValue);
// 		setSearchValue(''); // reset the input field
// 	};

// 	return (
// 		<div className="w-screen h-screen flex flex-wrap justify-center p-36 text-3xl">
// 			<h1 className="fixed top-10">IP Address Tracker</h1>
// 			<form onSubmit={onDataRequest}>
// 				<input
// 					placeholder="Search for any IP address or domain"
// 					className="bg-gray-200 p-3 rounded-full"
// 					value={searchValue}
// 					onChange={(e) => setSearchValue(e.target.value)}
// 				/>
// 				<button
// 					type="submit"
// 					className="bg-indigo-500 text-white p-3 rounded-full"
// 				>
// 					Search
// 				</button>
// 			</form>
// 			<div className="w-screen">
// 				<p>IP ADRESS: {data.ip && data.ip}</p>
// 				<p>Region: {data.location && data.location.region}</p>
// 				<p>LOCATION : {data.location && data.location.country}</p>
// 				<p>TIMEZONE: {data.location && data.location.timezone}</p>
// 				<p>ISP: {data.isp && data.isp}</p>
// 				<p>AS Name: {data.as && data.as.name}</p>
// 				<p>AS Domain: {data.as && data.as.domain}</p>
// 			</div>
// 		</div>
// 	);
// }

// export default ApiTracker;

// ,
