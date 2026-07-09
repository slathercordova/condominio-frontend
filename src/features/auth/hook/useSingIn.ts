import { useState } from "react";
import {
  forgotPasswordEP,
  loginEdificioEP,
  loginEP,
} from "../services/auth-service";
import { useAuthStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../../common/security/handleApiError";
import { misEdificiosEP } from "../services/auth-edificios";

interface EdificioInterface {
  idEdificio: string;
  nombre: string;
}

export function useSingIn() {
  const navigate = useNavigate();
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);

  const [erroresValidacion, setErroresValidacion] = useState<Error | null>(
    null,
  );

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const setLoginSuccess = useAuthStore((state) => state.setLoginSuccess);

  //  Flujo de pantalla
  const [mostrarCombo, setMostrarCombo] = useState(false);
  const [tokenTemporal, setTokenTemporal] = useState("");
  const [edificios, setEdificios] = useState<EdificioInterface[]>([]);

  //  Forgot Password
  const [forgotPasswordFlg, setForgotPasswordFlg] = useState(false);

  const handleLogin = (
    username: string,
    password: string,
    edificioSeleccionadoId: string,
  ) => {
    setErrorGlobal(null);
    setErroresValidacion(null);
    setSuccessMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorGlobal("Ingresa tu usuario y contraseña.");
      return;
    }

    if (mostrarCombo) {
      if (!edificioSeleccionadoId) {
        setErrorGlobal("Debe seleccionar un edificio");
        return;
      }

      setLoadingLogin(true);
      loginEdificioEP(edificioSeleccionadoId, tokenTemporal)
        .then((response) => {
          if (response.data) {
            setLoginSuccess(response.data);
            if (response.data.edificioSeleccionado) {
              navigate("/landing");
            }
          }
        })
        .catch((error) => {
          handleApiError(error);
        })
        .finally(() => setLoadingLogin(false));

      return;
    }

    setLoadingLogin(true);
    loginEP({ username, password })
      .then(async (response) => {
        if (response.success) {
          const token = response.data?.accessToken;
          setTokenTemporal(token ?? "");

          //   if (response.data?.edificioSeleccionado) {
          //     setLoginSuccess(response.data);
          //     navigate("/landing");
          //     return;
          //   }

          //  Si el usuario no tiene un edificio seleccionado, entonces llamar al servicio de mis edificios
          const edificiosResponse = await misEdificiosEP(token ?? "");

          if (edificiosResponse.success && edificiosResponse.data.length > 0) {
            setEdificios(edificiosResponse.data); // Seteamos el array de edificios
            setMostrarCombo(true); // Activamos el renderizado del combo box
          } else {
            // Si el servicio no le devuelve edificios asignados
            //alert("El usuario no tiene edificios asociados.");
          }
        }
      })
      .catch((error) => {
        handleApiError(error);
      })
      .finally(() => setLoadingLogin(false));
  };

  const handleForgotPassWord = (email: string) => {
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

    setLoadingLogin(true);
    forgotPasswordEP({ correo: email })
      .then((response) => {
        setSuccessMessage(response.message);
      })
      .catch(handleApiError)
      .finally(() => setLoadingLogin(false));
  };

  const handleBackToLogin = () => {
    setForgotPasswordFlg(false);

    setErrorGlobal(null);
    setSuccessMessage(null);
    setErroresValidacion(null);
  };

  const showForgotPassword = (estado: boolean) => {
    setForgotPasswordFlg(estado);
  };

  return {
    handleLogin,
    handleForgotPassWord,
    handleBackToLogin,
    errorGlobal,
    successMessage,
    forgotPasswordFlg,
    mostrarCombo,
    erroresValidacion,
    showForgotPassword,
    edificios,
    loadingLogin,
  };
}
