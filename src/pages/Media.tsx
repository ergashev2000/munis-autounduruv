import MediaFiles from "@components/MediaFiles";
import BreadcrumbItem from "@components/ui/Breadcrumbs";
import { callsFormBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import { Flex } from "antd";

export default function AddAudioSms() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "10px" }}
      >
        <BreadcrumbItem breadcrumbs={callsFormBreadcrumbs} />
      </Flex>
      <MediaFiles />
    </>
  );
}
