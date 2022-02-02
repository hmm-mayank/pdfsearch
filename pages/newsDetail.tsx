import React from "react";
import { useRouter } from "next/router";
import { useFetchNewsDetailQuery } from "../Features/news-slice";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import { Button, Image } from "antd";
import Link from "next/link";

interface IProps {
  url: string;
}
const NewsDetail = () => {
  let router = useRouter();
  console.log(router.query);
  //@ts-ignore
  let { data, isFetching } = useFetchNewsDetailQuery(router.query.query);
  return (
    <div>
      <Image
        src={isFetching == true ? "/loading.gif" : data?.topImage}
        width={"100%"}
        height={400}
        alt="demo"
      />
      <h2>{data?.title}</h2>

      <p style={{ fontSize: "20px" }}>
        {data?.text ? data?.text : data?.description}
      </p>

      <Button
        onClick={() => router.back()}
        type="primary"
        style={{
          position: "fixed",
          zIndex: 1,
          bottom: 10,
          fontSize: 30,
          textTransform: "uppercase",
          left: "10%",
          padding: 10,
          height: 70,
          opacity: 0.7,
          boxShadow: "0 7px 19px rgba(57, 63, 72, 0.3)",
        }}
      >
        Back to Home{" "}
      </Button>
    </div>
  );
};

export default NewsDetail;
