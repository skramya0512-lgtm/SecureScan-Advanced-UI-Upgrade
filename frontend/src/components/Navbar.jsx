import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";


function Navbar() {


  const [menuOpen, setMenuOpen] = useState(false);

  const [accountOpen, setAccountOpen] = useState(false);


  const navigate = useNavigate();


  const token = localStorage.getItem("token");




  const closeMenu = () => {

    setMenuOpen(false);

    setAccountOpen(false);

  };





  const handleLogout = () => {


    localStorage.removeItem("token");


    closeMenu();


    navigate("/");

  };







  return (

    <nav className="navbar">





      {/* Brand */}


      <Link

        to="/"

        className="logo"

        onClick={closeMenu}

      >

        🔒 SecureScan

      </Link>








      {/* Mobile Menu Button */}


      <button

        className="menu-toggle"

        onClick={() => setMenuOpen(!menuOpen)}

      >

        ☰

      </button>








      <div

        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}

      >





        {!token ? (



          <>


            <span className="nav-feature">

              🛡 Security Intelligence

            </span>




            <span className="nav-feature">

              ⚡ Threat Monitoring

            </span>




            <span className="nav-feature">

              🌐 Website Analysis

            </span>




            <span className="nav-feature">

              🔍 Vulnerability Detection

            </span>



          </>



        ) : (




          <>





            <span className="nav-feature">

              🛡 Security Dashboard

            </span>





            <span className="nav-feature">

              📊 Scan History

            </span>





            <span className="nav-feature">

              📄 Security Reports

            </span>






            <div className="profile-menu">





              <button

                className="profile-btn"

                onClick={() =>
                  setAccountOpen(!accountOpen)
                }

              >

                👤 Account ▼

              </button>







              {accountOpen && (



                <div className="profile-dropdown">



                  <button

                    onClick={handleLogout}

                  >

                    Logout

                  </button>



                </div>



              )}




            </div>





          </>



        )}




      </div>




    </nav>


  );

}



export default Navbar;