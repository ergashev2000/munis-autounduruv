import React from "react";
import { Breadcrumb } from "antd";
import { Props } from "./types";

const BreadcrumbItem: React.FC<Props> = ({ breadcrumbs }) => {
  return <Breadcrumb items={breadcrumbs} />;
};

export default BreadcrumbItem;
