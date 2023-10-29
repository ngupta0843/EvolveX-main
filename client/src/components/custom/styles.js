import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  imageStepper: {
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    height: 200,
    width: "100%",
  },
  modal: {
    border: "2px solid black",
    borderRadius: "4px",
  },
  imageContainer: {
    height: "75%",
    border: "2px solid black",
  },
  image: {
    border: "2px solid black",
    borderRadius: 4,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.3)",
    },
  },
  modalTitle: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    cursor: "move",
    fontWeight: 900,
  },
  paper: {
    borderRadius: 4,
    border: "3px solid black",
    textAlign: "center",
    overflow: "hidden",
    width: 350,
  },
  playerTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingLeft: theme.spacing(2),
    cursor: "move",
  },
  iconButton: {
    "&:hover": {
      background: "rgba(0, 0, 0, 0.05)",
      cursor: "pointer",
    },
  },
  resize: {
    fontSize: "30px",
    fontWeight: 600,
  },
  button: {
    fontSize: "18px",
    fontFamily: "Poppins",
    backgroundColor: "rgb(240, 238, 238)",
    padding: "5px",
    color: "#1d1b31",
    cursor: "pointer",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    border: "none",
    marginBottom: theme.spacing(1),
    textAlign: "left",
    outline: "none",
    width: "100%",
    "&:hover": {
      boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "rgb(230, 230, 230)",
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
  [theme.breakpoints.down("md")]: {
    imageStepper: {
      height: 150,
    },
  },
}));
