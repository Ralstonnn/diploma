// TODO: Refactor training card the way that it'll be base for all the others trainings
export function TrainingCard({
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
      <div className="flex flex-o-vertical flex-a-center flex-j-space-between training-card p-50">
        <div className="h1">{word}</div>
        <div className="flex flex-grow-1 m-t-30 definition">{definition}</div>
        <div className="flex flex-item flex-j-space-between m-t-30">
          {index > 0 && <button onClick={prevCallback}>Previous</button>}
          <div className="flex-item"></div>
          {index < maxIndex && <button onClick={nextCallback}>Next</button>}
          {index === maxIndex && (
            <button onClick={finishCallback}>Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}
