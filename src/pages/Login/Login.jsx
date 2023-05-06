import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonInput,
  IonText,
  IonContent,
  IonPage,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../../redux/slices/loginSlice";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const isLoading = useSelector((state) => state.login.isLoading);
  const error = useSelector((state) => state.login.error);
  const isAuth = useSelector((state) => state.login.isAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart({ email, password }));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/home");
    }
  }, [isAuth, history]);

  return (
    <IonPage>
      <IonContent >
        <div className="login_body">
          <div className="login-form">
            <h1>Please Login In </h1>
            <form onSubmit={handleSubmit}>
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.target.value)}
                required
              ></IonInput>
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.target.value)}
                required
              ></IonInput>
              <IonButton
                type="submit"
                expand="full"
                disabled={isLoading}
                className="login-button"
              >
                {isLoading ? "Logging in..." : "Login"}
              </IonButton>
              <div className="register-section">
                <p>
                  <Link className="link" to="/register">
                    Don't have an account? Register Now
                  </Link>
                </p>
              </div>
            </form>
            {error && <IonText color="danger">{error}</IonText>}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
