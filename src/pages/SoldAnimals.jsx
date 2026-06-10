export default function SoldAnimals() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const soldAnimals =
    animals
      .filter(
        (animal) =>
          animal.status ===
          "Sold"
      )
      .map((animal) => {
        const purchase =
          Number(
            animal.purchasePrice
          ) || 0;

        const feed =
          Number(
            animal.feedCost
          ) || 0;

        const medicine =
          Number(
            animal.medicineCost
          ) || 0;

        const labour =
          Number(
            animal.laborCost
          ) || 0;

        const other =
          Number(
            animal.otherCost
          ) || 0;

        const sale =
          Number(
            animal.salePrice
          ) || 0;

        const totalCost =
          purchase +
          feed +
          medicine +
          labour +
          other;

        const profit =
          sale - totalCost;

        return {
          ...animal,
          totalCost,
          profit,
        };
      })
      .sort(
        (a, b) =>
          b.profit -
          a.profit
      );

  const totalSales =
    soldAnimals.reduce(
      (sum, animal) =>
        sum +
        Number(
          animal.salePrice ||
            0
        ),
      0
    );

  const totalProfit =
    soldAnimals.reduce(
      (sum, animal) =>
        sum + animal.profit,
      0
    );

  const averageProfit =
    soldAnimals.length > 0
      ? Math.round(
          totalProfit /
            soldAnimals.length
        )
      : 0;

  return (
    <div>
      <h1>
        💰 Sold Animals
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
            Total Sold
          </h3>

          <h1>
            {
              soldAnimals.length
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
            Total Sales
          </h3>

          <h1>
            Rs{" "}
            {totalSales.toLocaleString()}
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
            Total Profit
          </h3>

          <h1>
            Rs{" "}
            {totalProfit.toLocaleString()}
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
            Average Profit
          </h3>

          <h1>
            Rs{" "}
            {averageProfit.toLocaleString()}
          </h1>
        </div>
      </div>

      <hr />

      <h2>
        Sales Ledger
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Name</th>
            <th>Buyer</th>
            <th>
              Sale Date
            </th>
            <th>
              Purchase Price
            </th>
            <th>
              Total Cost
            </th>
            <th>
              Sale Price
            </th>
            <th>
              Profit
            </th>
          </tr>
        </thead>

        <tbody>
          {soldAnimals.map(
            (
              animal,
              index
            ) => (
              <tr
                key={index}
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
                  {animal.buyerName ||
                    "-"}
                </td>

                <td>
                  {animal.saleDate ||
                    "-"}
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
                  {animal.totalCost.toLocaleString()}
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    animal.salePrice ||
                      0
                  ).toLocaleString()}
                </td>

                <td>
                  Rs{" "}
                  {animal.profit.toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Top Performing
        Sales
      </h2>

      {soldAnimals
        .slice(0, 5)
        .map((animal) => (
          <div
            key={
              animal.tagNumber
            }
            style={{
              border:
                "1px solid #ddd",
              padding: "10px",
              marginBottom:
                "10px",
              borderRadius:
                "8px",
            }}
          >
            <strong>
              Tag:
            </strong>{" "}
            {
              animal.tagNumber
            }

            <br />

            <strong>
              Profit:
            </strong>{" "}
            Rs{" "}
            {animal.profit.toLocaleString()}
          </div>
        ))}
    </div>
  );
}