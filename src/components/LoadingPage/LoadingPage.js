import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import "./style.scss";

export function LoadingPage() {
  return (
    <div className="loading-page-wrapper">
      <LoadingAnimation />
    </div>
  );
}
