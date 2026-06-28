import styles from "./password-rules.module.css";

interface PasswordRulesProps {
  password: string;
}

export function PasswordRules(props: PasswordRulesProps) {
  const password = props.password;

  const passwordRules = {
    minLength: (password: string) => password.length >= 8,
    upperCase: (password: string) => /[A-Z]/.test(password),
    lowerCase: (password: string) => /[a-z]/.test(password),
    number: (password: string) => /\d/.test(password),
    special: (password: string) => /[^A-Za-z0-9]/.test(password),
  };

  const passwordValidation = {
    minLength: passwordRules.minLength(password),
    upperCase: passwordRules.upperCase(password),
    lowerCase: passwordRules.lowerCase(password),
    number: passwordRules.number(password),
    special: passwordRules.special(password),
  };

  return (
    <div>
      <ul className={styles.passwordRules}>
        <li
          className={
            passwordValidation.minLength ? styles.valid : styles.invalid
          }
        >
          ✔ Al menos 8 caracteres
        </li>

        <li
          className={
            passwordValidation.upperCase ? styles.valid : styles.invalid
          }
        >
          ✔ Una mayúscula
        </li>

        <li
          className={
            passwordValidation.lowerCase ? styles.valid : styles.invalid
          }
        >
          ✔ Una minúscula
        </li>

        <li
          className={passwordValidation.number ? styles.valid : styles.invalid}
        >
          ✔ Un número
        </li>

        <li
          className={passwordValidation.special ? styles.valid : styles.invalid}
        >
          ✔ Un carácter especial
        </li>
      </ul>
    </div>
  );
}
