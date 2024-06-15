import { Breadcrumb, Flex } from "antd";
import { EmployeesTable } from "@components/EmployeesTable";
import { employeesBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import EmployeesModal from "@components/EmployeesModal/employeesModal";

export default function Employees() {
  return (
    <div>
      <Flex
        style={{ paddingBottom: "20px" }}
        justify="space-between"
        align="center"
      >
        <Breadcrumb items={employeesBreadcrumbs} />
        <EmployeesModal />
      </Flex>
      <EmployeesTable />
    </div>
  );
}
