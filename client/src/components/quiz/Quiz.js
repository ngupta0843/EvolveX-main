import React, { useEffect, useState } from "react";
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
import { CustomButton } from "../custom/Button";
import CustomCard from "../custom/Card";
import QuizForm from "./QuizForm";
import QuizReview from "./QuizReview";
import { useSelector } from "react-redux";
import CustomIcon from "../custom/IconButton";
import { Close, Shuffle } from "@mui/icons-material";
import Draggable from "react-draggable";
import { questions } from "../../actions/action";

let categories = ["math", "chemistry", "biology", "english"];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    for (let k = 0; k < array.length; k++) {
      const l = Math.floor(Math.random() * array.length);
      [array[k], array[l]] = [array[l], array[k]];
    }
  }
  return array;
};

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

export default function SoccerQuiz() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const allQuestions = [];
  const STORAGE_KEY = `growx`;
  const savedGoals = JSON.parse(localStorage.getItem("goals")) || "[]";
  const firstGoal = savedGoals.length > 0 ? savedGoals[0] : null;
  let rightAnswer = 0;

  const handleOpen = () => {
    setOpenForm(true);
    setSubject(firstGoal.subject);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) {
      setSelectedCategory(data.selectedCategory);
      setSelectedQuestions(data.selectedQuestions);
      setCurrentQuestionIndex(data.currentQuestionIndex);
      setSelectedAnswers(data.selectedAnswers);
      setShowResults(data.showResults);
      setIncorrectQuestions(data.incorrectQuestions);
      setBookmarkedQuestions(data.bookmarkedQuestions);
    }
  }, [STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedCategory,
        selectedQuestions,
        currentQuestionIndex,
        selectedAnswers,
        showResults,
        incorrectQuestions,
        bookmarkedQuestions,
      })
    );
  }, [
    selectedCategory,
    selectedQuestions,
    currentQuestionIndex,
    selectedAnswers,
    showResults,
    incorrectQuestions,
    bookmarkedQuestions,
    STORAGE_KEY,
  ]);

  const getQuestions = async (category) => {
    setLoading(true);
    let res = await questions({
      subject: subject,
      num: numQuestions,
    });

    const quizQuestions = Object.keys(res.data.questions);
    const answer_choices = Object.values(res.data.questions);
    const answers = Object.values(res.data.answers);

    console.log("QUESTIONS->", quizQuestions);
    console.log("ANSWER CHOICES->", answer_choices);
    console.log("ANSWERS->", answers);

    setTimeout(() => {
      for (let i = 0; i < quizQuestions.length; i++) {
        if (answers[i] == "a" || answers[i] == "a)") {
          rightAnswer = 0;
        } else if (answers[i] == "b" || answers[i] == "b)") {
          rightAnswer = 1;
        } else if (answers[i] == "c" || answers[i] == "c)") {
          rightAnswer = 2;
        } else {
          rightAnswer = 3;
        }

        const qFormat = {
          question: quizQuestions[i],
          answers: answer_choices[i],
          correctAnswer: answer_choices[i][rightAnswer],
        };

        console.log("Q FORMATTTT->>>>", i, "->>", qFormat);

        allQuestions.push(qFormat);
      }

      console.log("QUESSSSTTTTTIOOOONNNNSSSSS----->", allQuestions);
      setSelectedQuestions(allQuestions);
      setLoading(false);
      setOpenForm(false);
    }, 3000);

    // setSelectedQuestions("hi");
    setSelectedQuestions(allQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIncorrectQuestions([]);
    setBookmarkedQuestions([]);
  };

  const handleRestart = () => {
    setSelectedCategory("");
    setSelectedQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIncorrectQuestions([]);
    setShowResults(false);
    setBookmarkedQuestions([]);
  };

  if (showResults) {
    return (
      <QuizReview
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedAnswers={selectedAnswers}
        selectedQuestions={selectedQuestions}
        incorrectQuestions={incorrectQuestions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        // selectRandomQuestions={selectRandomQuestions}
        handleRestart={handleRestart}
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numQuestions < 4 || numQuestions > 20) {
      setError(true);
      setHelperText(
        "Number of quetsions must be greater than 3 and less than 20"
      );
    } else {
      setError(false);
      setHelperText("");
      // selectRandomQuestions(subject);
    }
  };

  if (!currentQuestion) {
    return (
      <Grid container spacing={6} justifyContent="center" paddingTop={2}>
        {/* <Grid item xs={5}>
          <CustomCard
            title="Quiz"
            text={
              <Box
                sx={{
                  margin: "auto",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <CustomButton onClick={() => selectRandomQuestions("easy")}>
                  Easy
                </CustomButton>
                <CustomButton onClick={() => selectRandomQuestions("medium")}>
                  Medium
                </CustomButton>
                <CustomButton onClick={() => selectRandomQuestions("hard")}>
                  Hard
                </CustomButton>
              </Box>
            }
          />
        </Grid> */}
        <Grid item xs={5}>
          <CustomCard
            title="Start a new quiz"
            text={
              <Box display="flex" justifyContent="center">
                <CustomButton onClick={handleOpen}>Create quiz</CustomButton>
                <Dialog
                  open={openForm}
                  onClose={() => {
                    setOpenForm(false);
                    handleRestart();
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
                        <TextField
                          error={error}
                          helperText={helperText}
                          value={numQuestions}
                          onChange={(e) => setNumQuestions(e.target.value)}
                          label="Num of questions"
                          placeholder="e.g. 5"
                          fullWidth
                          sx={{ mb: 3 }}
                          required
                          type="number"
                        />
                      )}
                      <DialogActions
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <CustomButton onClick={getQuestions} disabled={loading}>
                          Create quiz
                        </CustomButton>
                      </DialogActions>
                    </DialogContent>
                  </Box>
                </Dialog>
              </Box>
            }
          />
        </Grid>
        {/* <Grid item xs={5}><QuizHome /></Grid> */}
      </Grid>
    );
  }

  return (
    <QuizForm
      open={open}
      setOpen={setOpen}
      currentQuestionIndex={currentQuestionIndex}
      setCurrentQuestionIndex={setCurrentQuestionIndex}
      selectedAnswers={selectedAnswers}
      setSelectedAnswers={setSelectedAnswers}
      selectedQuestions={selectedQuestions}
      setIncorrectQuestions={setIncorrectQuestions}
      setShowResults={setShowResults}
      bookmarkedQuestions={bookmarkedQuestions}
      setBookmarkedQuestions={setBookmarkedQuestions}
      selectedCategory={selectedCategory}
      handleRestart={handleRestart}
    />
  );
}
