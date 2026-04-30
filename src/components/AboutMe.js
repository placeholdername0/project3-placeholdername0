import { useState, useEffect } from "react";

export default function AboutMe() {
  const [gitUser, setGitUser] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/placeholdername0")
      .then(response => response.json())
      .then(data => {
        setGitUser(data);
      });
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="p-4 bg-dark rounded-4 shadow text-light mb-4">
            <h2>About Me</h2>
            <p>
              General curious software developer aiming to make things that are either entertaining or useful. 
              Using as many skills as I have to time to get or learn, I'm always interested in learning more.
              I am available for freelance work and plan to work on music eventually as well.
            </p>
          </div>

          {gitUser && (
            <div className="mt-4 p-3 bg-secondary rounded-3 text-center">
              
              {/* avatar image */}
              <img
                src={gitUser.avatar_url}
                alt="GitHub Avatar"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px" }}
              />

              {/* name portion */}
              <h5>{gitUser.name || gitUser.login}</h5>

              {/* bio */}
              {gitUser.bio && <p>{gitUser.bio}</p>}

              {/* stats listing */}
              <div className="d-flex justify-content-center gap-4 mt-3">
                <div>
                  <strong>{gitUser.followers}</strong>
                  <div>Followers</div>
                </div>

                <div>
                  <strong>{gitUser.public_repos}</strong>
                  <div>Repos</div>
                </div>

                <div>
                  <strong>{gitUser.public_gists}</strong>
                  <div>Gists</div>
                </div>
              </div>

              {/* link to git profile */}
              <a
                href={gitUser.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light mt-3"
              >
                View GitHub Profile
              </a>

            </div>
          )}

          {/*fun facts i guess */}
          <div className="p-4 bg-dark rounded-4 shadow text-light">

            <h2 className="mb-3">Fun Facts</h2>

            <div className="row text-center">

              <div className="col-md-4 mb-3">
                <div className="display-6 fw-bold">🎮</div>
                <div className="fs-5">Game Dev</div>
                <div className="text">Currently building a game for my thesis in Unity</div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="display-6 fw-bold">🎨</div>
                <div className="fs-5">Artist</div>
                <div className="text">I do 2D + 3D design work</div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="display-6 fw-bold">⚙️</div>
                <div className="fs-5">Engineer</div>
                <div className="">I've dabbled in a lot of systems & backend logic</div>
              </div>

                {/* key highlights */}
                <div className="p-4 bg-dark rounded-4 shadow text-light mt-4">

                  <h2 className="mb-3">Key Highlights</h2>

                  <div className="fs-5">

                  <div className="p-4 bg-dark rounded-4 shadow text-light mt-4">


                  <ul className="fs-5">
                    <li className="mb-2">
                      Been programming since I was 13, starting with Lua.
                    </li>

                    <li className="mb-2">
                      I started learning programming completely on my own before going to college.
                    </li>

                    <li className="mb-2">
                      I have years of general experience working with computers, systems, and software.
                    </li>
                  </ul>

                </div>
                  </div>

                </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
