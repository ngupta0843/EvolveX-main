import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import {
  CheckCircleOutline,
  Close,
  RemoveCircleOutline,
} from "@mui/icons-material";
import Draggable from "react-draggable";
import CustomIcon from "../custom/IconButton";
import { CustomButton } from "../custom/Button";
import { useSelector } from "react-redux";

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

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?";
  let code = "";
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

export default function ReviewDialog(props) {
  // const { user: currentUser } = useSelector((state) => state.auth);
  const {
    open,
    setOpen,
    selectedAnswers,
    selectedQuestions,
    setCurrentQuestionIndex,
    setShowResults,
    setIncorrectQuestions,
    bookmarkedQuestions,
    selectedCategory,
  } = props;

  const handleSubmit = () => {
    let incorrect = [];
    for (let i = 0; i < selectedQuestions.length; i++) {
      if (selectedAnswers[i] !== selectedQuestions[i].correctAnswer) {
        incorrect.push(i);
      }
    }
    setIncorrectQuestions(incorrect);
    setShowResults(true);
    setCurrentQuestionIndex(0);
    setOpen(false);

    const results = {
      date: new Date().toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      score: selectedQuestions.length - incorrect.length,
      incorrectQuestions: incorrect,
    };
    const storedResults = JSON.parse(localStorage.getItem(`results`) || []);
    localStorage.setItem(
      `results`,
      JSON.stringify([...storedResults, results])
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="draggable-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "move",
          alignItems: "center",
        }}
      >
        <div>
          <Typography fontWeight="bold" fontSize="1.1em">
            Wait! Before you submit...
          </Typography>
          <Typography color="textSecondary" variant="body1">
            Let's review your quiz
          </Typography>
        </div>
        <CustomIcon
          style={{ height: "100%" }}
          icon={<Close />}
          onClick={() => setOpen(false)}
        />
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <Grid container>
          <Grid
            item
            xs={bookmarkedQuestions.length > 0 ? 6 : 12}
            sx={{
              pr: 2,
              borderRight:
                bookmarkedQuestions.length > 0 ? "1px solid black" : null,
            }}
          >
            <List dense>
              <Box display="flex" mb={1}>
                <div>
                  <CheckCircleOutline sx={{ color: "green", ml: 1 }} /> =
                  Answered
                </div>
                <div>
                  <RemoveCircleOutline sx={{ color: "red", ml: 1 }} /> = Blank
                </div>
              </Box>
              {selectedQuestions.map((question, index) => (
                <div>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      selectedAnswers[index] ? (
                        <CheckCircleOutline sx={{ color: "green", ml: 1 }} />
                      ) : (
                        <RemoveCircleOutline sx={{ color: "red", ml: 1 }} />
                      )
                    }
                  >
                    <ListItemButton
                      sx={{ padding: 2 }}
                      onClick={() => {
                        setCurrentQuestionIndex(index);
                        setOpen(false);
                      }}
                    >
                      <Typography key={index}>
                        <strong>#{index + 1}:</strong>{" "}
                        {question.question.substring(0, 17)}...{" "}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Grid>
          {bookmarkedQuestions.length > 0 && (
            <Grid item xs={6} sx={{ pl: 2 }}>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                ml={1}
              >
                Bookmarked
                <Typography color="textSecondary" variant="body1">
                  &nbsp;(
                  {bookmarkedQuestions.length ? (
                    bookmarkedQuestions.length
                  ) : (
                    <div />
                  )}
                  )
                </Typography>
              </Typography>
              <List dense>
                {bookmarkedQuestions.map((bookmarkedIndex, index) => (
                  <div>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{ pb: 2, pt: 1 }}
                        onClick={() => {
                          setCurrentQuestionIndex(bookmarkedIndex);
                          setOpen(false);
                        }}
                      >
                        <Typography key={index}>
                          <strong>#{bookmarkedIndex + 1}:</strong>&nbsp;
                          {selectedQuestions[
                            bookmarkedIndex
                          ].question.substring(0, 25)}
                          ...{" "}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
        <DialogActions>
          <CustomButton onClick={() => setOpen(false)}>Close</CustomButton>
          <CustomButton
            onClick={handleSubmit}
            sx={{
              bgcolor: "secondary.main",
            }}
          >
            Submit
          </CustomButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
