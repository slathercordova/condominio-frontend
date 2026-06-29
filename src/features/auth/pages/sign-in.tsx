import { useNavigate } from "react-router-dom";
import {
  forgotPasswordEP,
  loginEdificioEP,
  loginEP,
} from "../services/auth-service";
import { useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { AxiosError } from "axios";
import { misEdificiosEP } from "../services/auth-edificios";
import styles from "./sign-in.module.css";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { Alert } from "../../../common/components/ui-kit/Alert/Alert";
import { Select } from "../../../common/components/ui-kit/Select/Select";

interface EdificioInterface {
  idEdificio: string;
  nombre: string;
}

interface ErrorResponseInterface {
  success: boolean;
  message: string;
  errorCode: string;
  data: {
    password: string[];
  };
}

export function SignInPage() {
  const navigate = useNavigate();
  const setLoginSuccess = useAuthStore((state) => state.setLoginSuccess);

  //  Credenciales
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔴 Nuevo estado para guardar los errores de validación del backend
  const [erroresValidacion, setErroresValidacion] = useState<
    ErrorResponseInterface["data"] | null
  >(null);
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //  Flujo de pantalla
  const [edificios, setEdificios] = useState<EdificioInterface[]>([]);
  const [edificioSeleccionadoId, setEdificioSeleccionadoId] = useState("");
  const [tokenTemporal, setTokenTemporal] = useState("");
  const [mostrarCombo, setMostrarCombo] = useState(false);
  const [forgotPasswordFlg, setForgotPasswordFlg] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    setErrorGlobal(null);
    setErroresValidacion(null);
    setSuccessMessage(null);

    // 🔴 VALIDACIÓN FRONTEND
    if (!username.trim() || !password.trim()) {
      setErrorGlobal("Ingresa tu usuario y contraseña.");
      return;
    }

    // FASE 2: Si el combo ya está visible, el botón procesa la selección del edificio
    if (mostrarCombo) {
      if (!edificioSeleccionadoId) {
        setErrorGlobal("Debe seleccionar un edificio");
        return;
      }
      try {
        const finalResponse = await loginEdificioEP(
          edificioSeleccionadoId,
          tokenTemporal,
        );
        if (finalResponse.success) {
          setLoginSuccess(finalResponse.data); // Guardamos el token definitivo en Zustand

          if (finalResponse.data.edificioSeleccionado) {
            navigate("/landing");
          }

          /*navigate("/change-password");*/
        }
      } catch (error) {
        console.error("Error al confirmar edificio", error);
      }
      navigate("/landing");
    }

    try {
      const response = await loginEP({
        username,
        password,
      });

      if (response.success) {
        const token = response.data.accessToken;
        setTokenTemporal(token); // Guardamos el token necesario para el paso 2

        // Si el usuario ya viene con un edificio asignado por el backend por defecto deberá invocar a la segunda api automáticamente para tener los roles
        if (response.data.edificioSeleccionado) {
          setLoginSuccess(response.data);
          //if (response.data.primeraVez) navigate("/change-password");
          /*else*/ navigate("/landing");
          return;
        }

        //  Si el usuario no tiene un edificio seleccionado, entonces llamar al servicio de mis edificios
        const edificiosResponse = await misEdificiosEP(token);

        if (edificiosResponse.success && edificiosResponse.data.length > 0) {
          setEdificios(edificiosResponse.data); // Seteamos el array de edificios
          setMostrarCombo(true); // Activamos el renderizado del combo box
        } else {
          // Si el servicio no le devuelve edificios asignados
          //alert("El usuario no tiene edificios asociados.");
        }
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseInterface>;
      console.log("Error completo de Axios:", error);

      // 🔍 Verificamos si el backend nos devolvió un cuerpo de error estructurado
      if (error.response && error.response.data) {
        const cuerpoError = error.response.data;

        if (cuerpoError.errorCode === "VALIDATION_ERROR") {
          // Guardamos el mapa de errores (ej: { password: ["..."] })
          setErroresValidacion(cuerpoError.data);
        } else {
          setErrorGlobal(cuerpoError.message || "Ocurrió un error inesperado.");
        }
      } else {
        alert("Error de conexión con el servidor");
        setErrorGlobal("No hay conexión con el servidor.");
      }
    }
  };

  const handleForgotPassWord = async () => {
    setErrorGlobal(null);
    setErroresValidacion(null);
    setSuccessMessage(null);
    if (!email.trim()) {
      setErrorGlobal("Debe ingresar un correo");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorGlobal("Ingrese un correo válido.");
      return;
    }

    try {
      const response = await forgotPasswordEP({
        correo: email,
      });

      if (response.success) {
        setSuccessMessage(response.message);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseInterface>;
      console.log("Error completo de Axios:", error);

      // 🔍 Verificamos si el backend nos devolvió un cuerpo de error estructurado
      if (error.response && error.response.data) {
        const cuerpoError = error.response.data;

        if (cuerpoError.errorCode === "VALIDATION_ERROR") {
          // Guardamos el mapa de errores (ej: { password: ["..."] })
          setErroresValidacion(cuerpoError.data);
        } else {
          setErrorGlobal(cuerpoError.message || "Ocurrió un error inesperado.");
        }
      } else {
        alert("Error de conexión con el servidor");
        setErrorGlobal("No hay conexión con el servidor.");
      }
    }
  };

  const handleBackToLogin = () => {
    setForgotPasswordFlg(false);

    setErrorGlobal(null);
    setSuccessMessage(null);
    setErroresValidacion(null);
    setEmail("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* TODO: ver si importar logo */}
        {/* <img src={logo} alt="Logo" className={styles.logo} /> */}

        <h1>Sistema de Condominios</h1>

        <p className="subtitle">Inicie sesión para continuar</p>

        {errorGlobal && <Alert type="error" message={errorGlobal} />}

        {successMessage && <Alert type="success" message={successMessage} />}

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {!forgotPasswordFlg && (
            <>
              <Input
                value={username}
                onChange={setUsername}
                placeholder="Usuario"
                type="text"
                disabled={mostrarCombo}
              />

              <Input
                value={password}
                onChange={setPassword}
                placeholder="Contraseña"
                type="password"
                disabled={mostrarCombo}
              />

              {erroresValidacion?.password && (
                <Alert type="error" message={erroresValidacion.password[0]} />
              )}

              {mostrarCombo && (
                <>
                  <Select
                    label="Seleccione su edificio"
                    value={edificioSeleccionadoId}
                    onChange={setEdificioSeleccionadoId}
                    placeholder="-- Seleccione --"
                    options={edificios.map((edi) => ({
                      value: edi.idEdificio,
                      label: edi.nombre,
                    }))}
                  />
                </>
              )}

              {!mostrarCombo && (
                <Button
                  desc="¿Olvidaste tu contraseña?"
                  modo="LNK"
                  onClick={() => setForgotPasswordFlg(true)}
                  type="button"
                  title="¿Olvidaste tu contraseña?"
                />
              )}

              <Button
                desc={mostrarCombo ? "Confirmar e ingresar" : "Ingresar"}
                modo="UPD"
                onClick={handleLogin}
                type="button"
                title={mostrarCombo ? "Confirmar e ingresar" : "Ingresar"}
              />
            </>
          )}

          {forgotPasswordFlg && (
            <>
              <p className="subtitle">
                Ingresa tu correo electrónico y te enviaremos un enlace para
                restablecer tu contraseña.
              </p>

              <Input
                value={email}
                onChange={setEmail}
                placeholder="Correo electrónico"
                type="email"
              />

              <Button
                desc="Enviar enlace"
                modo="UPD"
                onClick={handleForgotPassWord}
                type="button"
                title="Enviar enlace"
              />

              <Button
                desc="Volver al inicio de sesión"
                modo="LNK"
                onClick={handleBackToLogin}
                type="button"
                title="Volver al inicio de sesión"
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}
