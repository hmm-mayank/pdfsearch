import { Button, Col, Input, Row, Form, Table, Select } from "antd";

import React, { useState } from "react";
import {
  useFetchLookupListQuery,
  useFetchLookupQuery,
} from "../Features/lookup-slice";

let { Option } = Select;
const columns = [
  {
    title: "Country Code",
    dataIndex: "countryCode",
    key: "countryCode",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "National Format",
    dataIndex: "nationalFormat",
    key: "nationalFormat",
  },
  {
    title: "Carrier",
    render: (e) => e?.carrier?.name,
  },
  {
    title: "Carrier Type",
    render: (e) => e?.carrier?.type,
  },
  {
    title: "Country Code",
    render: (e) => e?.carrier?.mobile_country_code,
  },
  {
    title: "Network code",
    render: (e) => e?.carrier?.mobile_network_code,
  },
];

const ValidatePhone = () => {
  const [phone, setPhone] = useState(null);
  let { data, isFetching } = useFetchLookupQuery(phone);
  let da = useFetchLookupListQuery();
  const submitPhone = (val) => {
    setPhone(val.phone);
    if (!isFetching) {
      console.log(data);
    }
  };
  return (
    <div className="box">
      <div>
        <h1>Number Look up</h1>
        <Form onFinish={submitPhone}>
          <Row>
            <Col style={{ marginRight: 14 }}>
              <Form.Item name={"countryCode"}>
                <Select defaultValue={"US"}>
                  <Option value="IN">India</Option>
                  <Option value="US">USA</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"phone"}
                rules={[
                  { required: true, message: "Phone Number can't be blank" },
                  { len: 10, message: "Phone Number should be 10 digit" },
                ]}
              >
                <Input placeholder="Enter Phone Number" type={"tel"} />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 10 }}>
              <Form.Item>
                <Button htmlType="submit">Look Up</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {da.isFetching === false && (
          <Table dataSource={da.data} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default ValidatePhone;
