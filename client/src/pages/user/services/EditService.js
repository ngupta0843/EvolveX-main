import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
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
import { CustomButton } from "../../../components/custom/Button";
import Draggable from "react-draggable";
import CustomCard from "../../../components/custom/Card";
import CustomIcon from "../../../components/custom/IconButton";
import { read, updateService } from "../../../actions/service";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import ServiceEditForm from "../components/forms/ServiceEditForm";

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


const EditService = ({ match }) => {
  //redux
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
    loadServices();
  }, []);

  const handleOpen = () => {
    setOpenForm(true);
  };


  const loadServices = async () => {
    let res = await read(match.params.serviceId);
    
    setTitle(res.data.title);
    setDescription(res.data.description);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let serviceData = new FormData();

    serviceData.append("title", title);
    serviceData.append("description", description);

    try {
      let res = await updateService(token, serviceData, match.params.serviceId);
      console.log("PRODUCT UPDATE RES ---->", res);
      toast.success(`${res.data.title} updated`);
      setTimeout(() => {
        history("/mentor/dashboard");
      }, 1000);
    } catch (err) {
      toast.error("Error updating service. Please try again.");
      // toast.error(err.response.data.err);
    }
  };

  // const handleImageChange = (e) => {
  //   // console.log(e.target.files[0])
  //   setPreview(URL.createObjectURL(e.target.files[0]));
  //   // setImage(e.target.files[0]);
  // };


  return (
    <div className="bg-white">
      <div className="container-fluid bg-new-service p-5 text-center">
        <div className="service_box">
          <h3>
            <b>Edit Your Request</b>
          </h3>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <CustomCard
              title="Edit Your Request"
              text={
                <Box display="flex" justifyContent="center">
                  <CustomButton onClick={handleOpen}>Update</CustomButton>
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
                         Edit Your Request
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
                          <CustomButton
                            onClick={handleClick}
                            disabled={loading}
                          >
                            Create quiz
                          </CustomButton>
                        </DialogActions>
                      </DialogContent>
                    </Box>
                  </Dialog>
                </Box>
              }
            />
          </div>
          {/* <div className="col-md-2 mt-4">
            {/* {preview !== "" && !review && (
              <img src={preview} alt="Preview" className="img img-fluid m-2" />
            )} */}
          {/* </div>  */}
        </div>
      </div>
    </div>
  );
};

export default EditService;
