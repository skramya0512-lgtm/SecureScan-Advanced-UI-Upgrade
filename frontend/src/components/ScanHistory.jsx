import { useMemo, useState, useEffect } from "react";

function ScanHistory({ scans }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [currentPage, setCurrentPage] = useState(1);

  const scansPerPage = 5;

  const filteredScans = useMemo(() => {
    let data = [...scans];

    // Search
    data = data.filter((scan) =>
      scan.filename
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    // Status Filter
    if (statusFilter !== "All") {
      data = data.filter(
        (scan) => scan.status === statusFilter
      );
    }

    // Sorting
    switch (sortBy) {
      case "Oldest":
        data.sort(
          (a, b) =>
            new Date(a.scannedAt || a.createdAt) -
            new Date(b.scannedAt || b.createdAt)
        );
        break;

      case "Highest Score":
        data.sort(
          (a, b) => (b.score || 0) - (a.score || 0)
        );
        break;

      case "Lowest Score":
        data.sort(
          (a, b) => (a.score || 0) - (b.score || 0)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.scannedAt || b.createdAt) -
            new Date(a.scannedAt || a.createdAt)
        );
    }

    return data;
  }, [scans, search, statusFilter, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  const totalPages = Math.max(
  1,
  Math.ceil(filteredScans.length / scansPerPage)
);

  const startIndex =
    (currentPage - 1) * scansPerPage;

  const paginatedScans = filteredScans.slice(
    startIndex,
    startIndex + scansPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Safe":
        return "status-safe";
      case "Suspicious":
        return "status-suspicious";
      default:
        return "status-malicious";
    }
  };

  const getScoreClass = (score) => {
    if (score >= 80) return "status-safe";
    if (score >= 40) return "status-suspicious";
    return "status-malicious";
  };

  return (
    <div>
      <h2>Scan History</h2>

      <div className="history-controls">

        <input
          type="text"
          placeholder="Search website..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Safe</option>
          <option>Suspicious</option>
          <option>Malicious</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest Score</option>
          <option>Lowest Score</option>
        </select>

        {search && (
          <button
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}

      </div>

      {filteredScans.length === 0 ? (
        <div className="empty-history">
          🔍 No scans match your search.
        </div>
      ) : (
        <>
          <table className="history-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Website</th>
                <th>Status</th>
                <th>Score</th>
                <th>HTTPS</th>
                <th>Response</th>
                <th>Scanned At</th>
              </tr>
            </thead>

            <tbody>

              {paginatedScans.map((scan) => (

                <tr key={scan.id}>

                  <td>{scan.id}</td>

                  <td>{scan.filename}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(scan.status)}`}
                    >
                      {scan.status === "Safe"
                        ? "🟢 Safe"
                        : scan.status === "Suspicious"
                        ? "🟡 Suspicious"
                        : "🔴 Malicious"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${getScoreClass(scan.score)}`}
                    >
                      {scan.score || 0}/100
                    </span>
                  </td>

                  <td>
                    {scan.https
                      ? "✅ Secure"
                      : "❌ No"}
                  </td>

                  <td>
                    {scan.responseTime || "N/A"}
                  </td>

                  <td>
                    {new Date(
                      scan.scannedAt ||
                      scan.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              ◀ Previous
            </button>

            <span>
              Page {currentPage} of{" "}
              {totalPages || 1}
            </span>

            <button
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next ▶
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default ScanHistory;