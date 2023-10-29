import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConnectNav from "../../components/navs/ConnectNav";
import { useSelector } from "react-redux";
import {
  ShoppingOutlined,
  FormOutlined,
  FileJpgOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import { sellerServices, deleteService } from "../../actions/service";
import { toast } from "react-toastify";
import SellerCard from "../../components/SellerCard";
import CustomCard from "../../components/custom/Card";

const MentorDashboard = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadSellersServices();
  }, []);

  const loadSellersServices = async () => {
    let res = await sellerServices(auth.token);
    setServices(res.data);
  };

  const handleServiceDelete = async (serviceId) => {
    deleteService(auth.token, serviceId).then((res) => {
      toast.success("Service Successfully Deleted");
      loadSellersServices();
    });
  };
  console.log(services);

  const dash = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Services</h2>
        </div>
        <div className="col-md-2">
          {services.length !== 0 && (
            <Link to="/services/new" className="btn btn-primary">
              + Add New
            </Link>
          )}
        </div>
      </div>

      <div className="row">
        {services.map((p) => (
          <SellerCard
            key={p._id}
            p={p}
            owner
            showViewMoreButton={false}
            handleServiceDelete={handleServiceDelete}
          />
        ))}{" "}
        {services.length == 0 && (
          <div className="no-services align-items-center justify-content-center">
            <FormOutlined className="h1" />
            <h3>Create your first service</h3>
            <p>Make learning hit home. Start by coming up with an idea.</p>
            <Link to="/services/new" className="btn btn-primary">
              + Add New
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Box
        sx={{ bgcolor: "rgb(179, 12, 120)" }}
        className="container-fluid bg-seller p-5"
      >
        <ConnectNav seller={true} />
      </Box>

      <div className="container-fluid p-4">{/* <DashboardNav /> */}</div>

      {dash()}
    </>
  );
};

export default MentorDashboard;
