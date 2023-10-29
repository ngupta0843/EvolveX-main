import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { useSelector } from "react-redux";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createService } from "../../../actions/service";

import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../components/custom/Button";
import Draggable from "react-draggable";
import CustomCard from "../../../components/custom/Card";
import CustomIcon from "../../../components/custom/IconButton";
import { Close } from "@mui/icons-material";
// import ServiceCreateForm from "../components/forms/ServiceCreateForm";

const { Option } = Select;

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const NewService = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("STTTARTTT");
  });

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let serviceData = new FormData();

    serviceData.append("title", title);
    serviceData.append("description", description);

    try {
      let res = await createService(token, serviceData);
      console.log("SERVICE CREATE RES ---->", res);
      toast.success("New service is posted");
      setTimeout(() => {
        history("/");
      }, 1000);
    } catch (err) {
      if (title === "" || description === "") {
        toast.error("All fields are required");
      } else {
        toast.error("Error creating service. Please try again.");
      }
    }
  };

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="bg-white">
      <Box
        sx={{ bgcolor: "rgb(179, 12, 120)", mb: 2 }}
        className="container-fluid bg-new-service p-5 text-center"
      >
        <Box className="service_box">
          <h3>
            <b>Create the help. Be the help. Stay the help.</b>
          </h3>
          <p>
            Need a little money on the side? Want to help people? Start by
            creating your service. Set your details, talk with the tutee, and
            you're all set!
          </p>
        </Box>
      </Box>
      <br />                        
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <CustomCard
          title="Start a new quiz"
          text={
            <Box display="flex" justifyContent="center" width={400}>
              <CustomButton onClick={handleOpen}>Create quiz</CustomButton>
              <Dialog
                open={openForm}
                onClose={() => {
                  setOpenForm(false);
                }}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <Box
                  sx={{
                    borderRadius: 1,
                    border: "2px solid black",
                    textAlign: "center",
                    overflow: "hidden",
                    width: 350,
                  }}
                >
                  <DialogTitle
                    sx={{ mb: 4, cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    <Typography
                      variant="h4"
                      textAlign="center"
                      display="flex"
                      justifyContent="space-between"
                    >
                      Start a new quiz
                      <CustomIcon
                        onClick={() => setOpenForm(false)}
                        icon={<Close />}
                      />
                    </Typography>
                  </DialogTitle>
                  <DialogContent sx={{ p: 4 }}>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <TextField
                          error={error}
                          helperText={helperText}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          label="Title"
                          placeholder="Create a meaningful title that relates to what you want from a mentor."
                          fullWidth
                          sx={{ mb: 1 }}
                          required
                          type="text"
                        />

                        <TextField
                          error={error}
                          helperText={helperText}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          label="Description"
                          placeholder="Describe what you expect from a mentor so we can match you with the best one for you."
                          fullWidth
                          sx={{ mt: 2 }}
                          required
                          type="text"
                        />
                      </>
                    )}
                    <DialogActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <CustomButton onClick={handleClick} disabled={loading}>
                        Create quiz
                      </CustomButton>
                    </DialogActions>
                  </DialogContent>
                </Box>
              </Dialog>
            </Box>
          }
        />
      </Box>
    </div>
  );
};

export default NewService;
