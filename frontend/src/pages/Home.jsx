import { Link } from "react-router-dom";
import "../styles/home.css";


function Home() {


  return (

    <div className="home">


      {/* Hero Section */}

      <section className="hero">


        <div className="hero-glow"></div>



        <div className="hero-content">



          <div className="hero-badge">

            Advanced Website Security Scanner

          </div>





          <h1>

            Secure Your Website.

            <br />

            <span>

              Detect Threats Before Attackers Do.

            </span>


          </h1>





          <p>

            SecureScan automatically analyzes websites,
            detects security weaknesses, and generates
            professional security reports.

          </p>





          <div className="hero-buttons">


            <Link

              to="/login"

              className="primary-btn"

            >

              🚀 Start Security Scan

            </Link>


          </div>





          <div className="trust-indicators">


            <div className="trust-item">

              🔒 HTTPS Detection

            </div>



            <div className="trust-item">

              🛡 Security Header Analysis

            </div>



            <div className="trust-item">

              📄 Security Reports

            </div>



          </div>




        </div>



      </section>







      {/* Features */}


      <section className="features">


        <div className="section-title">


          <h2>

            Powerful Security Features

          </h2>



          <p>

            Advanced tools to understand and improve website security.

          </p>



        </div>






        <div className="feature-grid">





          <div className="feature-card">


            <div className="feature-icon">

              🔒

            </div>



            <h3>

              HTTPS Security Check

            </h3>



            <p>

              Detect secure connection status and
              website protection level.

            </p>



          </div>






          <div className="feature-card">


            <div className="feature-icon">

              🛡️

            </div>



            <h3>

              Vulnerability Detection

            </h3>



            <p>

              Identify common security weaknesses
              and possible risks.

            </p>



          </div>






          <div className="feature-card">


            <div className="feature-icon">

              📄

            </div>



            <h3>

              Security Reports

            </h3>



            <p>

              Generate detailed reports with
              security recommendations.

            </p>



          </div>





        </div>



      </section>








      {/* How It Works */}


      <section className="features">


        <div className="section-title">


          <h2>

            How SecureScan Works

          </h2>



          <p>

            Three simple steps to analyze your website.

          </p>



        </div>






        <div className="feature-grid">





          <div className="feature-card">


            <div className="feature-icon">

              1️⃣

            </div>


            <h3>

              Enter Website

            </h3>


            <p>

              Provide the website URL you want
              to scan.

            </p>


          </div>






          <div className="feature-card">


            <div className="feature-icon">

              2️⃣

            </div>



            <h3>

              Run Scan

            </h3>



            <p>

              SecureScan analyzes security
              settings automatically.

            </p>



          </div>






          <div className="feature-card">


            <div className="feature-icon">

              3️⃣

            </div>



            <h3>

              Get Report

            </h3>



            <p>

              View security score and
              recommendations.

            </p>



          </div>




        </div>



      </section>








      {/* Final CTA */}


      <section className="cta">


        <div className="cta-box">


          <h2>

            Ready to Test Your Website Security?

          </h2>



          <p>

            Create your SecureScan account and start
            your first security scan.

          </p>




          <Link

            to="/register"

            className="primary-btn"

          >

            Start Your First Scan

          </Link>




        </div>



      </section>




    </div>


  );

}



export default Home;