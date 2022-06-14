export function ChooseDefinitionCard({
  word,
  definition,
  randomWords,
  rightCallback,
  wrongCallback,
}) {
  return (
    <div
      className="choose-definition flex flex-a-center 
        flex-j-space-between flex-768-wrap p-50"
    >
      <div className="flex-item flex-item-1 text-align-center">
        <div className="choose-definition-definition text-s3">{definition}</div>
      </div>
      <div
        className="flex-item flex-item-3 flex-item-768-1 flex flex-o-vertical 
          m-l-20 m-768-l-none m-768-t-30"
      >
        {randomWords.map((def, i) => (
          <button
            className="flex-item flex-item-1 m-t-10"
            onClick={(e) => {
              if (e.target.innerHTML === word) rightCallback();
              else wrongCallback();
            }}
            key={i}
          >
            {def}
          </button>
        ))}
      </div>
    </div>
  );
}
