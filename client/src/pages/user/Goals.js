import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Alert,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CustomIcon from "../../components/custom/IconButton";
import CustomDialog from "../../components/custom/Dialog";
import { CustomButton } from "../../components/custom/Button";
import CustomCard from "../../components/custom/Card";

const levels = ["Average", "Above Average", "Excellent", "Master"];

export default function SubjectGoals() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [savedGoals, setSavedGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );
  const [error, setError] = useState(null);

  const handleCreate = () => {
    const exists = savedGoals.some(
      (goal) => goal.subject.toLowerCase() === subject.toLowerCase()
    );
    if (exists) {
      setError(`A goal for "${subject}" already exists.`);
      return;
    }
    const goals = [...savedGoals];
    goals.push({ subject, level });
    localStorage.setItem("goals", JSON.stringify(goals));
    setSavedGoals(goals);
    setOpen(false);
    setError(null);
    setSubject("");
    setLevel("");
  };

  const handleEdit = () => {
    const exists = savedGoals.some(
      (goal) => goal.subject.toLowerCase() === subject.toLowerCase()
    );
    if (exists) {
      setError(`A goal for "${subject}" already exists.`);
      return;
    }
    const goals = [...savedGoals];
    goals[editIndex] = { subject, level };
    localStorage.setItem("goals", JSON.stringify(goals));
    setSavedGoals(goals);
    setEditOpen(false);
    setSubject("");
    setLevel("");
  };

  const handleDelete = (index) => {
    const goals = [...savedGoals];
    goals.splice(index, 1);
    localStorage.setItem("goals", JSON.stringify(goals));
    setSavedGoals(goals);
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setSubject(savedGoals[index].subject);
    setLevel(savedGoals[index].level);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditIndex(null);
    setSubject("");
    setLevel("");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const goals = [...savedGoals];
    const [removed] = goals.splice(result.source.index, 1);
    goals.splice(result.destination.index, 0, removed);
    localStorage.setItem("goals", JSON.stringify(goals));
    setSavedGoals(goals);
  };

  return (
    <React.Fragment>
      <CustomCard
        title="Goals"
        action={<CustomIcon onClick={() => setOpen(true)} icon={<Add />} />}
        text={
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="goals">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {!savedGoals.length && (
                    <Typography>
                      You haven't created any goals yet, click the{" "}
                      <strong>Plus</strong> icon at the top to create one.{" "}
                    </Typography>
                  )}
                  <div>
                    {savedGoals.map((goal, index) => (
                      <Draggable
                        key={index}
                        draggableId={`goal-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              secondaryAction={
                                <>
                                  <IconButton
                                    onClick={() => handleEditOpen(index)}
                                  >
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleDelete(index)}
                                  >
                                    <Delete />
                                  </IconButton>
                                </>
                              }
                            >
                              <ListItemText
                                primary={goal.subject}
                                secondary={goal.level}
                              />
                            </ListItem>
                            <Divider />
                          </>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        }
      />
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="Add Goal"
        action={<CustomButton onClick={handleCreate}>Save</CustomButton>}
        actionDivider
        divider
        center
      >
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Autocomplete
          options={levels}
          value={level}
          onChange={(event, newValue) => {
            setLevel(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Level" />}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </CustomDialog>
      <CustomDialog
        open={editOpen}
        setOpen={handleEditClose}
        title="Edit Goal"
        action={<CustomButton onClick={handleEdit}>Save</CustomButton>}
        actionDivider
        divider
        center
      >
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Autocomplete
          options={levels}
          value={level}
          onChange={(event, newValue) => {
            setLevel(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Level" />}
        />
      </CustomDialog>
    </React.Fragment>
  );
}
