function UserProfile({ user, loading }) {


  if (loading) {

    return (

      <div className="card profile-card">

        <p>
          🔄 Loading profile...
        </p>

      </div>

    );

  }



  if (!user) {

    return (

      <div className="card profile-card">

        <p>
          ⚠ User information unavailable.
        </p>

      </div>

    );

  }




  const initials = user.name

    ? user.name

        .split(" ")

        .map((word)=>word[0])

        .join("")

        .toUpperCase()

    : "U";





  return (

    <div className="card profile-card">



      <div className="profile-avatar">

        {initials}

      </div>





      <div className="profile-info">



        <h2>

          👤 {user.name}

        </h2>




        <p>
<strong>Email:</strong> {user.email}
        </p>




        <p>

          <strong>
            Account Status:
          </strong>


          <span className="active-user">

            🟢 Protected

          </span>


        </p>





        <div className="security-badge">

          🔐 Security Monitoring Enabled

        </div>





        <p className="profile-message">

          Welcome back!
          Your SecureScan security console
          is ready to monitor websites.

        </p>



      </div>



    </div>

  );

}


export default UserProfile;