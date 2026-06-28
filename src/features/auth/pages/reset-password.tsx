import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordEP } from "../services/auth-service";
import type { AxiosError } from "axios";
import type {
  ApiResponse,
  ValidationErrors,
} from "../../../common/types/api-response";
import styles from "./reset-password.module.css";
import { PasswordRules } from "../../../common/components/password-rules";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");

  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [erroresValidacion, setErroresValidacion] =
    useState<ValidationErrors | null>(null);

  const [cambioContrasenaOk, setCambioContrasenaOk] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!cambioContrasenaOk) {
      handleChangePassword();
    } else {
      irLogin();
    }
  };

  const irLogin = () => {
    navigate("/login");
  };

  const handleChangePassword = async () => {
    setErrorGlobal(null);
    setErroresValidacion(null);
    setSuccessMessage(null);

    if (!token) {
      setErrorGlobal("No se encontró token");
      return;
    }

    if (!password) {
      setErrorGlobal("Debe ingresar una contraseña válida");
      return;
    }

    try {
      const response = await resetPasswordEP({
        token,
        password,
      });

      if (response.success) {
        setSuccessMessage(response.message);
        // mandar al login
        setCambioContrasenaOk(true);

        setTimeout(() => {
          irLogin();
        }, 3000);
      }
    } catch (err) {
      const error = err as AxiosError<ApiResponse<unknown>>;
      console.log("Error completo de Axios:", error);

      const data = error.response?.data;

      // 🔍 Verificamos si el backend nos devolvió un cuerpo de error estructurado
      if (data) {
        setErrorGlobal(data.message);

        if (data.errorCode === "VALIDATION_ERROR") {
          // Guardamos el mapa de errores (ej: { password: ["..."] })
          setErroresValidacion(data.data as ValidationErrors);
        } else {
          setErrorGlobal(data.message || "Ocurrió un error inesperado.");
        }
      } else {
        alert("Error de conexión con el servidor");
        setErrorGlobal("No hay conexión con el servidor.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Restablecer contraseña</h1>

        <p className={styles.subtitle}>
          Ingresa tu nueva contraseña para continuar
        </p>

        {errorGlobal && <div className="alert-error">{errorGlobal}</div>}

        {erroresValidacion &&
          Object.entries(erroresValidacion).map(([field, errors]) => (
            <div className="alert-error">
              <ul>
                {errors.map((err, i) => (
                  <li key={`${field}-${i}`} style={{ color: "orange" }}>
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {successMessage && (
          <div className="alert-success">{successMessage}</div>
        )}

        {!cambioContrasenaOk && (
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button className="btn btn-primary" type="button" onClick={handleClick}>
          {!cambioContrasenaOk ? "Cambiar contraseña" : "Ir a login"}
        </button>

        <PasswordRules password={password}/>

        {cambioContrasenaOk && (
          <p className={styles.redirectText}>
            Redirigiendo al login en 3 segundos...
          </p>
        )}
      </div>
    </div>
  );
}
