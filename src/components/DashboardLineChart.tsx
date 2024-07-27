import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Col, Flex, Space, Typography } from "antd";
import moment from "moment";

// const { RangePicker } = DatePicker;

interface DataEntry {
  name: string;
  current_debt: number;
  amount_withheld: number;
  residue: number;
}

const DashboardLineChart: React.FC = () => {
  // const [data, setData] = useState<DataEntry[]>([]);
  // const [filteredData, setFilteredData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  // const [dateRange, setDateRange] = useState<[Moment | null, Moment | null]>([
  //   null,
  //   null,
  // ]);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   filterData();
  // }, [data, period]);

  const fetchData = async () => {
    try {
      const sampleData: DataEntry[] = [];

      const startDate = moment().startOf("month");
      const daysInMonth = startDate.daysInMonth();
      for (let i = 0; i < daysInMonth; i++) {
        const date = startDate.clone().add(i, "days").format("YYYY-MM-DD");
        sampleData.push({
          name: date,
          current_debt: 1000 + Math.floor(Math.random() * 1000),
          amount_withheld: 200 + Math.floor(Math.random() * 200),
          residue: 800 + Math.floor(Math.random() * 300),
        });
      }

      const startOfWeek = moment().startOf("week");
      for (let i = 0; i < 7; i++) {
        const date = startOfWeek.clone().add(i, "days").format("YYYY-MM-DD");
        sampleData.push({
          name: date,
          current_debt: 1000 + Math.floor(Math.random() * 1000),
          amount_withheld: 200 + Math.floor(Math.random() * 200),
          residue: 800 + Math.floor(Math.random() * 300),
        });
      }

      const startOfMonth = moment().startOf("month");
      for (let i = 0; i < 30; i++) {
        const date = startOfMonth.clone().add(i, "days").format("YYYY-MM-DD");
        sampleData.push({
          name: date,
          current_debt: 1000 + Math.floor(Math.random() * 1000),
          amount_withheld: Math.floor(Math.random() * 500),
          residue: 800 + Math.floor(Math.random() * 300),
        });
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      // setData(sampleData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // const filterData = () => {
  //   let filtered = data;

  //   if (dateRange[0] && dateRange[1]) {
  //     const [start, end] = dateRange.map(date => date?.format("YYYY-MM-DD"));

  //     if (period === "monthly") {
  //       const adjustedStart = moment(start).startOf("month");
  //       filtered = data.filter(entry =>
  //         moment(entry.name).isBetween(adjustedStart, end, undefined, "[]")
  //       );
  //     } else {
  //       filtered = data.filter(entry =>
  //         moment(entry.name).isBetween(start, end, undefined, "[]")
  //       );
  //     }
  //   } else {
  //     if (period === "weekly") {
  //       const end = moment().endOf("day");
  //       const start = moment().subtract(6, "days").startOf("day");
  //       filtered = data.filter(entry =>
  //         moment(entry.name).isBetween(start, end, undefined, "[]")
  //       );
  //     } else if (period === "monthly") {
  //       const end = moment().endOf("day");
  //       const start = moment().subtract(1, "month").startOf("day");
  //       filtered = data.filter(entry =>
  //         moment(entry.name).isBetween(start, end, undefined, "[]")
  //       );
  //     }
  //   }

  //   setFilteredData(filtered);
  // };

  // const handlePeriodChange = (
  //   selectedPeriod: "daily" | "weekly" | "monthly"
  // ) => {
  // setPeriod(selectedPeriod);
  // setDateRange([null, null]);
  // };

  // const handleDateRangeChange = (dates: any[]) => {
  //   const clonedDates = dates.map(date => (date ? date.clone() : null));
  //   setDateRange(clonedDates);
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex gap={22} style={{ paddingTop: "20px" }} justify="space-between">
      <Col
        style={{
          width: "67%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
        className="defoult-shadow"
      >
        <Typography.Title level={3}>
          Shartnomalar statistikalari
        </Typography.Title>
        <Space style={{ marginBottom: "20px", marginTop: "20px" }}>
          {/* <Button onClick={() => handlePeriodChange("daily")}>Kunlik</Button>
          <Button onClick={() => handlePeriodChange("weekly")}>Haftalik</Button>
          <Button onClick={() => handlePeriodChange("monthly")}>Oylik</Button> */}
          {/* <RangePicker onChange={handleDateRangeChange} /> */}
        </Space>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            // data={filteredData}
            margin={{ top: 5, right: 5, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name="Current Debt"
              dataKey="current_debt"
              stroke="#271fc5"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="amount_withheld"
              stroke="#0eb34d"
              name="Amount Withheld"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="residue"
              stroke="#ff7300"
              name="Residue"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Col>
      <Col
        style={{ width: "33%", backgroundColor: "#fff" }}
        className="defoult-shadow"
      ></Col>
    </Flex>
  );
};

export default DashboardLineChart;
