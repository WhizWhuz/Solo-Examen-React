import styles from "./Button.module.scss";

function Button({ onClick, type, children }) {
  return (
    <button onClick={onClick} className={styles[`button-${type}`]}>
      {children}
    </button>
  );
}

export default Button;
