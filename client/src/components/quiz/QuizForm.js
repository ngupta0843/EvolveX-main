import React from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { Bookmark, BookmarkBorder, RestartAlt } from '@mui/icons-material';
import { CustomButton } from '../custom/Button'
import CustomCard from '../custom/Card'
import CustomIcon from '../custom/IconButton';
import ReviewDialog from './ReviewDialog';

export default function QuizForm(props) {
  const {
    width,
    open,
    setOpen,
    currentQuestionIndex,
    selectedAnswers,
    setSelectedAnswers,
    selectedQuestions,
    setIncorrectQuestions,
    setShowResults,
    setCurrentQuestionIndex,
    bookmarkedQuestions,
    setBookmarkedQuestions,
    selectedCategory,
    handleRestart
  } = props;
  const selectedAnswer = selectedAnswers[currentQuestionIndex] || '';
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const notLastQuestion = currentQuestionIndex < selectedQuestions.length - 1;

  const handleOpen = () => {
    setOpen(true)
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers(prevSelectedAnswers => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = answer;
      return newSelectedAnswers;
    });
  };

  const handleBookmarkToggle = () => {
    if (!bookmarkedQuestions.includes(currentQuestionIndex)) {
      setBookmarkedQuestions([...bookmarkedQuestions, currentQuestionIndex]);
    } else {
      setBookmarkedQuestions(
        bookmarkedQuestions.filter((index) => index !== currentQuestionIndex)
      );
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  return (
    <Box sx={{ width: width ? width : '50%', margin: 'auto' }}>
      <CustomCard
        title={`Question number: ${currentQuestionIndex + 1}`}
        action={
          <Box display='flex' justifyContent='center'>
            <CustomIcon
              onClick={handleBookmarkToggle}
              icon={
                bookmarkedQuestions.includes(currentQuestionIndex)
                  ? <Bookmark />
                  : <BookmarkBorder />
              }
            />
            <CustomIcon onClick={handleRestart} icon={<RestartAlt />} />
          </Box>
        }
        text={
          <Box>
            <FormControl variant='filled'>
              <FormLabel id='demo-error-radios'>{currentQuestion.question}</FormLabel>
              <RadioGroup
                aria-label='answer'
                name='answer'
                value={selectedAnswer}
                onChange={(e) => handleAnswerSelection(e.target.value)}
              >
                {currentQuestion.answers.map((answer, i) => (
                  <FormControlLabel
                    key={i}
                    value={answer}
                    control={<Radio />}
                    label={answer}
                  />
                ))}
              </RadioGroup>
              <Box sx={{ height: '100%' }}>
                {currentQuestionIndex > 0 && (
                  <CustomButton
                    onClick={handlePreviousQuestion}
                    sx={{
                      mr: 3
                    }}
                  >
                    Previous
                  </CustomButton>
                )}
                {notLastQuestion ? (
                  <CustomButton onClick={handleNextQuestion}>
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton onClick={handleOpen}>
                    Submit
                  </CustomButton>
                )}
              </Box>
            </FormControl>
            {!notLastQuestion && (
              <ReviewDialog
                open={open}
                setOpen={setOpen}
                selectedAnswers={selectedAnswers}
                selectedQuestions={selectedQuestions}
                bookmarkedQuestions={bookmarkedQuestions}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setShowResults={setShowResults}
                setIncorrectQuestions={setIncorrectQuestions}
                selectedCategory={selectedCategory}
              />
            )}
          </Box>
        }
      />
    </Box>
  )
}
