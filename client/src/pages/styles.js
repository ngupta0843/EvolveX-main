import { makeStyles } from "@mui/styles";

//styles
export const useStyles = makeStyles((theme) => ({
  card: {
    width: "85%",
    border: "2px solid black",
    margin: "auto",
    // marginTop: theme.spacing(5),
    boxShadow: theme.shadows[4],
    display: "flex",
    height: "80vh",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.2)",
    border: "2px solid black",
    margin: "auto",
  },
  divider: {
    my: 3,
    borderBottomWidth: 2,
    color: "black",
  },
  box: {
    flexGrow: 1,
    p: 3,
    alignItems: "center",
  },
  auth: {
    alignItems: "center",
    marginTop: theme.spacing(8),
    // backgroundColor: "#137000",
  },
}));
