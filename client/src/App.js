import { ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Dashboard } from "./pages/user/Dashboard";
import { theme } from "./theme";
import "./App.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quiz from "./components/quiz/Quiz";
import Flashcard from "./components/flashcard/FlashCard";
import { Box } from "@mui/material";
import Placement from "./components/placement/Quiz";
import EditService from "./pages/user/services/EditService";
import ViewService from "./pages/user/services/ViewService";
import NewService from "./pages/user/services/NewService";
import MentorDashboard from "./pages/user/MentorDashboard";
import ViewMentees from "./ViewMentees";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} />
      <ThemeProvider theme={theme}>
        {/* <Box sx={{ mb: 4 }}> */}
        <Header />
        {/* </Box> */}
        {/* <Box sx={{ px: 9 }}> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/services/new" element={<NewService />} />
          <Route path="/service/edit/:serviceId" element={<EditService />} />
          <Route path="/service/:serviceId" element={<ViewService />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/view-mentees" element={<ViewMentees />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
