import { useEffect, useState } from "react";

import { Card, Flex, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";

import CardStats from "@components/CardStats";
import TableDashboard from "@components/TableDashboard";
import { dashboardBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import Breadcrumb from "@components/ui/Breadcrumbs";
import ExportDropdown from "@components/ui/ExportDropdown";

import LineChart from "@components/DashboardLineChart";

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  }, []);

  return (
    <div>
      <Flex justify="space-between">
        <Breadcrumb breadcrumbs={dashboardBreadcrumbs} />
        <ExportDropdown />
      </Flex>
      <div>
        <LineChart />
      </div>
      <div className="dashboard_card">
        <Flex justify="space-between" gap={20}>
          {isLoading ? (
            <>
              <CardStats />
              <CardStats />
              <CardStats />
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  style={{
                    maxWidth: "calc(33.2% - 10px)",
                    width: "100%",
                    padding: "50px 0",
                  }}
                >
                  <Flex gap={20}>
                    <Skeleton loading active>
                      <Meta
                        title="Card title"
                        description="This is the description"
                      />
                    </Skeleton>
                    <Skeleton.Avatar active size={120} shape={"circle"} />
                  </Flex>
                </Card>
              ))}
            </>
          )}
        </Flex>
      </div>
      <TableDashboard />
    </div>
  );
}
