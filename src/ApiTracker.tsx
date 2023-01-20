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
		<div
			className="bg-img bg-size-100 w-screen h-full mx-auto 
							flex flex-wrap justify-center"
		>
			<h1 className="top-10 p-3 text-3xl text-white font-sans font-semibold">IP Address Tracker</h1>
			<div className="flex justify-center top-38 w-screen font-normal">
				<form
					onSubmit={onDataRequest}
					className="flex"
				>
					<input
						placeholder="Search for your IP address ?"
						className=" w-64 md:w-96 h-14 mt-5 px-6 rounded-l-xl font-sans 
							text-sm md:text-lg"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>

					<button
						type="submit"
						className="bg-black h-14 w-14 px-3 ml-0 my-5 text-white 
								font-mono font-bold text-lg md:text-2xl rounded-r-xl"
					>		
						&gt;        {/*   this here is much betteer than the image i think  */}
					</button>
				</form>
			</div>

			<div className="top-36 p-5 m-5 flex flex-col md:flex-row justify-center h-1/2 md:h-32 z-50 w-80 md:w-8/12
							bg-white rounded-xl shadow-md overflow-hidden text-left absolute">
				<div className="flex flex-row row-span-1 flex-wrap justify-center w-full md:flex-col ">
					<div className="text-sm text-dark-gray uppercase tracking-wider px-5 ">
						IP Address
					</div>
					<div className="text-2xl font-bold text-very-dark-gray px-5 py-3">
						{data.ip && data.ip}
					</div>
				</div>
				<div className="flex flex-row row-span-2 flex-wrap justify-center w-full border-t md:flex-col 
								md:border-t-0 md:border-l border-gray-200 ">
					<div className="text-sm text-dark-gray uppercase tracking-wider px-5">
						Location
					</div>
					<div className="text-2xl flex justify-center md:justify-start font-bold w-full text-very-dark-gray px-5 py-3">
						{data.location && data.location.region ? `${data.location.region}, ` : ''}
						{data.location && data.location.country}
						{data.location && data.location.postalCode}
					</div>
				</div>
				<div className="flex flex-row row-span-3 flex-wrap justify-center w-full md:flex-col 
								border-t md:border-t-0 md:border-l border-gray-200 ">
					<div className="text-sm text-dark-gray uppercase tracking-wider px-5">
						Timezone
					</div>
					<div className="text-2xl flex justify-center md:justify-start font-bold w-full text-very-dark-gray px-5 py-3">
						{data.location && data.location.timezone ? `UTC${data.location.timezone}` : ''}
					</div>
				</div>
				<div className="flex flex-row row-span-4 flex-wrap justify-center w-full md:flex-col 
								border-t md:border-t-0 md:border-l border-gray-200 ">
					<div className="text-sm text-dark-gray uppercase tracking-wider px-5">
						ISP
					</div>
					<div className="text-2xl flex justify-center md:justify-start font-bold w-full text-very-dark-gray px-5 py-3">
						{data.isp && data.isp}
					</div>
				</div>
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
					<Marker
						position={markerPosition}
						icon={icon}
					>
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

