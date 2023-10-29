import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";
import Draggable from "react-draggable";
import { CustomButton } from "../custom/Button";
import CustomIcon from "../custom/IconButton";
import { useStyles } from "./styles";

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

export default function QuizDialog(props) {
  const {
    selectedAnswers,
    selectedQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    dialogOpen,
    setDialogOpen,
  } = props;
  const selectedAnswer = selectedAnswers[currentQuestionIndex] || "";
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const classes = useStyles();

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.paper}>
        <DialogTitle
          id="draggable-dialog-title"
          sx={{
            bgcolor:
              selectedAnswer ===
              selectedQuestions[currentQuestionIndex].correctAnswer
                ? green[700]
                : red[700],
            alignItems: "center",
            borderBottom: "2px solid black",
            display: "flex",
            justifyContent: "space-between",
            cursor: "move",
            mb: 2,
          }}
        >
          <div>
            <strong>Review: </strong>#{currentQuestionIndex + 1}
          </div>
          <CustomIcon icon={<Close />} onClick={handleDialogClose} />
        </DialogTitle>
        <DialogContent>
          <FormControl variant="filled">
            <Typography id="demo-error-radios">
              {currentQuestion.question}:
            </Typography>
            <RadioGroup
              aria-label="answer"
              name="answer"
              value={selectedAnswer}
            >
              {currentQuestion.answers.map((answer, i) => (
                <FormControlLabel
                  key={i}
                  value={answer}
                  control={
                    <Radio
                      sx={[
                        answer !==
                          selectedQuestions[currentQuestionIndex]
                            .correctAnswer && {
                          "&.Mui-checked": {
                            color: "red",
                          },
                        },
                        selectedQuestions[currentQuestionIndex]
                          .correctAnswer === answer && {
                          color: "green",
                        },
                        answer ===
                          selectedQuestions[currentQuestionIndex]
                            .correctAnswer && {
                          "&.Mui-checked": {
                            color: "green",
                          },
                        },
                      ]}
                    />
                  }
                  label={
                    <Typography
                      sx={[
                        { color: "red" },
                        answer ===
                          selectedQuestions[currentQuestionIndex]
                            .correctAnswer && {
                          color: "green",
                        },
                        answer !== selectedAnswer && {
                          color: "black",
                        },
                        selectedQuestions[currentQuestionIndex]
                          .correctAnswer === answer && {
                          color: "green",
                        },
                      ]}
                    >
                      {answer}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          {currentQuestionIndex > 0 && (
            <CustomButton
              onClick={handlePreviousQuestion}
              sx={{
                mr: 1,
              }}
            >
              Previous
            </CustomButton>
          )}
          {currentQuestionIndex < selectedQuestions.length - 1 ? (
            <CustomButton onClick={handleNextQuestion}>Next</CustomButton>
          ) : (
            <CustomButton onClick={() => setCurrentQuestionIndex(0)}>
              Next
            </CustomButton>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
}
