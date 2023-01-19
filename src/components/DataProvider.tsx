import React from 'react';

export const SearchIpContext = React.createContext({});

const DataProvider = (props: any) => {
  const [data, setData] = React.useState({});

  const searchIp = (ip: string) => {
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
    <SearchIpContext.Provider value={{ searchIp, data }}>
      {props.children}
    </SearchIpContext.Provider>
  );
};

export default DataProvider;
