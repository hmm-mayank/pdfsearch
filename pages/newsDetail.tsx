import React from "react";
import { useRouter } from "next/router";
import { useFetchNewsDetailQuery } from "../Features/news-slice";
import { Button, Divider, Image, Tag } from "antd";
import Layout from "antd/lib/layout/layout";

interface IProps {
  url: string;
}
const textToRemove = [
  "Our code of editorial values",
  "Our NetworkSubscribe for Newsletter",
  "Follow UsSection:",
];
const NewsDetail = () => {
  let router = useRouter();
  console.log(router.query);
  //@ts-ignore
  let { query, newspaper } = router.query;
  //@ts-ignore
  let { data, isFetching } = useFetchNewsDetailQuery(query);
  return (
    <Layout style={{ width: "100%" }}>
      <Image
        src={isFetching == true ? "/loading.gif" : data?.topImage}
        width={"100%"}
        height={400}
        alt="demo"
      />
      {data?.author && (
        <Tag color={"magenta"} style={{ textAlign: "center", fontSize: 15 }}>
          {data?.author}
        </Tag>
      )}
      <h2 style={{ textAlign: "center" }}>{data?.title}</h2>
      <Divider />
      <p>{filterValue(data?.text ? data?.text : data?.description)}</p>

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
    </Layout>
  );
};

export default NewsDetail;

let filterValue = (text) => {
  let str = null;
  textToRemove.forEach((e) => {
    str = text?.split(e)[0];
  });
  return str;
};
