function DashboardHeader() {

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  return (

    <div className="dashboard-header modern-header">


      <div className="header-content">


        <h1>
          🛡️ SecureScan Dashboard
        </h1>



        <p>
          Monitor website security,
          analyze vulnerabilities,
          and generate professional
          security reports.
        </p>



        <div className="security-status">

          <span className="status-dot"></span>

          System Online

        </div>


      </div>




      <div className="dashboard-date">

        📅 {today}

      </div>



    </div>

  );

}


export default DashboardHeader;