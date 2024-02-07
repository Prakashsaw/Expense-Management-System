import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import { BASE_URL } from "../utils/baseURL";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      id: "1",
      title: "Date(yyyy-mm-dd)",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      id: "2",
      title: "Amount(Rs.)",
      dataIndex: "amount",
    },
    {
      id: "3",
      title: "Type",
      dataIndex: "type",
    },
    {
      id: "4",
      title: "Category",
      dataIndex: "category",
    },
    {
      id: "5",
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      id: "6",
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transactions

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(
          `${BASE_URL}/api/v1/transections/get-transection`,
          {
            userid: user._id,
            frequency,
            selectedDate,
            type,
          }
        );
        setAllTransection(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Fetch Issue With Transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransection]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/v1/transections/delete-transection`, {
        transacationId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");

      //For auto update on client if any update or edit be done
      // localStorage.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post(`${BASE_URL}/api/v1/transections/edit-transection`, {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);

        // localStorage.reload();

        message.success("Transaction Updated Successfully");
      } else {
        await axios.post(`${BASE_URL}/api/v1/transections/add-transection`, {
          ...values,
          userid: user._id,
        });
        setLoading(false);

        // localStorage.reload();

        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);

      //For auto update on client if any update or edit be done
      // localStorage.reload();
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
  };

  return (
    <>
      <Layout>
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>
              <Select.Option value="365">LAST 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedate(values)}
              />
            )}
          </div>
          <div className="filter-tab ">
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="Income">INCOME</Select.Option>
              <Select.Option value="Expense">EXPENSE</Select.Option>
            </Select>
          </div>
          <div className="switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add New
            </button>
          </div>
        </div>
        <div className="content">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTransection} />
          ) : (
            <Analytics allTransection={allTransection} />
          )}
        </div>
        <Modal
          title={editable ? "Edit Transaction" : "Add Transection"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="Income">Income</Select.Option>
                <Select.Option value="Expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="Income in Salary">
                  Income in Salary
                </Select.Option>
                <Select.Option value="Income in Part Time">
                  Income in Part Time
                </Select.Option>
                <Select.Option value="Income in Project">
                  Income in Project
                </Select.Option>
                <Select.Option value="Income in Freelancing">
                  Income in Freelancing
                </Select.Option>
                <Select.Option value="Expense in Tip">
                  Expense in Tip
                </Select.Option>
                <Select.Option value="Expense in Stationary">
                  Expense in Stationary
                </Select.Option>
                <Select.Option value="Expense in Food">
                  Expense in Food
                </Select.Option>
                <Select.Option value="Expense in Movie">
                  Expense in Movie
                </Select.Option>
                <Select.Option value="Expense in Bills">
                  Expense in Bills
                </Select.Option>
                <Select.Option value="Expense in Medical">
                  Expense in Medical
                </Select.Option>
                <Select.Option value="Expense in Fees">
                  Expense in Fees
                </Select.Option>
                <Select.Option value="Expense in TAX">
                  Expense in TAX
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Refrence" name="refrence">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" required />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                {" "}
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default HomePage;
