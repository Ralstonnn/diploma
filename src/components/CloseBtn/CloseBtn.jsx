import "./style.scss";

export function CloseButton({ callback, style }) {
  return <div className="close-btn" onClick={callback} style={style} />;
}
