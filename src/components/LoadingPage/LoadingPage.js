import "./style.scss";

export function LoadingPage() {
  return (
    <div className="loading-page-wrapper bg-main-sd">
      <div>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
