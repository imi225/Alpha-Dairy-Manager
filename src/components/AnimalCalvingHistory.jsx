export default function AnimalCalvingHistory({
  tagNumber,
}) {
  const calvingRecords =
    JSON.parse(
      localStorage.getItem(
        "calvingRecords"
      )
    ) || [];

  const animalRecords =
    calvingRecords.filter(
      (record) =>
        record.motherTag ===
        tagNumber
    );

  return (
    <div>
      <h2>
        🐮 Calving History
      </h2>

      {animalRecords.length ===
      0 ? (
        <p>
          No calving records
          found.
        </p>
      ) : (
        <table
          border="1"
          cellPadding="8"
        >
          <thead>
            <tr>
              <th>
                Calving Date
              </th>

              <th>
                Calf Tag
              </th>

              <th>
                Calf Sex
              </th>

              <th>
                Birth Weight
              </th>
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
                    {
                      record.calvingDate
                    }
                  </td>

                  <td>
                    {
                      record.calfTag
                    }
                  </td>

                  <td>
                    {
                      record.calfSex
                    }
                  </td>

                  <td>
                    {
                      record.calfWeight
                    }{" "}
                    kg
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