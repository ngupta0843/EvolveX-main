import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allServices } from "./actions/service";
import SmallCard from "./components/SmallCard";
import "./Mentee.css";
import styled, { keyframes } from "styled-components";
import { bounceInRight } from "react-animations";

const bounceAnimation = keyframes`${bounceInRight}`;

const ViewMentees = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadAllServices();
  }, []);

  const loadAllServices = async () => {
    let res = await allServices();
    setServices(res.data);
  };

  return (
    <>
      <div className="container-fluid p-5 text-center buyer-page">
        <BouncyDiv>
          <div className="buy_box">
            <h5>
              <b>Your single stop destination for learning and exploring.</b>
            </h5>
            <p>
              Sometimes you just need to find someone to help. Don't know where
              to get it? Can't find somebody that you can help? EvolveX is the
              place for you.
            </p>
            <button className="form-control btn btn-primary submit px-3 w-50 buy-center">
              Let's see it
            </button>
          </div>
        </BouncyDiv>
      </div>
      <div className="container-fluid bg-white">
        <br />
        <h1 className="center-title">Mentees Waiting For You</h1>
        <div className="d_flex">
          {services.map((p) => (
            <div className="child">
              <SmallCard key={p._id} p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

export default ViewMentees;
