import { CloseButton } from "../../CloseBtn/CloseBtn";

export function WordCard({
  word,
  definition,
  hideWordCard,
  wordOnChange,
  definitionOnChange,
  onWordCardSubmit,
}) {
  return (
    <div className="word-card-container flex flex-a-center flex-j-center">
      <div className="word-card-background"></div>

      <form
        onSubmit={(e) => {
          onWordCardSubmit(e);
          hideWordCard();
        }}
        className="word-card bg-prm flex flex-o-vertical flex-a-center 
        flex-j-center p-relative p-100 p-768-25"
      >
        <CloseButton callback={hideWordCard} />
        <input
          className="flex-item flex-item-1 text-s3 text-align-center"
          type="text"
          value={word}
          onChange={(e) => wordOnChange(e.target.value)}
        />
        <textarea
          className="word-card-definition flex-item flex-item-1 m-t-30 text-s5"
          value={definition}
          onChange={(e) => definitionOnChange(e.target.value)}
        />
        <button className="flex-item flex-item-768-1 m-t-30" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
