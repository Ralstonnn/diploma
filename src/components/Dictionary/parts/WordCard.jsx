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
        flex-j-center p-relative p-100 "
      >
        <CloseButton callback={hideWordCard} />
        <input
          className="flex-item text-s3 text-align-center"
          type="text"
          value={word}
          onChange={(e) => wordOnChange(e.target.value)}
        />
        <textarea
          className="word-card-definition flex-item m-t-30 text-s5"
          value={definition}
          onChange={(e) => definitionOnChange(e.target.value)}
        />
        <button className="m-t-30" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
