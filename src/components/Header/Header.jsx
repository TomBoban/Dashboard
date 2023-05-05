import React, { useEffect } from "react";
import { IonHeader, IonToolbar, IonTitle, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/loginSlice";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.isAuth);
  const history = useHistory();

  const logoutFn = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Test App</IonTitle>
        {!isAuth ? (
          <IonButton slot="end" fill="clear">
            <Link to="/login">Login</Link>
          </IonButton>
        ) : (
          <IonButton onClick={logoutFn} slot="end" fill="clear">
            Logout
          </IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
