import { Breadcrumb, Flex } from "antd";
import EmployeesTable from "@components/EmployeesTable";
import { employeesBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";

export default function Employees() {
  return (
    <>
      <Flex
        style={{ paddingBottom: "15px" }}
        justify="space-between"
        align="center"
      >
        <Breadcrumb items={employeesBreadcrumbs} />
      </Flex>
      <EmployeesTable />
    </>
  );
}
