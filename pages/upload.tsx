import React from "react";

import axios from "axios";
import { UiFileInputButton } from "../Container/UiFileInputButton";
import { Table } from "antd";
import { useFetchLookupListQuery } from "../Features/lookup-slice";

const columns = [
  {
    title: "lrn",
    dataIndex: "lrn",
    key: "lrn",
  },
  {
    title: "rate center",
    dataIndex: "ratecenter",
    key: "ratecenter",
  },
  {
    title: "network",
    dataIndex: "network",
    key: "network",
  },
  {
    title: "country",
    key: "country",
    dataIndex: "country",
  },
  {
    title: "delay",
    key: "delay",
    dataIndex: "delay",
  },
];
const UploadFile = () => {
  let da = useFetchLookupListQuery("allPhones.csv");
  const onChange = async (formData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/upload", formData, config);

    console.log("response", response.data);
  };

  return (
    <>
      <UiFileInputButton
        label="Upload Single File"
        uploadFileName="theFiles"
        onChange={onChange}
      />

      {da.isFetching === false && (
        <Table dataSource={da.data} columns={columns} />
      )}
    </>
  );
};

export default UploadFile;
