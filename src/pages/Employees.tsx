import { Breadcrumb, Flex, Space } from "antd";
import EmployeesTable from "@components/EmployeesTable";
import { employeesBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import ExportDropdown from "@components/ui/ExportDropdown";

export default function Employees() {
  return (
    <>
      <Flex
        style={{ paddingBottom: "20px" }}
        justify="space-between"
        align="center"
      >
        <Breadcrumb items={employeesBreadcrumbs} />
        <Space>
          <ExportDropdown />
        </Space>
      </Flex>
      <EmployeesTable />
    </>
  );
}
