// TODO: Fix frontend

export function ChooseDefinitionCard({
  word,
  definition,
  getRandomWords,
  rightCallback,
  wrongCallback,
}) {
  return (
    <div
      className="choose-definition flex flex-a-center 
        flex-j-space-between p-50"
    >
      <div className="flex-item text-align-center">
        <div className="text-s3">{definition}</div>
      </div>
      <div className="flex flex-o-vertical m-l-20 flex-item-3">
        {getRandomWords.map((def, i) => (
          <button
            className="flex-item m-t-10"
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
