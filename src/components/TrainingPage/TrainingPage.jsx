import { Link } from "react-router-dom";
import "../../css/styles/template.scss";
import "./style.scss";

function TrainingPage() {
  return (
    <div className="flex flex-wrap flex-item m-ng-h-15 m-ng-v-20">
      <TrainingButton text="Learn" href="/training/learn-words" />
      <TrainingButton text="SpellCheck" href="/training/spell-check" />
      <TrainingButton
        text="ChooseDefinition"
        href="/training/choose-word-by-definition"
      />
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
