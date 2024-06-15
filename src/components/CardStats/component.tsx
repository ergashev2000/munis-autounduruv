import PieChat from "@components/Charts/PieChart";
import { Card, Flex } from "antd";

const data = [
  {
    id: 1,
    title: "Barcha shartnomalar",
    value: "2 000",
    color: "#000",
  },
  {
    id: 2,
    title: "Joriy qarzdorlik",
    value: "14 023 000",
    color: "#3f13ee",
  },
  {
    id: 3,
    title: "Ushlangan summa",
    value: "10 023 000",
    color: "#f4110d",
  },
  {
    id: 4,
    title: "Qoldiq",
    value: "104 023 000",
    color: "#1e9a0c",
  },
];

export default function Component() {
  return (
    <Card title="Shartnomalar" style={{ maxWidth: 600, width: "100%" }}>
      <Flex justify="space-between" align="start" gap={20}>
        <div style={{ width: "100%" }}>
          {data.map(item => (
            <Flex
              justify="space-between"
              align="center"
              className="dashboard_card-item"
              key={item.id}
            >
              <h3 style={{ whiteSpace: "nowrap" }}>{item.title}</h3>
              <hr/>
              <p style={{ color: `${item.color}`, whiteSpace: "nowrap" }}>
                {item.value}
              </p>
            </Flex>
          ))}
        </div>

        <div style={{ width: "250px" }}>
          <PieChat />
        </div>
      </Flex>
    </Card>
  );
}
