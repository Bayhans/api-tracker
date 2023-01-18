import React from 'react';

export const SearchIpContext = React.createContext({});

const DataProvider = (props) => {
	const [data, setData] = React.useState({});

	// Use the HTML5 geolocation API to get the user's current IP address
	React.useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				fetch('https://geo.ipify.org/api/v2/country?apiKey=at_LPC3vMggYIHq4V63POUnF9ZmcOt3q')
					.then((response) => response.json())
					.then((data) => {
						setData(data);
					})
					.catch((error) => console.log(error));
			});
		}
	}, []);

	const searchIp = (ip) => {
		fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_LPC3vMggYIHq4V63POUnF9ZmcOt3q&ipAddress=` +
				`${ip}`
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<SearchIpContext.Provider value={{ searchIp, data }}>{props.children}</SearchIpContext.Provider>
	);
};

export default DataProvider;
