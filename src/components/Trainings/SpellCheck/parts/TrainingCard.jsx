import { useCallback, useEffect, useState } from "react";

export function SpellCheckCard({ word, definition, increaseIndex }) {
  return (
    <div
      className="spell-check-card flex flex-o-vertical 
        felx-a-center flex-j-center bg-prm p-40"
    >
      <div className="text-s3">{definition}</div>
      <div></div>
    </div>
  );
}
