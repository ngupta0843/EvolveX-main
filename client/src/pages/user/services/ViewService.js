import React, { useState, useEffect } from "react";
import {
  diffDays,
  msgPoster,
  read,
  serviceCurrencyFormatter,
} from "../../../actions/service";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewService = ({ match }) => {
  const [service, setService] = useState({});
  // const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [run, setRun] = useState(true);

  const history = useNavigate();

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (name !== "") {
      setRun(false);
    }
    if (run) {
      loadSellerService();
      // console.log(service.postedBy)
      service.postedBy && setName(service.postedBy.name);
    }
  }, [service.postedBy]);

  const loadSellerService = async () => {
    let res = await read(match.params.serviceId);
    // console.log(res);
    setService(res.data);
    // setImage(`http://localhost:8080/api/service/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!true) {
      history.push("/login");
    } else if ("Vishesh Verma" == name) {
      history.push(`/service/edit/${service._id}`);
    } else {
      console.log(auth.token, match.params.serviceId);

      try {
        let allBody = [service.postedBy];
        let res = await msgPoster(auth.token, match.params.serviceId, allBody);
        toast.success("Email sent succesfully!");
        setLoading(false);
      } catch (err) {
        toast.error("Error sending email. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container-fluid bg-new-service p-5 text-center">
        <h2>{service.title} </h2>
      </div>
      <div className="container_fluid bg-white">
        <div className="row">
          <div className="col-md-6">
            <br />
            {/* <img
              src={image}
              alt={service.title}
              className="img img-fluid m-2"
            /> */}
          </div>

          <div className="col-md-6">
            <br />
            <p className="alert alert-info mt-3">{service.description}</p>
            {name == "Vishesh Verma" ? (
              <i className="bg-white">You Posted This</i>
            ) : (
              <i className="bg-white">You're getting mentored by {name}</i>
            )}
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading}
            >
              {"Vishesh Verma" !== name
                ? loading
                  ? "Loading..."
                  : auth && auth.token
                  ? "Become Mentor"
                  : "Login to Become a Mentor"
                : "Edit Request"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewService;
