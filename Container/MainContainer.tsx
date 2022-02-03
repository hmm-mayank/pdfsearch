import { Button, Card, Col, Input, Row, Tag } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useFetchNewsDetailQuery,
  useFetchNewsQuery,
} from "../Features/news-slice";
const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const { Search } = Input;
const MainContainer = () => {
  const [newsLang, setNewsLang] = useState("en");
  const [showModal, setShowModal] = useState(false);
  const [newsUrl, setNewsUrl] = useState("");
  const { data, isFetching } = useFetchNewsQuery(newsLang);
  let newsInDetails = useFetchNewsDetailQuery(newsUrl);
  const [newsDetail, setNewsDetail] = useState(newsInDetails.data);
  const onSearch = (value) => {
    if (value) {
      setNewsUrl(value);
      setShowModal(true);
    }
  };
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    try {
      let value = window.localStorage.getItem("pref");
      setNewsLang(value);
    } catch (error) {
      setNewsLang("en");
    }
  };
  const savePref = (value) => {
    window.localStorage.setItem("pref", value);
    setNewsLang(value);
  };
  return (
    <>
      {showModal && (
        <Modal
          visible={showModal}
          onOk={() => setShowModal(false)}
          bodyStyle={{ height: 700, width: 700 }}
        >
          <div>
            {newsInDetails.isFetching == true
              ? "Loading"
              : newsInDetails.data.text}
          </div>
        </Modal>
      )}

      <Header
        style={{
          backgroundColor: "white",
          position: "fixed",
          width: "100%",
          height: 50,
          zIndex: 1,
          boxShadow: "0 3px 5px rgba(57, 63, 72, 0.3)",
        }}
      >
        <Row>
          <Col>NEWS</Col>
          <Col>
            <Button
              type="primary"
              onClick={() => savePref(newsLang == "en" ? "hi" : "en")}
            >
              {newsLang == "en" ? "Hindi News" : "English News"}
            </Button>
          </Col>
        </Row>
      </Header>
      <Layout className="main-div">
        <Row justify="center" style={{ alignContent: "center", marginTop: 60 }}>
          {isFetching ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <div style={{ width: "100%", height: "100rem" }}>
              <Image
                src={"/loading.gif"}
                width={150}
                height={150}
                alt="loader"
              />
            </div>
          ) : (
            data.flatMap((ele) => {
              return ele.items.flatMap((news) => {
                return (
                  <Col
                    style={{ textAlign: "center", margin: 5 }}
                    sm={24}
                    xs={24}
                    xl={6}
                    xxl={4}
                    md={8}
                  >
                    <Card
                      hoverable
                      style={{
                        marginBottom: 10,
                      }}
                    >
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
                      <p className="limit-text">{news.contentSnippet}</p>
                      {
                        <a
                          href={`/newsDetail?query=${
                            news.guid || news.link
                          }&newspaper=${news.title}`}
                        >
                          Link
                        </a>
                      }
                    </Card>
                  </Col>
                );
              });
            })
          )}
        </Row>
      </Layout>
    </>
  );
};

export default MainContainer;
