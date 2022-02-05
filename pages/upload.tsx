import React, { useEffect, useState } from "react";

import axios from "axios";
import { UiFileInputButton } from "../Container/UiFileInputButton";
import { Button, Col, Row, Table } from "antd";
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

const fileBasePath = "http://142.132.183.253/uploads/csv/";
const UploadFile = () => {
  const [downloadFile, setDownloadFile] = useState(null);
  const init = async () => {
    const response = await axios.get("/api/upload");
    console.log(response.data.data);
    setDownloadFile(response.data.data);
  };
  useEffect(() => {
    init();
  }, []);
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
      <h1>Phone Data</h1>
      <UiFileInputButton
        label="Upload Single File"
        uploadFileName="theFiles"
        onChange={onChange}
      />

      {da.isFetching === false && (
        <Table dataSource={da.data} columns={columns} />
      )}
      <h2>Download Files</h2>
      {downloadFile?.length > 0 &&
        downloadFile.map((ele, id) => {
          return (
            <Col key={id}>
              <Button type="primary">
                <a href={`${fileBasePath}${ele}`}>Download ${ele} </a>
              </Button>
            </Col>
          );
        })}
    </>
  );
};

export default UploadFile;
