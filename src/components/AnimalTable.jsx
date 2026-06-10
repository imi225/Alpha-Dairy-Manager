import { Link } from "react-router-dom";

export default function AnimalTable({
  animals,
}) {
  const getAge = (dob) => {
    if (!dob) return "-";

    const birthDate =
      new Date(dob);

    const today =
      new Date();

    const months =
      (today.getFullYear() -
        birthDate.getFullYear()) *
        12 +
      (today.getMonth() -
        birthDate.getMonth());

    if (months < 12) {
      return `${months} Months`;
    }

    const years =
      Math.floor(
        months / 12
      );

    const remainingMonths =
      months % 12;

    return `${years}Y ${remainingMonths}M`;
  };

  const isReadyForSale = (
    animal
  ) => {
    if (
      !animal.expectedCalvingDate
    ) {
      return false;
    }

    const days =
      Math.floor(
        (new Date(
          animal.expectedCalvingDate
        ) -
          new Date()) /
          (1000 *
            60 *
            60 *
            24)
      );

    return (
      days <= 90 &&
      days >= 0 &&
      animal.status !==
        "Sold"
    );
  };

  return (
    <div>
      <h2>
        Animal Registry
      </h2>

      <table
        border="1"
        cellPadding="8"
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Status</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Source</th>
            <th>
              Mother Tag
            </th>
            <th>
              Pregnancy
            </th>
            <th>
              Purchase
            </th>
            <th>
              Sale
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {animals.map(
            (
              animal,
              index
            ) => {
              let rowColor =
                "white";

              if (
                animal.status ===
                "Sold"
              ) {
                rowColor =
                  "#e5e7eb";
              } else if (
                animal.sick
              ) {
                rowColor =
                  "#fecaca";
              } else if (
                animal.pregnant
              ) {
                rowColor =
                  "#bbf7d0";
              } else if (
                isReadyForSale(
                  animal
                )
              ) {
                rowColor =
                  "#fde68a";
              }

              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      rowColor,
                  }}
                >
                  <td>
                    {
                      animal.tagNumber
                    }
                  </td>

                  <td>
                    {animal.name}
                  </td>

                  <td>
                    {
                      animal.breed
                    }
                  </td>

                  <td>
                    {
                      animal.status
                    }
                  </td>

                  <td>
                    {getAge(
                      animal.dob
                    )}
                  </td>

                  <td>
                    {
                      animal.weight
                    }{" "}
                    kg
                  </td>

                  <td>
                    {
                      animal.animalSource
                    }
                  </td>

                  <td>
                    {animal.motherTag ||
                      "-"}
                  </td>

                  <td>
                    {
                      animal.pregnancyStatus
                    }
                  </td>

                  <td>
                    Rs{" "}
                    {Number(
                      animal.purchasePrice ||
                        0
                    ).toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {Number(
                      animal.salePrice ||
                        0
                    ).toLocaleString()}
                  </td>

                  <td>
                    <Link
                      to={`/animal-profile/${animal.tagNumber}`}
                    >
                      <button>
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      <br />

      <p>
        🟢 Pregnant |
        🔴 Sick |
        Gray = Sold |
        Yellow = Ready
        For Sale
      </p>
    </div>
  );
}