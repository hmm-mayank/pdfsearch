import { AutoComplete, Card, Col, Input, Row, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import debounce from "lodash/debounce";
import moment from "moment";
import react, { useEffect, useState } from "react";
import { useFetchCityRecordsQuery } from "../Features/AirQuality-api-slice";
import { useFetchNewsQuery } from "../Features/news-slice";
const gridStyle = {
  width: "25%",
  textAlign: "center",
};
const { Search } = Input;
const MainContainer = () => {
  const [city, setCity] = useState("Delhi");
  const { data, isFetching } = useFetchNewsQuery();

  const onSearch = (value) => {
    console.log(value);
    setCity(value);
  };
  return (
    <>
      <Row>
        {isFetching
          ? "Loading"
          : data.flatMap((ele) => {
              return ele.items.flatMap((news) => {
                return (
                  <Col sm={24} xs={24} xl={6} xxl={4} md={8}>
                    <Card hoverable style={{ width: 300, marginBottom: 10 }}>
                      <h3>{news.title}</h3>
                      <Row>
                        <Col>
                          {" "}
                          <Tag color="geekblue" style={{ fontSize: 10 }}>
                            <b>
                              {moment(news.isoDate).format("DD MMM - hh:mm A")}
                            </b>
                          </Tag>
                        </Col>
                        {news.author?.split(" ")[0] && (
                          <Col>
                            <Tag color="red" style={{ fontSize: 10 }}>
                              {news.author?.split(" ")[0]}
                            </Tag>
                          </Col>
                        )}
                      </Row>

                      <br />
                      <p>{news.contentSnippet}</p>
                    </Card>
                  </Col>
                );
              });
            })}
      </Row>
    </>
  );
};

export default MainContainer;
