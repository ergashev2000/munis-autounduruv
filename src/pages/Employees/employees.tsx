import { Breadcrumb, Flex, Space } from "antd";
import { EmployeesTable } from "@components/EmployeesTable";
import { employeesBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import EmployeesModal from "@components/EmployeesModal/employeesModal";
import ExportDropdown from "@components/ui/ExportDropdown";

export default function Employees() {
  return (
    <div>
      <Flex
        style={{ paddingBottom: "20px" }}
        justify="space-between"
        align="center"
      >
        <Breadcrumb items={employeesBreadcrumbs} />
        <Space>
          <ExportDropdown />
          <EmployeesModal />
        </Space>
      </Flex>
      <EmployeesTable />
    </div>
  );
}
