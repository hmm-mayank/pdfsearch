import { AutoComplete, Card, Col, Input, Row } from "antd";
import debounce from "lodash/debounce";
import react, { useEffect, useState } from "react";
import { useFetchCityRecordsQuery } from "../Features/AirQuality-api-slice";
const gridStyle = {
  width: "25%",
  textAlign: "center",
};
const { Search } = Input;
const MainContainer = () => {
  const [city, setCity] = useState("Delhi");
  const { data, isFetching } = useFetchCityRecordsQuery(city);

  const onSearch = (value) => {
    console.log(value);
    setCity(value);
  };
  return (
    <>
      <AutoComplete
        placeholder="Search your City..."
        style={{
          width: 500,
          fontSize: 20,
          padding: 40,
          justifyContent: "center",
        }}
        onSearch={debounce(onSearch, 500)}
      />
      <Card title="Pollution Information">
        {isFetching
          ? "Loading"
          : data.records.flatMap((ele) => {
              return (
                <Card.Grid title={ele.pollutant_max}>
                  <div>
                    <label>Area Name : {ele.station}</label>
                    <br />
                    <label>Pollution ID : {ele.pollutant_id}</label>
                    <br />
                    <label>Pollution Max : {ele.pollutant_max}</label>
                    <br />
                    <label>Pollution Min : {ele.pollutant_min}</label>
                    <br />
                    <label>Pollution Avg : {ele.pollutant_avg}</label>
                    <br />
                    <label>Last Updated : {ele.last_update}</label>
                  </div>
                </Card.Grid>
              );
            })}
      </Card>
    </>
  );
};

export default MainContainer;
