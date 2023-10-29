import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Draggable from "react-draggable";
import { useStyles } from "./styles";
import { Close } from "@mui/icons-material";

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

export default function CustomDialog(props) {
  const {
    open,
    setOpen,
    width,
    title,
    titleAction,
    divider,
    action,
    actionDivider,
    center,
    children,
  } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <Box
        sx={{
          borderRadius: 1,
          border: "3px solid black",
          textAlign: "center",
          overflow: "hidden",
          width: width ? width : 350,
        }}
      >
        <DialogTitle
          id="draggable-dialog-title"
          className={classes.playerTitle}
          sx={{
            cursor: "move",
          }}
        >
          <Typography sx={{ fontSize: "24px", pt: 1 }}>{title}</Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              mr: titleAction ? 6 : 1,
            }}
          >
            <Close color="primary" />
          </IconButton>
          {titleAction && (
            <div>
              <Divider
                orientation="vertical"
                sx={{
                  border: "1px solid black",
                  height: 25,
                  mt: 1,
                  mr: 3.5,
                }}
              />
              {titleAction}
            </div>
          )}
        </DialogTitle>
        {divider && <Divider sx={{ margin: '15px 10px 0px 15px'}} />}
        <DialogContent>{children}</DialogContent>
        {actionDivider && <Divider variant="middle" />}
        {action && (
          <DialogActions
            sx={{
              display: center ? "flex" : "",
              justifyContent: center ? "center" : "",
              pb: 3,
            }}
          >
            {action}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}
