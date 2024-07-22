import { Flex } from "antd";
import MediaFilesAudio from "./MediaFilesAudio";
import MediaFilesSms from "./MediaFilesSms";

export default function AudioAndSmsAdd() {
  return (
    <>
      <Flex gap={10}>
        <MediaFilesAudio />
        <MediaFilesSms />
      </Flex>
    </>
  );
}
