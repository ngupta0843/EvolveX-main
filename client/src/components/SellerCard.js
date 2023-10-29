import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Space, Table, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SellerCard = ({
  p,
  handleServiceDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useNavigate();
  const [tutee, setTutees] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Timer",
      dataIndex: "timer",
      key: "timer",
      render: (timer) => <a>{timer}</a>,
    },
  ];
  const data = [
    // {
    //   key: "1",
    //   name: "Vishesh Verma",
    //   email : "visheshv05@gmail.com",
    // },
    {
      key: "1",
      name: "Test User",
      email: "test@gmail.com",
      timer: "Click to Start Timer",
    },
  ];

  const submit = () => {
    // return confirmAlert({
    //   title: "Confirm to Submit",
    //   message: `Are you sure want to bid on "${request.title}" with $${price}`,
    //   buttons: [
    //     {
    //       label: "No",
    //       // onClick: () => alert("Click Yes"),
    //     },
    //     {
    //       label: "I'm sure",
    //       onClick: {handleClick},
    //     },
    //   ],
    // });
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm">
            <h1>Confirm to Submit</h1>
            <p>Are you sure you want to delete this service?"</p>
            <button className="no-btn" onClick={onClose}>
              No
            </button>
            <button
              className="yes-btn"
              onClick={() => {
                handleServiceDelete(p._id);
                onClose();
              }}
            >
              I'm Sure
            </button>
          </div>
        );
      },
    });
  };

  console.log(p);
  return (
    <>
      <div className="card mb-3 p-5">
        <div className="row no-gutters">
          <div className="col-md-4">
            {p.image && p.image.contentType ? (
              <img
                src={`http://localhost:8080/api/service/image/${p._id}`}
                alt="Service Image"
                className="card=image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=EvolveX+Mentors"
                alt="Default Service Image"
                className="card=image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{p.title}</h1>
              <h4 className="alert alert-info">
                {p.description.length > 300
                  ? `${p.description.substring(0, 300)}...`
                  : p.description}
              </h4>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerCard;
