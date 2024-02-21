import { useState } from "react";
import {   Dataentry, Sidebar } from "../../components";
import style from "./dashboard.module.css";

const Dashboard = () => {
  const [data, setData] = useState({})
    console.log(data);

  return (
    <div className={style.dashboardContainer}>
      <Sidebar /> <Dataentry data={data} setData={setData}/>
    </div>
  );
};

export default Dashboard;
