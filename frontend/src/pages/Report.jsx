const downloadReport = async (type) => {
  try {
    const response = await fetch(`http://localhost:5000/api/sales-report/${type}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_sales_report.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export default function Reports() {
  return (
    <div>
      <h2>Sales Reports</h2>
      <button onClick={() => downloadReport("daily")}>Export Daily Report</button>
      <button onClick={() => downloadReport("weekly")}>Export Weekly Report</button>
    </div>
  );
}
