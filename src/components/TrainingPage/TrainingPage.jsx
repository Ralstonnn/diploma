import { Link } from "react-router-dom";
import "../../css/styles/template.scss";
import "./style.scss";

function TrainingPage() {
  return (
    <div
      className="flex flex-wrap flex-item m-ng-h-15 m-ng-v-20 
        m-768-h-none m-768-ng-v-5"
    >
      <TrainingButton text="Learn" href="/training/learn-words" />
      <TrainingButton text="Spell Check" href="/training/spell-check" />
      <TrainingButton
        text="Choose Word"
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
      className="flex-item flex-item-768-1 btn training-btn bg-prm-d 
        bg-prm-hover m-h-15 m-v-10 m-768-h-none m-768-v-5 
        text-color-main-b text-color-main-d-hover text-nowrap"
    >
      {text}
    </Link>
  );
}

export { TrainingPage };
