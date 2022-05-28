import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { SpellCheckCard } from "./parts/TrainingCard";
import "./style.scss";

export function SpellCheck() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/spell-check")
      .then((resp) => resp.json())
      .then((res) => {
        if (res.length === 0) {
          alert("There is no words to learn");
          return navigate("/training");
        }

        setIsLoading(false);
      });
  }, [navigate]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="spell-check-container flex-item flex flex-j-center">
      <SpellCheckCard />
    </div>
  );
}
