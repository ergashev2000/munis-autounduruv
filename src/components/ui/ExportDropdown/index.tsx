import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="/">
        Barchasi
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
    <Button type="primary">
      <FileTextOutlined /> Excel export
    </Button>
  </Dropdown>
);

export default Index;
