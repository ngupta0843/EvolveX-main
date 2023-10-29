import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  tooltipClasses
} from '@mui/material';
import { CustomButton } from '../custom/Button';
import { styled } from '@mui/styles';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: '6px',
    padding: theme.spacing(2),
    border: '2px solid grey',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    fontSize: 20,
    color: theme.palette.common.white,
    "&:before": {
      border: "2px solid grey"
    },
  },
}));

const generateFlashcardQuiz = (cards) => {
  const quiz = [];

  // Generate quiz questions and multiple-choice answers
  for (const flashcard of cards) {
    const answers = [flashcard.answer];
    while (answers.length < 4) {
      const answerIndex = Math.floor(Math.random() * cards.length);
      const answer = cards[answerIndex].answer;
      if (!answers.includes(answer)) {
        answers.push(answer);
      }
    }
    quiz.push({
      question: flashcard.question,
      answer: flashcard.answer,
      answers: answers,
      selectedAnswer: null,
    });
  }

  return quiz;
}

export default function FlashcardQuiz({ flashcards }) {
  const [quiz, setQuiz] = useState(generateFlashcardQuiz(flashcards));
  const [submitted, setSubmitted] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const STORAGE_KEY = `soccer-flashcards-test`;
  const questionRefs = useRef([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) {
      setQuiz(data.quiz);
      setSubmitted(data.submitted);
      setIncorrectQuestions(data.incorrectQuestions);
    }
  }, [STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        quiz,
        submitted,
        incorrectQuestions
      }));
  }, [
    quiz,
    submitted,
    incorrectQuestions,
    STORAGE_KEY
  ]);

  const handleAnswerChange = (index, answer) => {
    const newQuiz = [...quiz];
    newQuiz[index].selectedAnswer = answer;
    setQuiz(newQuiz);

    // Scroll to the next question after an answer is selected
    if (index < quiz.length - 1) {
      questionRefs.current[index + 1].scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true);

    let incorrect = [];
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i].selectedAnswer !== quiz[i].answer) {
        incorrect.push(i)
      }
    }
    setIncorrectQuestions(incorrect);
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    const date = new Date().toISOString();
    const cards = quiz.slice(0, 5);
    scores.push({ score, date, cards });
    localStorage.setItem('quizScores', JSON.stringify(scores));

    // scores.slice(-5).forEach((score, index) => {
    //   console.log(`Score ${index + 1}: ${score.score}`);
    //   console.log(`Date: ${score.date}`);
    //   console.log(`Flashcards:`);
    //   score.flashcards.forEach((flashcard) => {
    //     console.log(`- ${flashcard.question} (${flashcard.answer})`);
    //   });
    // });
  };

  let score = 0;
  for (const flashcard of quiz) {
    if (flashcard.selectedAnswer === flashcard.answer) {
      score++;
    }
  }
  return (
    <React.Fragment>
      {submitted && (
        <Grid container spacing={4} justifyContent={incorrectQuestions.length === 1 ? 'center' : 'normal'}>
          <Typography px={4} mt={3} textAlign='center'>Congrats! You've finished your flashcard based test with a score of <strong>{score} / {quiz.length} ({score * 100 / quiz.length}%)</strong>. Here are the questions that you missed:  </Typography>
          {incorrectQuestions.map((incorrectIndex, index) => (
            <Grid item xs={6}>
              <LightTooltip
                arrow
                title={
                  <Box>
                    <Typography sx={{ color: 'grey' }} mb={1}>#{incorrectIndex + 1}. {quiz[incorrectIndex].question}</Typography>
                    <FormControl component='fieldset' sx={{ mb: 2 }}>
                      <RadioGroup value={quiz[incorrectIndex].selectedAnswer}>
                        {quiz[incorrectIndex].answers.map((answer, answerIndex) => (
                          <FormControlLabel
                            key={answerIndex}
                            value={answer}
                            label={answer}
                            sx={[
                              { color: 'grey' },
                              (answer === quiz[incorrectIndex].answer) && {
                                color: 'green'
                              },
                              (answer === quiz[incorrectIndex].selectedAnswer) && {
                                color: 'red'
                              }
                            ]}
                            control={
                              <Radio
                                sx={[
                                  (quiz[incorrectIndex].selectedAnswer) && {
                                    '&.Mui-checked': {
                                      color: 'red'
                                    }
                                  },
                                  (answer === quiz[incorrectIndex].answer) && {
                                    color: 'green'
                                  }
                                ]}
                              />
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                }
              >
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '2px solid black',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    minHeight: '100%',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.5s ease',
                    '&:hover': {
                      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.3)',
                    }
                  }}
                >
                  <strong>#{incorrectIndex + 1}:</strong> {quiz[incorrectIndex].question}:
                  <Divider sx={{ my: 1, border: '0.5px solid black' }} />
                  <span style={{ color: 'red' }}>{quiz[incorrectIndex].selectedAnswer ? (
                    <div>
                      <strong>You said:</strong> {quiz[incorrectIndex].selectedAnswer}
                    </div>
                  ) : (
                    <div>
                      <strong>You said: </strong>No Answer Selected
                    </div>
                  )}
                  </span>
                  <span style={{ color: 'green' }}>
                    <strong>Correct answer: </strong>
                    {quiz[incorrectIndex].answer}
                  </span>
                </Box>
              </LightTooltip>
            </Grid>
          ))}
        </Grid>
      )}
      {!submitted && (
        <form onSubmit={handleSubmit}>
          {quiz.map((flashcard, index) => (
            <div key={index} ref={el => questionRefs.current[index] = el}>
              <Typography fontWeight='bold' mb={1}>#{index + 1}. {flashcard.question}</Typography>
              <FormControl component='fieldset' sx={{ mb: 2 }}>
                <RadioGroup value={flashcard.selectedAnswer} onChange={(event) => handleAnswerChange(index, event.target.value)}>
                  {flashcard.answers.map((answer, answerIndex) => (
                    <FormControlLabel
                      key={answerIndex}
                      value={answer}
                      control={<Radio />}
                      label={answer}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
          <CustomButton type='submit'>Submit</CustomButton>
        </form>
      )
      }
    </React.Fragment >
  );
}



