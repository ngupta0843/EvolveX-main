import React, { useState } from "react";
import { Card, Badge, Avatar } from "antd";
import { Box, Grid } from "@mui/material";
import { SettingOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import moment from "moment";
import "./Dashboard.css";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Analytics } from "../../components/LineGraph";
import { Button } from "@mui/material";
import SearchSubjects from "../../components/SearchSubjects";
import SubjectGoals from "./Goals";
import { questions } from "../../actions/action";
import CustomCard from "../../components/custom/Card";
import { CustomButton } from "../../components/custom/Button";

const { Meta } = Card;
const { Ribbon } = Badge;

export const Dashboard = () => {
  const [level, setLevel] = useState(null);
  const [goals, setGoals] = useState("");

  const handleTest = async () => {
    let res = await questions({
      subject: "math",
      numQuestions: 5,
    });
  };

  return (
    <>
      <Box
        className="container-fluid p-5"
        sx={{ bgcolor: "rgb(179, 12, 120)", zIndex: -1 }}
      >
        <Box className="d-flex justify-content-around">
          <Ribbon text="New" color="blue">
            <Card>
              <Meta
                avatar={<Avatar>V</Avatar>}
                title="Vishesh Verma"
                description={`Joined ${moment("2023-03-18").fromNow()}`}
              />
            </Card>
          </Ribbon>
        </Box>
      </Box>
      <br />
      <Box sx={{ px: 10, mt: 2 }}>
        <Grid container spacing={6} justifyContent='center'>
          <Grid item xs={4}>
            <SubjectGoals />
            <br />
            <CustomCard
              title="Your level"
              text={
                level ? (
                  <h4>At A {level}th Grade Level </h4>
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CustomButton onClick={handleTest}>
                      Take Placement Test
                    </CustomButton>
                  </Box>
                )
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Analytics />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
