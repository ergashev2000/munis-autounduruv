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

import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, message, Tooltip } from "antd";

import Logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: "superadmin",
  password: "test",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username talab qilinadi!"),
  password: Yup.string()
    .required("Password talab qilinadi!")
    .min(4, "Username must be at least 4 characters long"),
});

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      await login(values.username, values.password);
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100dvh" }}>
      <Flex
        justify="center"
        align="center"
        vertical
        gap={20}
        style={{
          backgroundColor: "#fff",
          boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
          padding: "26px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <Flex vertical justify="center" align="center" gap={10}>
          <img src={Logo} alt="Munis logo" style={{ width: "100px" }} />
          <p style={{ fontSize: "14px" }}>Auto unduruv dasturiga kirish</p>
        </Flex>
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
                        <Tooltip title="Username majburiy!">
                          <InfoCircleOutlined
                            style={{ color: "rgba(0,0,0,.45)" }}
                          />
                        </Tooltip>
                      }
                      style={{ width: "100%" }}
                    />
                    <ErrorMessage name="username">
                      {msg => (
                        <div
                          style={{
                            fontSize: "12px",
                            textAlign: "start",
                            color: "#e90909",
                          }}
                        >
                          {msg}
                        </div>
                      )}
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
                      {msg => (
                        <div
                          style={{
                            fontSize: "12px",
                            textAlign: "start",
                            color: "#e90909",
                          }}
                        >
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                )}
              </Field>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={isSubmitting}
                loading={isSubmitting}
                style={{
                  marginTop: "30px",
                  paddingInline: "30px",
                }}
              >
                Kirish
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Login;
