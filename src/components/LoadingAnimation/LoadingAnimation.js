import "./style.scss";

export function LoadingAnimation() {
  return (
    <div className="loading-anim container-main-100 flex flex-a-center flex-j-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
