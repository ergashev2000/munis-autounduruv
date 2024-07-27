// import React, { useEffect, useState } from "react";
// import { Button, Input, Popconfirm, Space, Table } from "antd";
// import type { TableProps, TablePaginationConfig } from "antd";
// import { ColumnsType } from "antd/es/table";
// import { FilePenLine, Plus, Trash2 } from "lucide-react";
// import WhiteListModal from "./WhiteListModal";
// import axios from "axios";
// import { SearchOutlined } from "@ant-design/icons";

// interface DataType {
//   id: number;
//   fullname: string;
//   phone: string;
//   created_by_user: string;
//   status: boolean;
//   comment: string;
//   created_at: string;
//   updated_at: string;
// }

// const PositionsTable: React.FC = () => {
//   const [data, setData] = useState<DataType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [pagination, setPagination] = useState<TablePaginationConfig>({
//     current: 1,
//     pageSize: 10,
//   });

//   const handleEdit = (record: DataType) => {
//     console.log("Edit record:", record);
//   };

//   const handleDelete = (id: number) => {
//     console.log("Delete record with ID:", id);
//   };

//   const handleSearch = async (value: string) => {
//     setSearchText(value);
//     setLoading(true);
//     try {
//       const response = await axios.get<DataType[]>("/api/your-endpoint", {
//         params: { search: value },
//       });

//       if (Array.isArray(response.data)) {
//         setData(response.data);
//         setTableParams(prev => ({
//           ...prev,
//           pagination: {
//             ...prev.pagination!,
//             total: response.data.length,
//           },
//         }));
//       } else {
//         console.error("Unexpected API response format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "ID",
//       dataIndex: "order",
//       width: "5%",
//       render: (_, __, index: number) => {
//         const currentPage = pagination?.current ?? 1;
//         const pageSize = pagination?.pageSize ?? 10;
//         return (currentPage - 1) * pageSize + index + 1;
//       },
//     },
//     {
//       title: "F.I.SH",
//       dataIndex: "fullname",
//       width: "20%",
//       render: val => <span style={{ color: "#1677FF" }}>{val}</span>,
//     },
//     {
//       title: "Telefon Raqami",
//       dataIndex: "phone",
//       width: "15%",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       width: "10%",
//       align: "center",
//       render: (status: boolean) =>
//         status ? (
//           <div
//             style={{
//               color: "#fff",
//               backgroundColor: "black",
//               fontWeight: "500",
//               borderRadius: "4px",
//               padding: "2px 4px",
//             }}
//           >
//             To'xtatilgan
//           </div>
//         ) : (
//           <div
//             style={{
//               color: "#fff",
//               backgroundColor: "green",
//               fontWeight: "500",
//               borderRadius: "4px",
//               padding: "2px 4px",
//             }}
//           >
//             Faol
//           </div>
//         ),
//     },
//     {
//       title: "Yaratildi",
//       dataIndex: "created_by_user",
//       width: "15%",
//     },
//     {
//       title: "Yaratilgan vaqt",
//       dataIndex: "created_at",
//       width: "20%",
//     },
//     {
//       title: "Izoh",
//       dataIndex: "comment",
//       width: "20%",
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       width: "15%",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           <Popconfirm
//             title="Are you sure to delete this user?"
//             onConfirm={() => handleDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="link" style={{ color: "red" }}>
//               <Trash2 />
//             </Button>
//           </Popconfirm>
//           <Button type="link" onClick={() => handleEdit(record)}>
//             <FilePenLine />
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get<DataType[]>("/api/your-endpoint");
//         if (Array.isArray(response.data)) {
//           setData(response.data);
//           setPagination();
//         } else {
//           console.error("Unexpected API response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [pagination?.current, pagination?.pageSize]);

//   const handleTableChange: TableProps<DataType>["onChange"] = (
//     pagination,
//     filters,
//     sorter
//   ) => {
//     setPagination({
     
//     });

//     if (pagination.pageSize !== pagination?.pageSize) {
//       setData([]);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 16,
//         }}
//       >
//         <Input
//           placeholder="Search"
//           prefix={<SearchOutlined />}
//           value={searchText}
//           onChange={e => handleSearch(e.target.value)}
//           style={{ width: 500 }}
//         />
//         <Button type="primary" onClick={() => setOpenModal(true)}>
//           <Plus />
//           Oq list qo'shish
//         </Button>
//       </div>
//       <WhiteListModal openModal={openModal} setOpenModal={setOpenModal} />
//       <Table
//         columns={columns}
//         rowKey={record => record.id.toString()}
//         dataSource={data}
//         pagination={pagination}
//         loading={loading}
//         onChange={handleTableChange}
//         bordered
//       />
//     </>
//   );
// };

// export default PositionsTable;

export default function WhiteListTable() {
  return (
    <div>WhiteListTable</div>
  )
}
