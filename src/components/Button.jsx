import styles from "./Button.module.scss";

function Button({ onClick, type, children, color, textcolor }) {
  return (
    <button
      style={{ backgroundColor: `${color}`, color: `${textcolor}` }}
      onClick={onClick}
      className={styles[`button-${type}`]}
    >
      {children}
    </button>
  );
}

export default Button;
