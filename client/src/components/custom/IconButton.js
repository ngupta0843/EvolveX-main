import React from "react";
import { ButtonBase } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export default function CustomIcon(props) {
  const { icon } = props;

  return (
    <ButtonBase
      {...props}
      sx={(theme) => ({
        borderRadius: "50%",
        padding: theme.spacing(1),
        "&:hover": {
          borderRadius: "50%",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          background: "rgba(0, 0, 0, 0.05)",
        },
        "&:active": {
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        },
      })}
    >
      {icon ? icon : <MoreVert color="primary" />}
    </ButtonBase>
  );
}
