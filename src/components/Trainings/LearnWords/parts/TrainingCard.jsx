export function TrainingCardLearnWords({
  word,
  definition,
  prevCallback,
  nextCallback,
  finishCallback,
  index,
  maxIndex,
}) {
  return (
    <div className="flex flex-j-center flex-item">
      <div className="flex flex-o-vertical flex-a-center flex-j-space-between training-card p-50 bg-prm">
        <div className="training-card-word">{word}</div>
        <div className="training-card-definition flex flex-grow-1 m-t-30">
          {definition}
        </div>
        <div className="flex-item flex-item-1 flex flex-j-space-between m-t-30">
          {index > 0 && (
            <button
              onClick={prevCallback}
              className="bg-prm-d bg-prm-b-hover text-color-main-b text-color-main-d-hover"
            >
              Previous
            </button>
          )}
          <div className="flex-item"></div>
          {index < maxIndex && (
            <button
              onClick={nextCallback}
              className="bg-prm-d bg-prm-b-hover text-color-main-b text-color-main-d-hover"
            >
              Next
            </button>
          )}
          {index === maxIndex && (
            <button
              onClick={finishCallback}
              className="bg-prm-d bg-prm-b-hover text-color-main-b text-color-main-d-hover"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
