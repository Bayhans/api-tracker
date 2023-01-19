import 'leaflet/dist/leaflet.css';
import React from 'react';
import DataProvider, { SearchIpContext } from './components/DataProvider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';

function ApiTracker() {
	const [searchValue, setSearchValue] = React.useState('');

	const { data, searchIp } = React.useContext<any>(SearchIpContext);
	const ip = data?.ip;
	const location = data?.location;
	const timeZone = data?.timeZone;
	const isp = data?.isp;

	const [map, setMap] = React.useState<any>(null);
	const [mapCenter, setMapCenter] = React.useState<any>(
		data.location ? [data.location.lat, data.location.lng] : [47.64343, -122.14318]
	);
	const [markerPosition, setMarkerPosition] = React.useState<any>(
		data.location ? [data.location.lat, data.location.lng] : [47.64343, -122.14318]
	);

	const onDataRequest = (e: any) => {
		e.preventDefault();
		searchIp(searchValue);
		setSearchValue('');
	};

	React.useEffect(() => {
		if (data?.location) {
			if (map != null) {
				map.setView([data.location.lat, data.location.lng], 15);
			}
		}
	}, [map, data.location]);

	React.useEffect(() => {
		if (data.location) {
			setMarkerPosition([data.location.lat, data.location.lng]);
			setMapCenter([data.location.lat, data.location.lng]);
		}
	}, [data]);

	return (
		<div className="bg-img w-screen h-full flex flex-wrap justify-center text-3xl mx-auto">
			<h1 className="top-10 p-3 text-5xl text-white font-sans">IP Address Tracker</h1>
			<div className="flex justify-center top-40 w-screen">
				<form
					onSubmit={onDataRequest}
					className="flex"
				>
					<input
					placeholder="Search for your IP address ?"
					className="bg-gray-200 w-full p-6 my-5 rounded-l-xl font-sans text-light text-center"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>

					<button
						type="submit"
						className="bg-black text-white font-mono p-7 rounded-r-xl ml-0 my-5"
					>
						&gt;
					</button>
				</form>
			</div>

			<div
				className="top-48 p-5 m-10 flex justify-center h-30 z-50 w-auto absolute
							bg-white rounded-xl shadow-md overflow-hidden"
			>
				<table className="w-20 text-center">
					<thead className=" px-6 text-sm border-gray-200 text-dark-gray uppercase tracking-wider">
						<tr>
							<th className="uppercase">IP Address</th>
							<th className="border-l">Location</th>
							<th className="border-l">Timezone</th>
							<th className="border-l">ISP</th>
						</tr>
					</thead>
					<tbody className=" text-very-dark-gray">
						<tr className="border-gray-200">
							<td className="px-6 py-4">{data.ip && data.ip}</td>
							<td className="px-6 py-4 border-l">
								{data.location && data.location.region}
								{data.location && data.location.country}
							</td>
							<td className="px-6 py-4 border-l">{data.location && data.location.timezone}</td>
							<td className="px-6 py-4 border-l ">
								{data.as && data.as.name}
								{data.isp && data.isp}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="relative z-0 pt-20 ">
				<MapContainer
					className="w-screen min-h-screen flex-1"
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
		</div>
	);
}

export default ApiTracker;

