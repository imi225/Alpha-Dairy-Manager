export default function BreedingDashboard() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const breedingRecords =
    JSON.parse(
      localStorage.getItem(
        "breedingRecords"
      )
    ) || [];

  const calvingRecords =
    JSON.parse(
      localStorage.getItem(
        "calvingRecords"
      )
    ) || [];

  const today = new Date();

  const ultrasoundDue =
    animals.filter((animal) => {
      if (!animal.ultrasoundDate)
        return false;

      return (
        new Date(
          animal.ultrasoundDate
        ) <= today &&
        animal.pregnancyStatus ===
          "Waiting for Ultrasound"
      );
    });

  const repeatAI =
    animals.filter(
      (animal) =>
        animal.pregnancyStatus ===
        "Repeat AI Required"
    );

  const pregnantAnimals =
    animals.filter(
      (animal) =>
        animal.pregnancyStatus ===
        "Pregnant"
    );

  const calvedAnimals =
    animals.filter(
      (animal) =>
        animal.pregnancyStatus ===
        "Calved"
    );

  const calving90 =
    animals.filter((animal) => {
      if (
        !animal.expectedCalvingDate
      )
        return false;

      const days =
        Math.floor(
          (new Date(
            animal.expectedCalvingDate
          ) -
            today) /
            (1000 *
              60 *
              60 *
              24)
        );

      return (
        days <= 90 &&
        days >= 0
      );
    });

  const calving30 =
    animals.filter((animal) => {
      if (
        !animal.expectedCalvingDate
      )
        return false;

      const days =
        Math.floor(
          (new Date(
            animal.expectedCalvingDate
          ) -
            today) /
            (1000 *
              60 *
              60 *
              24)
        );

      return (
        days <= 30 &&
        days >= 0
      );
    });

  const totalAI =
    breedingRecords.length;

  const conceptionRate =
    totalAI > 0
      ? (
          (pregnantAnimals.length /
            totalAI) *
          100
        ).toFixed(1)
      : 0;

  const calvingRate =
    totalAI > 0
      ? (
          (calvingRecords.length /
            totalAI) *
          100
        ).toFixed(1)
      : 0;

  const averageServices =
    pregnantAnimals.length > 0
      ? (
          totalAI /
          pregnantAnimals.length
        ).toFixed(2)
      : 0;

  return (
    <div>
      <h1>
        🧬 Breeding Analytics
      </h1>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Total AI Services
          </h3>

          <h1>
            {totalAI}
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Pregnant Animals
          </h3>

          <h1>
            {
              pregnantAnimals.length
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Calved Animals
          </h3>

          <h1>
            {
              calvedAnimals.length
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Conception Rate
          </h3>

          <h1>
            {
              conceptionRate
            }
            %
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Calving Rate
          </h3>

          <h1>
            {calvingRate}%
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Avg Services /
            Conception
          </h3>

          <h1>
            {
              averageServices
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Ultrasound Due
          </h3>

          <h1>
            {
              ultrasoundDue.length
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Repeat AI
          </h3>

          <h1>
            {repeatAI.length}
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Calving ≤ 90
            Days
          </h3>

          <h1>
            {
              calving90.length
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h3>
            Calving ≤ 30
            Days
          </h3>

          <h1>
            {
              calving30.length
            }
          </h1>
        </div>
      </div>

      <hr />

      <h2>
        Ultrasound Due
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>
              Ultrasound Due
            </th>
          </tr>
        </thead>

        <tbody>
          {ultrasoundDue.map(
            (animal) => (
              <tr
                key={
                  animal.tagNumber
                }
              >
                <td>
                  {
                    animal.tagNumber
                  }
                </td>

                <td>
                  {
                    animal.ultrasoundDate
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Calving Within 30
        Days
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>
              Expected Calving
            </th>
          </tr>
        </thead>

        <tbody>
          {calving30.map(
            (animal) => (
              <tr
                key={
                  animal.tagNumber
                }
              >
                <td>
                  {
                    animal.tagNumber
                  }
                </td>

                <td>
                  {
                    animal.expectedCalvingDate
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}