export function Item({ word, definition, showWordCard, setCardConfig }) {
  const postHandler = () => {
    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
      }),
    };

    fetch("/api/delete-word", formData);
  };

  return (
    <div
      className="dictionary-item flex-item flex-item-768-1 flex flex-j-space-between 
        flex-a-center flex-768-wrap border-round-tiny bg-prm text-color-main-d"
    >
      <div
        className="dictionary-item-content flex-item flex-item-1 
          bg-prm-b-hover p-20"
        onClick={() => {
          showWordCard();
          setCardConfig(word, definition);
        }}
      >
        <div className="flex-item flex-item-768-1 text-768-align-center">
          <h4>{word}</h4>
        </div>
        <div className="m-t-10 m-768-t-30 text-768-align-center">
          {definition}
        </div>
      </div>
      <form
        onSubmit={postHandler}
        className="flex-item flex-item-768-1 flex flex-768-j-center p-20"
      >
        <button
          className="dictionary-delete-btn flex-item flex-item-768-1 bg-prm-d 
            bg-prm-b-hover text-color-main-b text-color-main-d-hover"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
