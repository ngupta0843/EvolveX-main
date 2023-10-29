import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  Box,
  Typography,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useStyles } from "./styles";
import { login } from "../actions/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();
  const history = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ------>"
        );
        // console.log(res.data);
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        toast.success("Login Success");
        setTimeout(() => {
          history("/seller/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt="Login"
        image="https://i.pinimg.com/736x/a5/0a/67/a50a6704336ade0fdb4b5a364df0b850.jpg"
        sx={{ width: 400 }}
        height={370}
      />
      <Divider
        flexItem
        orientation="vertical"
        sx={{ border: "1px solid black" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", mr: 4, ml: 2 }}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <LockOutlined color="primary" />
            </Avatar>
          }
          title={
            <Typography variant="h5" fontWeight="bold">
              Sign in
            </Typography>
          }
          sx={{ mb: -5, mt: 2 }}
        />
        <br />
        <CardContent>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="Email"
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
          <Button
            type="submit"
            onClick={handleSubmit}
            className={classes.submit}
            sx={{ mb: 3 }}
          >
            <span>Login</span>
          </Button>
        </Box>
        <Typography
          textAlign="center"
          variant="body2"
          color="secondary.veryDark"
          mb={1}
        >
          Don't have an account? Create one.
        </Typography>
      </Box>
    </Card>
  );
};

export default Login;
