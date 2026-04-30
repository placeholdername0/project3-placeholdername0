import { skills } from "../info";
import { highlight } from "../utils/highlight";
import { useState, useEffect } from "react";


function SkillList({ items, searchTerm }) {
  return (
    <ul className="list-unstyled row">
      {items.map((skill, i) => (
        <li key={i} className="col-6 col-md-4 col-lg-3 mb-2">
          <div className="bg-secondary text-light rounded-pill px-3 py-2 text-center">
            {/*changing to add highlights*/}
            {highlight(skill, searchTerm)}
          </div>
        </li>
      ))}
    </ul>
  );
}


{/*condensed to just wrap the section*/}
export default function Skills({searchTerm}) {
  const filteredSkills = skills.filter((skill) =>
  skill.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container mt-5">
      <div className="p-4 bg-dark rounded-4 shadow text-light">
        <h1>Skills</h1>
        <SkillList items={filteredSkills} searchTerm={searchTerm} />
      </div>
    </div>
  );
}