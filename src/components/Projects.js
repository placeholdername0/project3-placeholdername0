import {highlight} from "../utils/highlight";
import {projects} from "../info";
import { useState, useEffect } from "react";


{/*card visual setup*/}
function ProjectCard({ project, isOpen, onClick, searchTerm }) {


  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div
        className="p-3 bg-secondary rounded-4 h-100 project-card"
        onClick={onClick}
      >
        {/*only show image if project isn't github link*/}
        {project.image &&  !project.link &&(
        <img
          src={project.image}
          alt={project.title}
          className="img-fluid rounded mb-3 project-img"
        />
        )}

        <h5>{highlight(project.title, searchTerm)}</h5>
        <div className={`project-desc ${isOpen ? "open" : ""}`}>
          <p>{highlight(project.description, searchTerm)}</p>

          {project.language && (
            <p className="mt-2">
              <strong>Language:</strong> {project.language}
            </p>
          )}

          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

{/*card functionality*/}
export default function Projects({searchTerm}) {
  const [openIndex, setOpenIndex] = useState(null);
  const [gitProjects, setGitProjects] = useState([]);


  {/*check if project has github in its repo so you can automatically mark it*/}
  const isGitHub = (project) => project.link?.includes("github.com");
  
  {/*states for repo modal*/}
  const [selectedProject, setSelectedProject] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);

  const openProject = (project) => {
    setSelectedProject(project);

    if (isGitHub(project)) {
      fetch(`https://api.github.com/repos/${project.fullName}`)
        .then(res => res.json())
        .then(data => setRepoDetails(data));
    }
  };

  {/*use effect to fetch data*/}
  useEffect(() => {
    fetch("https://api.github.com/users/placeholdername0/repos")
    .then(response => response.json())
    .then(data => {
    const formatted = data.slice(0, 5).map(repo => ({
      title: repo.name,
      description: repo.description || "No Description",
      image: null,
      language: repo.language || "Unknown",
      link: repo.html_url,
      fullName: repo.full_name
    }));

      setGitProjects(formatted);
    });
  }, []);

  //compile all projects together
  const allProjects = [...projects, ...gitProjects]

  const filteredProjects = allProjects.filter((project) => 
    project.title.toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    project.description.toLowerCase().includes((searchTerm || "").toLowerCase())
);




  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="p-4 bg-dark rounded-4 shadow text-light">
          <h1>Projects</h1>

          <div className="row">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                isOpen={openIndex === index}
                onClick={() => openProject(project)}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL (Step 4/5 lives here) */}
      {selectedProject && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => {
            setSelectedProject(null);
            setRepoDetails(null);
          }}
        >
          <div className="modal-dialog modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-content bg-dark text-light p-3">

              <h4>{selectedProject.title}</h4>

              {isGitHub(selectedProject) ? (
                repoDetails ? (
                  <>
                    <p>{repoDetails.description}</p>

                    <p>Stargazers: {repoDetails.stargazers_count}</p>
                    <p>Watchers:  {repoDetails.watchers_count}</p>
                    <p>Open issues:  {repoDetails.open_issues_count}</p>
                    <p>Forks:  {repoDetails.forks_count}</p>

                    <p>Language:  {repoDetails.language}</p>

                    <a
                      href={repoDetails.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-light"
                    >
                      View on GitHub
                    </a>
                  </>
                ) : (
                  <p>Loading...</p>
                )
              ) : (
                <>
                  {selectedProject.image && (
                    <img
                      src={selectedProject.image}
                      className="img-fluid mb-3"
                    />
                  )}
                  <p>{selectedProject.description}</p>
                </>
              )}

              <button
                className="btn btn-light mt-3"
                onClick={() => {
                  setSelectedProject(null);
                  setRepoDetails(null);
                }}
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}