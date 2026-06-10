export default function AnimalHealthHistory({
  tagNumber,
}) {
  const individualTreatments =
    JSON.parse(
      localStorage.getItem(
        "individualTreatments"
      )
    ) || [];

  const animalRecords =
    individualTreatments.filter(
      (record) =>
        record.animalTag ===
        tagNumber
    );

  return (
    <div>
      <h2>
        🩺 Health History
      </h2>

      {animalRecords.length ===
      0 ? (
        <p>
          No health records
          found.
        </p>
      ) : (
        <table
          border="1"
          cellPadding="8"
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Disease</th>
              <th>Treatment</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {animalRecords.map(
              (
                record,
                index
              ) => (
                <tr
                  key={index}
                >
                  <td>
                    {record.date}
                  </td>

                  <td>
                    {
                      record.disease
                    }
                  </td>

                  <td>
                    {
                      record.treatment
                    }
                  </td>

                  <td>
                    {record.notes}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}