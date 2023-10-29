import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Slide,
  Grow
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CheckCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 50,
  },
  card: {
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  content: {
    textAlign: "center",
  },
  button: {
    marginTop: 16,
  },
});

const Flashcard = ({ flashcards }) => {
  const classes = useStyles();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [scores, setScores] = useState([]);

  const currentCard = flashcards[currentCardIndex];

  const handleNext = (correct) => {
    if (correct) {
      setScore(score + 1)
    }
    if (currentCardIndex === flashcards.length - 1) {
      setShowCongrats(true);

      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
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

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setScore(0);
  };

  const data = {
    labels: scores.map((_, index) => `Score ${scores.length - index}`),
    datasets: [
      {
        label: "Score",
        data: scores.reverse(),
        fill: false,
        borderColor: "#4caf50",
        tension: 0.1,
      },
    ],
  };

  return (
    <Box className={classes.root}>
      {showCongrats ? (
        <Box>
          <Grow in={true}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography variant="h5">
                  Congrats! You finished with a score of {score} out of{" "}
                  {flashcards.length}!
                </Typography>

                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCongratsClose}
                  className={classes.button}
                >
                  Start Over
                </Button>
              </CardContent>
            </Card>
          </Grow>
          <Box mt={2}>
            <Line
              data={data}
            />
          </Box>
        </Box>
      ) : (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <Card className={classes.card} onClick={handleClick}>
            {!isFlipped ? (
              <CardContent className={classes.content}>
                <Typography variant="h5">{currentCard.question}</Typography>
              </CardContent>
            ) : (
              <CardContent className={classes.content}>
                <Grow in={true}><Typography variant="h5">{currentCard.answer}</Typography></Grow>
                <Grow in>
                  <Box mt={4} display="flex">
                    <Button
                      startIcon={<CheckCircleOutline sx={{ color: green[500] }} />}
                      className={classes.button}
                      variant="outlined"
                      color="success"
                      onClick={() => handleNext(true)}
                      sx={{ mr: 10 }}
                    >
                      Correct
                    </Button>
                    <Button
                      startIcon={<RemoveCircleOutline sx={{ color: 'red' }} />}
                      className={classes.button}
                      variant="outlined"
                      color="error"
                      onClick={() => handleNext(false)}
                    >
                      Incorrect
                    </Button>
                  </Box>
                </Grow>
              </CardContent>
            )}
          </Card>
        </Slide>
      )}
      {!showCongrats && (
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNext(false)}
            disabled={isFlipped}
          >
            {currentCardIndex === flashcards.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Flashcard;
