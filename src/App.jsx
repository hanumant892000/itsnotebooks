import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import CreateNote from "./components/CreateNotes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./contextapi/UserState";
import { useEffect } from "react";
import GuestRoute from "./components/GuestRoute.jsx";
import ProtectAuth from "./components/ProtectAuth.jsx";
import { useNotes } from "./contextapi/NotesState.jsx";

function App() {

  const { fetchProfile, isLogin } = useAuth();
  const {fetchNotes} = useNotes()

  useEffect(() => {
    fetchProfile();
    if (isLogin) {
      fetchNotes()
    }
  }, [isLogin]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<ProtectAuth><Notes /></ProtectAuth>} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
