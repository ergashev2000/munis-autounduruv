import { Flex } from "antd";

import BreadcrumbItem from "@components/ui/Breadcrumbs";
import { callsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import CallsTable from "@components/CallsTable";

export default function Calls() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "10px" }}
      >
        <BreadcrumbItem breadcrumbs={callsBreadcrumbs} />
      </Flex>
      <CallsTable />
    </>
  );
}
