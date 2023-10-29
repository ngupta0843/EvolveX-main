import axios from "axios";

export const questions = async (data) =>
  await axios.get(`http://127.0.0.1:5000/chatbot/${data.subject}/${data.num}/`);

export const getflashcards = async (data) =>
  await axios.get(`http://127.0.0.1:5000/flashcards/${data.subject}/${data.num}/`);

export const placement = async (data) =>
  await axios.get(`http://127.0.0.1:5000/placement/${data.subject}/`);
