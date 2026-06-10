export default function DashboardAlerts({
  ultrasoundDue,
  repeatAI,
  calving30,
  readyForSale,
}) {
  return (
    <div>
      {ultrasoundDue.length > 0 && (
        <div
          style={{
            background: "#f8d7da",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🔴 {ultrasoundDue.length} Animal(s)
          Need Ultrasound
        </div>
      )}

      {repeatAI.length > 0 && (
        <div
          style={{
            background: "#fff3cd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🟠 {repeatAI.length} Animal(s)
          Need Repeat AI
        </div>
      )}

      {calving30.length > 0 && (
        <div
          style={{
            background: "#cfe2ff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🔵 {calving30.length} Animal(s)
          Calving Within 30 Days
        </div>
      )}

      {readyForSale.length > 0 && (
        <div
          style={{
            background: "#d1e7dd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🟢 {readyForSale.length} Animal(s)
          Ready For Sale
        </div>
      )}
    </div>
  );
}