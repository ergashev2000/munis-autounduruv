import { Breadcrumb, Flex } from "antd";
import { branchsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import BranchsTable from "@components/BranchsTable";

export default function Branches() {
  return (
    <>
      <Flex
        style={{ paddingBottom: "20px" }}
        justify="space-between"
        align="center"
      >
        <Breadcrumb items={branchsBreadcrumbs} />
      </Flex>
      <BranchsTable />
    </>
  );
}
