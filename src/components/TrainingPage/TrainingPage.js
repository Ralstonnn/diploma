import { Link } from "react-router-dom";
import "../../css/CommonClasses.css";
import "../../css/styles/template.scss";
import "./style.scss";
// import { renderIntoDocument } from "react-dom/test-utils";

function TrainingPage() {
  // TODO: Make buttons unclickable if there is no data
  // And add some alarm like "You havent added any words to learn or redirect to add words"
  return (
    <div className="flex flex-gap-3 flex-wrap flex-item">
      <TrainingButton text="Learn" href="/training/learn-words" />
      <TrainingButton text="Repeat" href="/training/repeat-words" />
    </div>
  );
}

function TrainingButton({ href, text }) {
  return (
    <Link
      to={href}
      className="btn training-btn bg-prm-d bg-prm-hover text-color-main-b text-color-main-d-hover"
    >
      {text}
    </Link>
  );
}

export { TrainingPage };
