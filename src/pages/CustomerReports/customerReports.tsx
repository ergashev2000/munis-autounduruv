import { employeesBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";

import { Breadcrumb, Button, Flex } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import UserReportsTable from "@components/CustomerReportsTable";

export default function CustomerReports() {
  return (
    <>
      <Flex
        style={{ paddingBottom: "20px" }}
        justify="space-between"
        align="center"
      >
        <Breadcrumb items={employeesBreadcrumbs} />
        <Button>
          <DownloadOutlined size={16} /> Export
        </Button>
      </Flex>
      <UserReportsTable />
    </>
  );
}
