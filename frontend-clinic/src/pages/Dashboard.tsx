import React from "react";
import Cards from "../components/Dashboard/Cards";
import Agendamentos from "../components/Dashboard/Agendamentos";
import Avisos from "../components/Dashboard/Avisos";

interface DashboardProps {
  collapsed?: boolean; 
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div
      className="main-content container-fluid p-0">
      <div className="row g-3 mb-4">
        <div className="col-12">
          <Cards />
        </div>
      </div>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <Agendamentos />
        </div>
        <div className="col-12 col-lg-4">
          <Avisos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;