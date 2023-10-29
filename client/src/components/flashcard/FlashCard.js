import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slide,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Divider,
  CircularProgress,
  TextField,
} from "@mui/material";
import { CheckCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { soccerFlashcards } from "./flashcards";
import { useStyles } from "./styles";
import { CustomButton } from "../custom/Button";
import CustomDialog from "../custom/Dialog";
import { useEffect } from "react";
import { getflashcards } from "../../actions/action";

import { useNavigate } from "react-router-dom";
import FlashcardQuiz from "./FlashcardTest";
import FlashcardCongrats from "./FlashcardCongrats";
import Draggable from "react-draggable";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={"[class*='MuiDialogContent-root']"}
    >
      <Paper {...props} />
    </Draggable>
  );
};

export default function Flashcard() {
  const classes = useStyles();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [numQuestions, setNumQuestions] = useState("");
  const [flashcardStatus, setFlashcardStatus] = useState(
    Array(flashcards.length).fill(null)
  );
  const [open, setOpen] = useState(false);
  const currentCard = flashcards[currentCardIndex];
  const allFlashcards = [];
  const savedGoals = JSON.parse(localStorage.getItem("goals")) || "[]";
  const firstGoal = savedGoals.length > 0 ? savedGoals[0] : null;
  const STORAGE_KEY = `evolvex`;
  const navigate = useNavigate();

  useEffect(() => {
    setOpenDialog(true);
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) {
      setFlashcards(data.flashcards);
      setShowCongrats(data.showCongrats);
      setCurrentCardIndex(data.currentCardIndex);
      setIsFlipped(data.isFlipped);
      setScore(data.score);
      setOpen(data.open);
      setOpenDialog(data.openDialog);
    }
  }, [STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        flashcards,
        showCongrats,
        currentCardIndex,
        isFlipped,
        score,
        open,
        openDialog,
      })
    );
  }, [
    flashcards,
    showCongrats,
    currentCardIndex,
    isFlipped,
    score,
    open,
    openDialog,
    STORAGE_KEY,
  ]);

  const handleNext = (correct) => {
    const newFlashcardStatus = [...flashcardStatus];
    newFlashcardStatus[currentCardIndex] = correct;
    setFlashcardStatus(newFlashcardStatus);

    if (correct) {
      setScore(score + 1);
    }
    if (currentCardIndex === flashcards.length - 1) {
      setShowCongrats(true);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const getFlashcards = async () => {
    setLoading(true);
    let res = await getflashcards({
      subject: firstGoal.subject,
      num: numQuestions,
    });

    // console.log(res.data);
    const answers = res.data.answers;
    const questions = res.data.questions;

    for (let i = 0; i < questions.length; i++) {
      let format = {
        question: questions[i],
        answer: answers[i],
      };

      allFlashcards.push(format);
    }
    console.log(allFlashcards);
    setFlashcards(allFlashcards);
    setLoading(false);
    setOpenDialog(false);
    return allFlashcards;
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      {flashcards.length !== 0 ? (
        <React.Fragment>
          <FlashcardCongrats
            getFlashcards={getFlashcards}
            setShowCongrats={setShowCongrats}
            setCurrentCardIndex={setCurrentCardIndex}
            setIsFlipped={setIsFlipped}
            setScore={setScore}
            setFlashcards={setFlashcards}
            setOpen={setOpen}
            score={score}
            showCongrats={showCongrats}
            flashcards={flashcards}
            flashcardStatus={flashcardStatus}
          />
          <Box className={classes.root}>
            {!showCongrats && (
              <Slide direction="right" in>
                <Card className={classes.card} onClick={handleClick}>
                  {!isFlipped ? (
                    <CardContent className={classes.content}>
                      <Typography variant="h5">
                        {currentCard.question}
                      </Typography>
                    </CardContent>
                  ) : (
                    <Grow in>
                      <CardContent className={classes.content}>
                        <Typography variant="h5">
                          {currentCard.answer}
                        </Typography>
                        <Box
                          mt={4}
                          display="flex"
                          justifyContent="space-between"
                          sx={{ gap: 2 }}
                        >
                          <CustomButton
                            startIcon={
                              <CheckCircleOutline sx={{ color: "green" }} />
                            }
                            className={classes.button}
                            onClick={() => handleNext(true)}
                            sx={{
                              bgcolor: green[50],
                              border: "2px solid green",
                              color: "green",
                            }}
                          >
                            Correct
                          </CustomButton>
                          <CustomButton
                            startIcon={
                              <RemoveCircleOutline sx={{ color: red[800] }} />
                            }
                            className={classes.button}
                            onClick={() => handleNext(false)}
                            sx={{
                              bgcolor: red[50],
                              border: `2px solid ${red[800]}`,
                              color: red[800],
                            }}
                          >
                            Incorrect
                          </CustomButton>
                        </Box>
                      </CardContent>
                    </Grow>
                  )}
                </Card>
              </Slide>
            )}
            {!showCongrats && (
              <Grow in>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <CustomButton
                    color="primary"
                    onClick={handlePrev}
                    disabled={currentCardIndex === 0}
                  >
                    Prev
                  </CustomButton>
                  <Typography variant="body2">
                    Flashcard {currentCardIndex + 1} / {flashcards.length}
                  </Typography>
                  <CustomButton
                    color="primary"
                    onClick={() => handleNext(false)}
                    disabled={isFlipped}
                  >
                    {currentCardIndex === flashcards.length - 1
                      ? "Finish"
                      : "Next"}
                  </CustomButton>
                </Box>
              </Grow>
            )}
          </Box>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="draggable-dialog-title"
            PaperComponent={PaperComponent}
            scroll="body"
          >
            <div className={classes.paper}>
              <DialogTitle sx={{ cursor: "move" }} id="draggable-dialog-title">
                <Typography variant="h4" textAlign="center">
                  Take a quiz based on these flashcards
                </Typography>
              </DialogTitle>
              <Divider
                variant="middle"
                sx={{ border: "1px solid black", my: 1 }}
              />
              <DialogContent>
                <FlashcardQuiz flashcards={flashcards} />
              </DialogContent>
            </div>
          </Dialog>
        </React.Fragment>
      ) : (
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Start flashcards"
          action={
            <CustomButton onClick={() => getFlashcards()}>Start</CustomButton>
          }
          divider
          center
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <TextField
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              label="Num of questions"
              placeholder="e.g. 5"
              fullWidth
              required
              type="number"
            />
          )}
        </CustomDialog>
      )}
    </>
  );
}
