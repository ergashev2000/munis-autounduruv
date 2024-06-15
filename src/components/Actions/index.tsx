import { Checkbox, Flex } from "antd";
import type { CheckboxProps } from "antd";

export default function Index() {
  const onChange: CheckboxProps["onChange"] = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Flex gap={30}>
      <Checkbox onChange={onChange}>Karta bog'lash</Checkbox>
      <Checkbox onChange={onChange}>Sozlamalar</Checkbox>
      <Checkbox onChange={onChange}>Admin Hisobotlar</Checkbox>
      <Checkbox onChange={onChange}>Hisobotlar</Checkbox>
      <Checkbox onChange={onChange}>Filiallar</Checkbox>
    </Flex>
  );
}
