import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import "../styles/dashboard.css";

import DashboardHeader from "../components/DashboardHeader";
import UserProfile from "../components/UserProfile";
import ScanForm from "../components/ScanForm";
import ScanResult from "../components/ScanResult";
import ScanHistory from "../components/ScanHistory";
import LogoutButton from "../components/LogoutButton";
import DashboardStats from "../components/DashboardStats";


function Dashboard() {


  const navigate = useNavigate();


  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [scanResult, setScanResult] = useState(null);

  const [scans, setScans] = useState([]);






  // Fetch User Profile

  const fetchProfile = useCallback(async () => {

    try {

      const response = await api.get(
        "/user/profile"
      );


      setUser(
        response.data.user
      );


    } catch(error) {


      console.error(
        "Profile loading error:",
        error
      );


      localStorage.removeItem(
        "token"
      );


      navigate("/login");


    }


  }, [navigate]);








  // Fetch Scan History

  const fetchScans = useCallback(async () => {

    try {


      const response = await api.get(
        "/scans"
      );


      setScans(
        response.data.scans || []
      );


    } catch(error) {


      console.error(
        "Scan history error:",
        error
      );


      toast.error(
        "Unable to load scan history."
      );


    }

  }, []);









  useEffect(() => {


    fetchProfile();

    fetchScans();


  }, [
    fetchProfile,
    fetchScans
  ]);









  // Start Website Scan

  const scanHandler = async (scanUrl) => {


    if(!scanUrl) return;



    setLoading(true);



    try {


      const response = await api.post(

        "/scans",

        {
          filename: scanUrl,
          filepath: scanUrl,
        }

      );



      setScanResult(
        response.data.report
      );



      // Update history automatically

      await fetchScans();



      toast.success(
        "Security scan completed!"
      );



    } catch(error) {


      console.error(
        "Scan error:",
        error
      );


      toast.error(
        "Scan failed. Try again."
      );


    } finally {


      setLoading(false);


    }


  };









  // Logout

  const handleLogout = () => {


    localStorage.removeItem(
      "token"
    );


    navigate("/login");


  };









  return (

    <div className="dashboard">



      <section className="dashboard-section">

        <DashboardHeader />

      </section>






      <section className="dashboard-section">

        <UserProfile

          user={user}

          loading={!user}

        />

      </section>






      <section className="dashboard-section">

        <DashboardStats

          scans={scans}

        />

      </section>






      <section className="dashboard-section">

        <ScanForm

          onScan={scanHandler}

          loading={loading}

        />

      </section>






      <section className="dashboard-section">

        <ScanResult

          scanResult={scanResult}

        />

      </section>






      <section className="dashboard-section">


        <div className="card history-card">


          <ScanHistory

            scans={scans}

          />


        </div>



      </section>






      <section className="dashboard-section">


        <LogoutButton

          onLogout={handleLogout}

        />


      </section>





    </div>

  );


}



export default Dashboard;