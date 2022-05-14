import { Link } from "react-router-dom";
import { LearnWords } from "../Trainings/LearnWords/LearnWords";
import "../../css/CommonClasses.css";
import "../../css/styles/template.scss";
import "./style.scss";
// import { renderIntoDocument } from "react-dom/test-utils";

function TrainingPage() {
  return (
    <div className="flex flex-gap-3 flex-wrap flex-item">
      {/* <h1 className="ml-4 mt-4">Training page</h1> */}
      <TrainingButton text="Learn" href="/training/learn-words" />
      <TrainingButton text="Repeat" href="*" />
    </div>
  );
}

function TrainingButton({ href, text }) {
  return (
    <Link to={href} className="btn training-btn">
      {text}
    </Link>
  );
}

export { TrainingPage, LearnWords };
