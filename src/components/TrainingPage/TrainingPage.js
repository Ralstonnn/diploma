import { Link } from "react-router-dom";
import "../../css/CommonClasses.css";
import "../../css/styles/template.scss";
import "./style.scss";

// TODO: Show definition and give couple words to choose
// TODO: Show word and let the user to choose definition
// TODO: Add training to check the word spelling
function TrainingPage() {
  return (
    <div className="flex flex-wrap flex-item m-ng-h-15 m-ng-v-20">
      <TrainingButton text="Learn" href="/training/learn-words" />
      <TrainingButton text="Repeat" href="/training/repeat-words" />
    </div>
  );
}

function TrainingButton({ href, text }) {
  return (
    <Link
      to={href}
      className="btn training-btn bg-prm-d bg-prm-hover m-h-15 m-v-10
      text-color-main-b text-color-main-d-hover"
    >
      {text}
    </Link>
  );
}

export { TrainingPage };
