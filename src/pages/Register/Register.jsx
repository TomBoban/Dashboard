import React, { useState } from "react";
import { IonContent, IonPage, IonInput, IonButton } from "@ionic/react";
import { useDispatch } from "react-redux";
import { registrationStart } from "../../redux/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registrationStart({ username, email, password }));
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="registration-form">
          <h1>User Registration</h1>
          <IonInput
            value={username}
            placeholder="Username"
            onIonChange={(e) => setUsername(e.target.value)}
          />
          <IonInput
            type="password"
            value={password}
            placeholder="Password"
            onIonChange={(e) => setPassword(e.target.value)}
          />
          <IonInput
            type="email"
            value={email}
            placeholder="Email"
            onIonChange={(e) => setEmail(e.target.value)}
          />
          <IonButton expand="full" onClick={handleSubmit}>
            Register
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
