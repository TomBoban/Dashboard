import { IonPage } from "@ionic/react";
import "./Home.css";
import Orders from "../Orders/Order";

const Home = () => {
  return (
    <IonPage>
      <Orders />
    </IonPage>
  );
};

export default Home;
