import { useNavigate } from "react-router-dom";
import { loginEdificioEP, loginEP } from "../services/auth-service";
import { useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { AxiosError } from "axios";
import { misEdificiosEP } from "../services/auth-edificios";

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

  //  Flujo de pantalla
  const [edificios, setEdificios] = useState<EdificioInterface[]>([]);
  const [edificioSeleccionadoId, setEdificioSeleccionadoId] = useState("");
  const [tokenTemporal, setTokenTemporal] = useState("");
  const [mostrarCombo, setMostrarCombo] = useState(false);

  const handleLogin = async () => {
    setErrorGlobal(null);
    setErroresValidacion(null);

    // 🔴 VALIDACIÓN FRONTEND (Tu primera línea de defensa):
    if (!username.trim() || !password.trim()) {
      setErrorGlobal("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    // FASE 2: Si el combo ya está visible, el botón procesa la selección del edificio
    if (mostrarCombo) {
      if (!edificioSeleccionadoId) {
        setErrorGlobal("Debe seleccionar un edificio")
        return;
      }
      try {
        const finalResponse = await loginEdificioEP(edificioSeleccionadoId,tokenTemporal);
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
          setErrorGlobal(cuerpoError.message);
          //alert(cuerpoError.message || "Error al iniciar sesión");
          setErrorGlobal(cuerpoError.message || "Ocurrió un error inesperado.");
        }
      } else {
        alert("Error de conexión con el servidor");
        setErrorGlobal("No hay conexión con el servidor.");
      }
    }
  };

  return (
    <div>
      <p>Sign in</p>

      {/* 🚨 Mensaje de error GLOBAL (Aparece arriba si la clave está mal o si están vacíos) */}
      {errorGlobal && (
        <div style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
          {errorGlobal}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="user"
          disabled={mostrarCombo}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          disabled={mostrarCombo}
        />

        {/* 🚨 Mensaje de error ESPECÍFICO (Solo aparece si el backend rechaza el formato) */}
        {erroresValidacion?.password && (
          <div style={{ color: "orange", fontSize: "12px", marginTop: "5px" }}>
            {erroresValidacion.password[0]}{" "}
            {/* Muestra el primer error de la lista */}
          </div>
        )}

        {/* El Combo Box aparece mágicamente abajo de los campos solo si se requiere */}
        {mostrarCombo && (
          <div style={{ marginTop: "15px", marginBottom: "15px" }}>
            <p>Selecciona tu edificio</p>
            <select
              value={edificioSeleccionadoId}
              onChange={(e) => setEdificioSeleccionadoId(e.target.value)}
            >
              <option value="">-- Seleccione su edificio --</option>
              {edificios.map((edi) => (
                <option key={edi.idEdificio} value={edi.idEdificio}>
                  {edi.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="button" onClick={handleLogin}>
          {mostrarCombo ? "Confirmar e ingresar" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
