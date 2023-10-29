import React from "react";
import { Refresh } from "@mui/icons-material";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { CustomButton } from "../custom/Button";
import CustomCard from "../custom/Card";
import CustomIcon from "../custom/IconButton";
import QuizDialog from "./QuizDialog";
import QuizResults from "./results/QuizResults";

export default function QuizReview(props) {
  const {
    selectedAnswers,
    selectedQuestions,
    incorrectQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    dialogOpen,
    setDialogOpen,
    handleRestart,
  } = props;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  let score = 0;
  for (let i = 0; i < selectedQuestions.length; i++) {
    if (selectedAnswers[i] === selectedQuestions[i].correctAnswer) {
      score++;
    }
  }
  return (
    <Box sx={{ p: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <CustomCard
            title="You finished!"
            action={
              <CustomIcon onClick={handleDialogOpen} icon={<Refresh />} />
            }
            text={
              <div>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography>
                    <strong>Your score is:</strong> {score} /{" "}
                    {selectedQuestions.length}
                  </Typography>
                  <CustomButton onClick={handleRestart}>
                    Start a new quiz
                  </CustomButton>
                </Stack>
                <Divider sx={{ mb: 4, color: "1px solid black" }}>
                  Incorrect Questions:
                </Divider>
                {incorrectQuestions.length ? (
                  <Grid container spacing={3} justifyContent={"center"}>
                    {incorrectQuestions.map((incorrectIndex, index) => (
                      <Grid item xs={6} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "2px solid black",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            minHeight: "100%",
                          }}
                        >
                          <strong>#{incorrectIndex + 1}:</strong>{" "}
                          {selectedQuestions[incorrectIndex].question}:
                          <Divider
                            sx={{ my: 1, border: "0.5px solid black" }}
                          />
                          <span style={{ color: "red" }}>
                            {selectedAnswers[incorrectIndex] ? (
                              <div>
                                <strong>You said:</strong>{" "}
                                {selectedAnswers[incorrectIndex]}
                              </div>
                            ) : (
                              <div>
                                <strong>You said: </strong>No Answer Selected
                              </div>
                            )}
                          </span>
                          <span style={{ color: "green" }}>
                            <strong>Correct answer: </strong>
                            {selectedQuestions[incorrectIndex].correctAnswer}
                          </span>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <p>You got nothing wrong. Way to go!</p>
                )}
              </div>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <QuizResults />
        </Grid>
      </Grid>
      <QuizDialog
        selectedAnswers={selectedAnswers}
        selectedQuestions={selectedQuestions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </Box>
  );
}
