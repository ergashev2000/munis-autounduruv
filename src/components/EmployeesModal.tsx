import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  Form,
  Typography,
  Row,
  Select,
  Checkbox,
  message,
  Col,
  Flex,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { EmployeesType } from "../types/EmployeesType";
import { PositionType } from "../types/PositionsType";
import { BranchsType } from "../types/BranchsType";
import { getAll } from "../services/api/crudApi";
import { handleError } from "@utils/handleError";
import { alertSuccess } from "@utils/toastify";

interface Branch {
  id: string;
  name: string;
}

interface EmployeesModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onCreate?: (data: EmployeesType) => void;
  onUpdate?: (id: string, data: EmployeesType) => void;
  initialData?: EmployeesType | null;
  setInitialData?: ((data: EmployeesType | null) => void) | undefined;
}

const EmployeesModal: React.FC<EmployeesModalProps> = ({
  openModal,
  setOpenModal,
  onCreate,
  onUpdate,
  initialData,
  setInitialData,
}) => {
  const [branchsLoading, setBranchsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [branches, setBranches] = useState<BranchsType[]>([]);
  const [checkboxValues, setCheckboxValues] = useState({
    action: false,
    excel: false,
  });
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBranchIds, setSelectedBranchIds] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setBranchsLoading(true);
      try {
        const [positionsData, branchesData] = await Promise.all([
          getAll<PositionType[]>("/positions"),
          getAll<BranchsType[]>("/branches"),
        ]);

        setPositions(positionsData);
        setBranches(branchesData);
      } catch (error) {
        message.error("Ma'lumotlarni olishda xatolik yuz berdi!");
      } finally {
        setBranchsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (openModal) {
      if (initialData) {
        const transformedBranches = (
          initialData?.userBranches as unknown as Branch[]
        ).map(branch => ({
          value: branch.id,
          name: branch.name,
        }));

        form.setFieldsValue({
          username: initialData.username,
          fullName: initialData.fullName,
          phone: initialData.phone,
          status: initialData.status,
          positionId: initialData.positionId,
          action: initialData.action,
          excel: initialData.excel,
          branches: transformedBranches,
        });

        setCheckboxValues({
          action: initialData.action,
          excel: initialData.excel,
        });
        setSelectedBranchIds(initialData.userBranches || []);
      } else {
        form.resetFields();
        setSelectedBranchIds([]);
        setCheckboxValues({
          action: false,
          excel: false,
        });
      }
    }
  }, [initialData, openModal, form]);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setCheckboxValues(prev => ({
      ...prev,
      [e.target.name!]: e.target.checked,
    }));
  };

  const handleBranchChange = (value: string[]) => {
    console.log(value);

    setSelectedBranchIds(value);
    form.setFieldsValue({ branches: value });
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const branchIds = selectedBranchIds?.filter(selected =>
        selected.id ? selected.id : selected
      );

      const employeesObj: EmployeesType = {
        username: values.username,
        fullName: values.fullName,
        phone: values.phone,
        status: values.status,
        positionId: values.positionId,
        action: checkboxValues.action,
        excel: checkboxValues.excel,
        branches: branchIds,
      };

      if (values.password) {
        employeesObj.password = values.password;
      }

      if (initialData && onUpdate) {
        await onUpdate(initialData.id!, employeesObj);
        alertSuccess("Foydalanuvchi muvaffaqiyatli o'zgartirildi!");
      } else if (onCreate) {
        await onCreate(employeesObj);
        alertSuccess("Foydalanuvchi muvaffaqiyatli yaratildi!");
      }

      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  useEffect(() => {
    if (!openModal && setInitialData) {
      setInitialData(null);
    }
  }, [openModal, setInitialData]);

  return (
    <Modal
      centered
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      okText="Saqlash"
      cancelText="Bekor qilish"
      confirmLoading={loading}
      maskClosable={false}
      loading={branchsLoading}
    >
      <Form form={form} layout="vertical">
        <Typography.Title level={4}>
          Foydalanuvchi ma'lumotlari
        </Typography.Title>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="F.I.SH"
              name="fullName"
              rules={[
                { required: true, message: "Please input the full name!" },
              ]}
            >
              <Input placeholder="F.I.SH" size="large" />
            </Form.Item>
            <Form.Item
              label="Telefon raqam"
              name="phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <Input placeholder="Telefon raqam..." size="large" />
            </Form.Item>
            <Form.Item
              label="Login"
              name="username"
              rules={[{ required: true, message: "Please input the login!" }]}
            >
              <Input placeholder="Login..." size="large" />
            </Form.Item>
            <Form.Item
              label="Parol"
              name="password"
              rules={[
                {
                  required: !initialData,
                  message: "Please input the password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Parol..."
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Select
                style={{ width: "100%" }}
                options={[
                  { value: true, label: "Faol" },
                  { value: false, label: "Nofaol" },
                ]}
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Lavozim"
              name="positionId"
              rules={[
                { required: true, message: "Please select the position!" },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                options={positions.map(pos => ({
                  value: pos.id,
                  label: pos.name,
                }))}
                size="large"
              />
            </Form.Item>
            <Form.Item label="Filiallar" name="branches">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleBranchChange}
                options={branches.map(branch => ({
                  value: branch.id,
                  label: branch.name,
                }))}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Flex vertical gap={20}>
                <Checkbox
                  name="action"
                  checked={checkboxValues.action}
                  onChange={handleCheckboxChange}
                >
                  Amallar bajarish huquqi
                </Checkbox>
                <Checkbox
                  name="excel"
                  checked={checkboxValues.excel}
                  onChange={handleCheckboxChange}
                >
                  Excel yuklab olish huquqi
                </Checkbox>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EmployeesModal;
