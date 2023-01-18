import React, { useEffect } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';


export const SearchIpContext = React.createContext({});

const DataProvider = (props) => {
    const [data, setData] = React.useState({});

    // Fetch the user's current location data on component mount
    useEffect(() => {
        fetch("https://geo.ipify.org/api/v2/location?apiKey=at_LPC3vMggYIHq4V63POUnF9ZmcOt3q")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    // Function to handle form submissions and search for a specific IP address
    const searchIp = (ip) => {
        fetch(
            `https://geo.ipify.org/api/v2/location?apiKey=at_LPC3vMggYIHq4V63POUnF9ZmcOt3q&ipAddress=` + `${ip}`
        )
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <SearchIpContext.Provider value={{ data, searchIp }}>
            {props.children}
            <Map center={[data.location.latitude, data.location.longitude]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[data.location.latitude, data.location.longitude]} />
            </Map>
        </SearchIpContext.Provider>
    );
};

export default DataProvider;




// import React, { useEffect } from 'react';

// export const SearchIpContext = React.createContext({});

// const DataProvider = (props) => {
// 	const [data, setData] = React.useState({});

// 	// Use the HTML5 geolocation API to get the user's current IP address
// 	useEffect(() => {
// 		if ('geolocation' in navigator) {
// 			navigator.geolocation.getCurrentPosition((position) => {
// 				fetch(
//                     "https://geo.ipify.org/api/v2/country?apiKey=at_LPC3vMggYIHq4V63POUnF9ZmcOt3q"				
//                     )
// 					.then((response) => response.json())
// 					.then((data) => {
// 						setData(data);
// 					})
// 					.catch((error) => console.log(error));
// 			});
// 		}
        
// 	}, []);

// 	const searchIp = (ip) => {
//         fetch(
//           `https://geo.ipify.org/api/v2/country,city?apiKey=at_LPC3vMggYIHq4V63POUnF9ZmcOt3q&ipAddress=` + `${ip}` 
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             setData(data);
//           })
//           .catch((error) => console.log(error));
//       };
      

// 	return (
// 		<SearchIpContext.Provider value={{ searchIp, data }}>{props.children}</SearchIpContext.Provider>
// 	);
// };

// export default DataProvider;