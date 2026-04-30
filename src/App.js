import { BrowserRouter, Routes, Route, Link, data } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";


function Contact() {
  return (
  <div className="container-fluid mt-3">
    <div className="bg-dark text-light p-3 rounded-4 shadow d-flex justify-content-center gap-4">
      <a href="mailto:dot42mail@gmail.com">Email</a>
      <a href="https://www.linkedin.com/in/dotun-obasa/">LinkedIn</a>
      <a href="https://github.com/placeholdername0">GitHub</a>
    </div>
  </div>
  );
}

export default function Hello() {
//set up search state
const [searchTerm, setSearchTerm] = useState("");
const [theme, setTheme] = useState("dark");
const [isOpen, setIsOpen] = useState(false);
const toggleSidebar = () => setIsOpen(!isOpen);

const cycleTheme = () => {
  setTheme((prev) => {
    if (prev === "light") return "dark";
    if (prev === "dark") return "black";
    return "light";
  });
};

  return (
    <div className={`app theme-${theme}`}>
        {/*Navigation setup, stickied topbar*/}
          <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3 sticky-top"> {/*sticky top to make it 
          stay at the top as you scroll*/}
            <span className="navbar-brand">My Portfolio</span>
            <div className="d-flex gap-3 align-items-center">
              <Link className="text-light text-decoration-none" to="/">About</Link>
              <Link className="text-light text-decoration-none" to="/skills">Skills</Link>
              <Link className="text-light text-decoration-none" to="/projects">Projects</Link>
              
              {/*filtering bar and start it immediately. attributes
              */}
              <input
                type="text"
                className="form-control ms-3"
                style={{ maxWidth: "200px" }}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/*Hamburger menu*/}
              <button className="btn btn-outline-light" onClick={toggleSidebar}>
                <FaBars />
              </button>
            </div>
          </nav>

          {/* Expandable menu */}
          <div className={`sidebar ${isOpen ? "active" : ""}`}>
            <div className="p-3 text-light">
              <h5>Menu</h5>

              <button className="btn btn-primary w-100 mt-3" onClick={cycleTheme}>
                Change Theme
              </button>

              <button className="btn btn-secondary w-100 mt-2" onClick={toggleSidebar}>
                Close
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div
            className={`sidebar-overlay ${isOpen ? "active" : ""}`}
            onClick={toggleSidebar}
          ></div>


          {/*Routing*/}
          <div style={{ paddingTop: "30px" }}>

            {/* Contact section moved above so it's always in middle */}
            <div className="container mt-3">
              <Contact />
            </div>

            {/*passing search terms in*/}
            <Routes>
              <Route path="/" element={<AboutMe searchTerm={searchTerm} />} />
              <Route path="/skills" element={<Skills searchTerm={searchTerm}/>} />
              <Route path="/projects" element={<Projects searchTerm={searchTerm}/>} />
              
            </Routes>
            </div>
    </div>
    );
}


