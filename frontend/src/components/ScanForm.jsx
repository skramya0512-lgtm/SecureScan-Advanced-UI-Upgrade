import { useState, useCallback } from "react";
import { toast } from "react-toastify";


function ScanForm({ onScan, loading }) {

  const [url, setUrl] = useState("");



  const submitHandler = useCallback(
    (e) => {

      e.preventDefault();


      if (loading) {
        return;
      }



      const cleanUrl = url.trim();



      if (!cleanUrl) {

        toast.error(
          "Please enter a website URL."
        );

        return;

      }



      try {

        new URL(cleanUrl);

      } catch {

        toast.error(
          "Please enter a valid website URL."
        );

        return;

      }



      onScan(cleanUrl);

      setUrl("");


    },
    [url, loading, onScan]
  );




  return (

    <div className="card scan-card">


      <h2>
        🌐 Website Security Scan
      </h2>



      <p className="scan-description">

        Enter a website URL to analyze its security,
        HTTP headers, HTTPS configuration, and
        potential vulnerabilities.

      </p>




      <form
        onSubmit={submitHandler}
        className="scan-form"
      >


        <label htmlFor="website-url">
          Website URL
        </label>



        <input

          id="website-url"

          type="url"

          placeholder="https://example.com"

          value={url}

          onChange={(e)=>
            setUrl(e.target.value)
          }

          autoComplete="off"

          disabled={loading}

        />




        <button

          className="scan-btn"

          type="submit"

          disabled={loading}

        >

          {
            loading
            ?
            "🔄 Scanning..."
            :
            "🚀 Start Security Scan"
          }


        </button>


      </form>





      {
        loading && (

          <div className="scan-loading">

            🔍 Scanning website...

            <br />

            Please wait while SecureScan analyzes
            the target.

          </div>

        )
      }



    </div>

  );

}


export default ScanForm;