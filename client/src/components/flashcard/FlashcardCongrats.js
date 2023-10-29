import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grow,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Grid,
  Divider,
} from '@mui/material';
import { CheckCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { CustomButton } from '../custom/Button';
import { useStyles } from './styles';
import CustomCard from '../custom/Card';

export default function FlashcardCongrats(props) {
  const {
    getFlashcards,
    setShowCongrats,
    setCurrentCardIndex,
    setIsFlipped,
    setScore,
    setFlashcards,
    showCongrats,
    flashcards,
    flashcardStatus,
    setOpen,
    score
  } = props;
  // const randomFlashcards = getRandomFlashcards(flashcards, 5);
  // const newFlashcards = getFlashcards()
  const classes = useStyles()

  const handleCongratsClose = () => {
    setShowCongrats(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setScore(0);
    localStorage.removeItem("soccer-flashcards-test")
  };

  const handleDifferentSet = () => {
    // setFlashcards(newFlashcards)
    setShowCongrats(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setScore(0);
    localStorage.removeItem("soccer-flashcards-test")
  };

  return (
    <React.Fragment>
      {showCongrats && (
        <Grid container spacing={4} justifyContent='space-evenly'>
          <Grid item xs={4}>
            <Grow in>
              <Card className={classes.card} sx={{ borderRadius: '6px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.4)' }}>
                <CardContent className={classes.content}>
                  <Typography variant='h5'>
                    Congrats! You finished with a score of {score} out of{' '}
                    {flashcards.length}!
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
            <Grow in>
              <Box mt={2} display='flex' justifyContent='space-between' alignItems='center'>
                <CustomButton
                  color='primary'
                  onClick={handleCongratsClose}
                  className={classes.button}
                >
                  Review Same Set
                </CustomButton>
                <CustomButton
                  color='primary'
                  onClick={handleDifferentSet}
                  className={classes.button}
                >
                  Review Different Set
                </CustomButton>
              </Box>
            </Grow>
          </Grid>
          <Grow in>
            <Grid item xs={6}>
              <CustomCard
                title='Flashcard results'
                text={
                  <Box>
                    <List>
                      {flashcards.map((card, index) => (
                        <Box key={index}>
                          <ListItem>
                            <ListItemText primary={<Box><strong>#{index + 1}. </strong>{card.question}</Box>} />
                            <ListItemIcon>
                              {flashcardStatus[index]
                                ? <Tooltip title='Correct' arrow><CheckCircleOutline sx={{ color: 'green', ml: 2 }} /></Tooltip>
                                : <Tooltip title='Incorrect' arrow><RemoveCircleOutline sx={{ color: 'red', ml: 2 }} /></Tooltip>
                              }
                            </ListItemIcon>
                          </ListItem>
                          <Divider variant='middle' />
                        </Box>
                      ))}
                    </List>
                    <CustomButton onClick={() => setOpen(true)}>Take test</CustomButton>
                  </Box>
                }
              />
            </Grid>
          </Grow>
        </Grid>
      )}
    </React.Fragment>
  )
}
