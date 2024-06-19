import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="/">
        <Button type="primary" style={{width: '100%'}}>Barchasi</Button>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="/">
        Farg'ona
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="/">
        Toshkent
      </Link>
    ),
  },
];

const Index: React.FC = () => (
  <Dropdown menu={{ items }} placement="bottomRight">
    <Button size="large">
      <DownloadOutlined /> Export
    </Button>
  </Dropdown>
);

export default Index;
