import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Flex, Input, Tooltip, Typography } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/logo.png";

const { Title } = Typography;

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username talab qilinadi!"),
  password: Yup.string()
    .required("Password talab qilinadi!")
    .min(3, "Username must be at least 3 characters long"),
});

const Login: React.FC = () => {
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await axios.post("/api/login", values);
      console.log("Login success:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="login_page">
      <div className="login_aside-img">
        <Flex justify="center" align="center" vertical gap={20}>
          <Flex>
            <img src={Logo} alt="Munis logo" style={{ width: "150px" }} />
          </Flex>
          <Title level={4} style={{ color: "#fff" }}>
            Enter your details to access your account
          </Title>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%", textAlign: "center" }}>
                <Field name="username">
                  {({ field }: FieldProps<string>) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Username"
                        size="large"
                        suffix={
                          <Tooltip title="Enter your username">
                            <InfoCircleOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          </Tooltip>
                        }
                        style={{ width: "100%" }}
                      />
                      <ErrorMessage name="username">
                        {msg => <div className="login_error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {({ field }: FieldProps<string>) => (
                    <div>
                      <Input.Password
                        {...field}
                        placeholder="Password"
                        size="large"
                        iconRender={visible =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{ width: "100%", marginTop: "30px" }}
                      />
                      <ErrorMessage name="password">
                        {msg => <div className="login_error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  )}
                </Field>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: "#d51821",
                    color: "#fff",
                    borderColor: "transparent",
                    paddingInline: "40px",
                    marginTop: "30px",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "LOGIN"}
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </div>
    </div>
  );
};

export default Login;
