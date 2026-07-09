import { useState } from "react";
import styles from "./sign-in.module.css";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { Alert } from "../../../common/components/ui-kit/Alert/Alert";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import { useSingIn } from "../hook/useSingIn";

export function SignInPage() {
  //  Credenciales
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //  Flujo de pantalla
  const [edificioSeleccionadoId, setEdificioSeleccionadoId] = useState("");

  //  Forgot Password
  const [email, setEmail] = useState("");

  const {
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
  } = useSingIn();

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

              {/* {erroresValidacion?.password && (
                <Alert type="error" message={erroresValidacion.password[0]} />
              )} */}

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
                  onClick={() => showForgotPassword(true)}
                  type="button"
                  title="¿Olvidaste tu contraseña?"
                />
              )}

              <Button
                desc={mostrarCombo ? "Confirmar e ingresar" : "Ingresar"}
                modo="UPD"
                onClick={() =>
                  handleLogin(username, password, edificioSeleccionadoId)
                }
                type="button"
                title={mostrarCombo ? "Confirmar e ingresar" : "Ingresar"}
                disabled={loadingLogin}
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
                onClick={() => handleForgotPassWord(email)}
                type="button"
                title="Enviar enlace"
                disabled={loadingLogin}
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
