import { Avatar, Flex } from "antd";
import { useAuth } from "../context/AuthContext";
import { formatPhoneNumber } from "@utils/formatPhoneNumber";

export default function Header() {
  const { user } = useAuth();
  return (
    <>
      <Flex
        justify="end"
        style={{
          backgroundColor: "#fff",
          height: "60px",
          paddingRight: "20px",
        }}
      >
        <Flex align="center" gap={10}>
          <Avatar
            size={35}
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          >
            {user?.fullName[0].toLocaleUpperCase()}
          </Avatar>
          <div>
            <h3>
              {user?.fullName}{" "}
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                ({user?.username})
              </span>
            </h3>
            <p style={{ paddingTop: "2px" }}>
              {formatPhoneNumber(user?.phone)}
            </p>
          </div>
        </Flex>
      </Flex>
    </>
  );
}
