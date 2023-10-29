import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/auth";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grow,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useStyles } from "./styles";
import { Key } from "@mui/icons-material";
// import { CustomButton } from './pages/custom/Button';
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();
  const history = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await register({
          name,
          email,
          password,
        });

        // console.log("REGISTER USER ------>", res);
        toast.success("Register success. Please login.");
        history("/login");
      } catch (err) {
        // console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      }
    };

  return (
    <div className={classes.auth}>
      <Grow in>
        <form onSubmit={handleSubmit}>
          <Card className={classes.card}>
            <Box
              sx={{ display: "flex", flexDirection: "column", mr: 4, ml: 2 }}
            >
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    <Key color="primary" />
                  </Avatar>
                }
                title={
                  <Typography variant="h5" fontWeight="bold">
                    Register
                  </Typography>
                }
                sx={{ mt: 2 }}
              />
              <CardContent>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  variant="outlined"
                />
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" className={classes.submit} sx={{ mb: 3 }}>
                  Sign Up
                </Button>
              </Box>
              <Typography variant="body2" color="secondary.veryDark" mb={1}>
                Already have an account? Sign in.
              </Typography>
            </Box>
            <Divider
              flexItem
              orientation="vertical"
              sx={{ border: "1px solid black" }}
            />
            <Box sx={{ alignItems: "center" }}>
              <CardMedia
                component="img"
                alt="Login"
                image="https://i.pinimg.com/736x/a5/0a/67/a50a6704336ade0fdb4b5a364df0b850.jpg"
                sx={{ width: 400, height: "90%" }}
              />
            </Box>
          </Card>
        </form>
      </Grow>
    </div>
  );
};

export default Register;
