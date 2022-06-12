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
    <div className="flex-item flex-item-768-1 flex flex-j-center">
      <div
        className="training-card flex flex-o-vertical flex-a-center 
          flex-j-space-between p-50 bg-prm"
      >
        <div className="training-card-word">{word}</div>
        <div className="training-card-definition flex flex-grow-1 m-t-30">
          {definition}
        </div>
        <div
          className="flex-item flex-item-1 flex flex-wrap 
            flex-j-space-between m-t-30 m-768-t-60"
        >
          {index > 0 && (
            <button
              onClick={prevCallback}
              className="flex-item flex-item-768-1 bg-prm-d bg-prm-b-hover 
                text-color-main-b text-color-main-d-hover"
            >
              Previous
            </button>
          )}
          <div className="flex-item"></div>
          {index < maxIndex && (
            <button
              onClick={nextCallback}
              className="flex-item flex-item-768-1 bg-prm-d bg-prm-b-hover 
                text-color-main-b text-color-main-d-hover m-768-t-20"
            >
              Next
            </button>
          )}
          {index === maxIndex && (
            <button
              onClick={finishCallback}
              className="flex-item flex-item-768-1 bg-prm-d bg-prm-b-hover 
                text-color-main-b text-color-main-d-hover m-768-t-20"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
