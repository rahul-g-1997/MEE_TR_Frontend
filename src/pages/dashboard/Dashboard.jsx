import {  Dataentry, Sidebar } from "../../components";
import Dataentry2 from "../../components/dataentry/Dataentry2";
import style from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={style.dashboardContainer}>
      <Sidebar/><Dataentry/>
    </div>
  );
};

export default Dashboard;
