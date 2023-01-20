import 'leaflet/dist/leaflet.css';
import React from 'react';
import DataProvider, { SearchIpContext } from './components/DataProvider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import myIcon from '../public/icon-location.svg';

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

	const icon = L.icon({
		iconUrl: myIcon,
		iconSize: [38, 38], // size of the icon
		iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
		popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
	});
	
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
		<div className="bg-img w-screen h-full mx-auto flex flex-wrap justify-center md:bg-cover">
			<h1 className="top-10 p-3 text-xl md:text-3xl text-white font-sans font-bold">IP Address Tracker</h1>
			<div className="flex justify-center top-40 w-screen font-normal">
				<form
					onSubmit={onDataRequest}
					className="flex"
				>
				<input
				placeholder="Search for your IP address ?"
				className=" w-11/12 h-11 mb-5 mt-5 px-5 rounded-l-xl font-sans text-sm 
							md:text-lg md:h-14 md:w-96"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				/>

				<button
					type="submit"
					className="bg-black h-11 md:h-14 px-4 ml-0 my-5 text-white font-mono font-bold text-lg md:text-2xl rounded-r-xl"
				>
					&gt;
				</button>
				</form>
			</div>

			<div className="top-36 py-5 m-10 flex justify-center h-30 z-50 w-6/12 absolute
							bg-white rounded-xl shadow-md overflow-hidden text-left"
			>
				<table >
					<thead className="text-sm border-gray-200 text-dark-gray uppercase tracking-wider">
						<tr>
							<th className="px-5 ">IP Address</th>
							<th className="px-5 border-l">Location</th>
							<th className="px-5 border-l">Timezone</th>
							<th className="px-5 border-l">ISP</th>
						</tr>
					</thead>
					<tbody>
						<tr className="text-2xl font-bold text-very-dark-gray">
							<td className="px-5 ">{data.ip && data.ip}</td>
							<td className="px-5 border-l">
								{data.location && data.location.region ? `${data.location.region}, ` : ''}
								{data.location && data.location.country}
								{data.location && data.location.postalCode}
							</td>
							<td className="px-5 border-l">{data.location && data.location.timezone ? `UTC${data.location.timezone}` : ''}</td>
							<td className="px-5 border-l ">
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
					zoom={12}
					scrollWheelZoom={true}
					ref={setMap}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={markerPosition} icon={icon}>
						<Popup>
							<span>
							{data.ip && data.ip}
							<br />
							{data.location && data.location.country}
							<br />
							{data.location && data.location.timezone}
							<br />
							{data.isp && data.isp}
							</span>
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
}

export default ApiTracker;

