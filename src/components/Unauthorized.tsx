import { Button, Card, Flex } from "antd";
import { ArrowLeft, CircleMinus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Card>
        <Flex justify="center" style={{ color: "red" }}>
          <CircleMinus size={50} />
        </Flex>
        <p style={{ marginBlock: "20px", fontSize: "28px" }}>
          Bu sahifa uchun sizda ruhsat yo'q
        </p>
        <Flex justify="center">
          <Link to={"/auth/login"}>
            <Button type="primary">
              <ArrowLeft size={18} /> Qaytish
            </Button>
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
}
