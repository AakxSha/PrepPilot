import { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [goal, setGoal] = useState("Internship Preparation");
  const [duration, setDuration] = useState("2 Months");
  const [completedWeeks, setCompletedWeeks] = useState([]);

  const roadmapData = {
    "Internship Preparation": {
      "2 Months": [
        "Programming basics & logic building",
        "Arrays & strings",
        "Linked lists & stacks",
        "Queues & recursion",
        "Trees basics",
        "Sorting & searching",
        "Mini project",
        "Mock test & revision"
      ],
      "3 Months": [
        "Programming basics",
        "Arrays & strings",
        "Linked lists",
        "Stacks & queues",
        "Trees",
        "Graphs basics",
        "Sorting & searching",
        "Recursion & backtracking",
        "Core CS basics",
        "Mini project",
        "Resume building",
        "Mock interviews"
      ],
      "6 Months": [
        "Programming fundamentals",
        "Arrays & strings",
        "Linked lists",
        "Stacks & queues",
        "Trees",
        "Graphs",
        "Sorting techniques",
        "Searching techniques",
        "Recursion",
        "Dynamic programming",
        "Operating Systems",
        "DBMS",
        "Computer Networks",
        "System design basics",
        "Mini project planning",
        "Mini project development",
        "Advanced problem solving",
        "Resume building",
        "Mock interviews",
        "Company-specific prep",
        "Revision",
        "Final mock test",
        "Interview readiness",
        "Confidence building"
      ]
    },

    "Placement Preparation": {
      "2 Months": [
        "DSA revision",
        "Advanced arrays & strings",
        "Trees & graphs",
        "Dynamic programming",
        "System design basics",
        "Mock interviews",
        "Company questions",
        "Final revision"
      ],
      "3 Months": [
        "Advanced DSA",
        "Dynamic programming",
        "Trees & graphs",
        "Operating Systems",
        "DBMS",
        "Computer Networks",
        "Low-level design",
        "High-level design",
        "Competitive programming",
        "Mock interviews",
        "Company prep",
        "Final revision"
      ],
      "6 Months": [
        "DSA fundamentals",
        "Advanced arrays",
        "Trees",
        "Graphs",
        "Dynamic programming",
        "Greedy algorithms",
        "OS deep dive",
        "DBMS deep dive",
        "Computer Networks",
        "Low-level design",
        "High-level design",
        "System scalability",
        "Competitive programming",
        "Mock interviews",
        "Company coding rounds",
        "HR prep",
        "Resume refinement",
        "Project discussion",
        "Final mock interviews",
        "Weak area improvement",
        "Offer readiness",
        "Confidence building",
        "Final placement readiness"
      ]
    },

    "Skill Building": {
      "2 Months": [
        "Tool setup & basics",
        "Core concepts",
        "Hands-on practice",
        "Mini project",
        "Debugging skills",
        "Advanced concepts",
        "Project improvement",
        "Portfolio update"
      ],
      "3 Months": [
        "Foundations",
        "Core concepts",
        "Hands-on practice",
        "Mini project planning",
        "Mini project development",
        "Advanced topics",
        "Optimization",
        "Testing",
        "Deployment",
        "Portfolio building",
        "Revision",
        "Showcase prep"
      ],
      "6 Months": [
        "Foundations",
        "Core concepts",
        "Hands-on practice",
        "Mini project 1",
        "Advanced concepts",
        "Mini project 2",
        "Debugging & optimization",
        "Framework learning",
        "Advanced frameworks",
        "System integration",
        "Testing techniques",
        "Deployment",
        "Version control mastery",
        "Collaboration skills",
        "Portfolio refinement",
        "Open-source contribution",
        "Advanced project",
        "Performance tuning",
        "Security basics",
        "Final project polish",
        "Showcase preparation",
        "Feedback incorporation",
        "Skill mastery",
        "Career readiness"
      ]
    }
  };

  const weeks = roadmapData[goal][duration];

  const toggleWeek = (index) => {
    if (completedWeeks.includes(index)) {
      setCompletedWeeks(completedWeeks.filter((i) => i !== index));
    } else {
      setCompletedWeeks([...completedWeeks, index]);
    }
  };

  const progress = Math.round(
    (completedWeeks.length / weeks.length) * 100
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("PrepPilot Roadmap", 10, 10);

    doc.setFontSize(12);
    doc.text(`Goal: ${goal}`, 10, 20);
    doc.text(`Duration: ${duration}`, 10, 30);

    let y = 40;

    weeks.forEach((topic, index) => {
      doc.text(`Week ${index + 1}: ${topic}`, 10, y);
      y += 8;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("PrepPilot_Roadmap.pdf");
  };

  return (
    <div className="app-container">
      <h1>PrepPilot 🚀</h1>
      <p className="subtitle">AI-Based Custom Roadmap Generator</p>

      <label>Goal</label>
      <select
        value={goal}
        onChange={(e) => {
          setGoal(e.target.value);
          setCompletedWeeks([]);
        }}
      >
        <option>Internship Preparation</option>
        <option>Placement Preparation</option>
        <option>Skill Building</option>
      </select>

      <label>Duration</label>
      <select
        value={duration}
        onChange={(e) => {
          setDuration(e.target.value);
          setCompletedWeeks([]);
        }}
      >
        <option>2 Months</option>
        <option>3 Months</option>
        <option>6 Months</option>
      </select>

      <h2 className="roadmap-title">Your Roadmap</h2>

      <button onClick={downloadPDF} style={{ marginBottom: "15px" }}>
        Download Roadmap as PDF
      </button>

      <div className="progress-box">
        Progress: <strong>{progress}%</strong>
      </div>

      {weeks.map((topic, index) => (
        <div key={index} className="week-card">
          <input
            type="checkbox"
            checked={completedWeeks.includes(index)}
            onChange={() => toggleWeek(index)}
          />
          <span>
            <strong>Week {index + 1}:</strong> {topic}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
