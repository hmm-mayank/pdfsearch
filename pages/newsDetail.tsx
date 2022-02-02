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

      <Link href={"/"} passHref={true}>
        <Button> HOME </Button>
      </Link>
    </div>
  );
};

export default NewsDetail;
