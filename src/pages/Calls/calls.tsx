import BreadcrumbItem from "@components/ui/Breadcrumbs";
import { callsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import CallsTable from "@components/CallsTable";
import { CallsModal } from "@components/CallsModal";

import { Button, Flex, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default function Calls() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "10px" }}
      >
        <BreadcrumbItem breadcrumbs={callsBreadcrumbs} />
        <Flex align="center" gap={60}>
          <Space size={"large"}>
            <Button size="large">
              <DownloadOutlined /> Export
            </Button>
            <CallsModal />
          </Space>
        </Flex>
      </Flex>
      <CallsTable />
    </>
  );
}
