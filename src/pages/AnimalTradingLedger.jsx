export default function AnimalTradingLedger() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const purchasedAnimals =
    animals.filter(
      (animal) =>
        animal.purchasePrice
    );

  const soldAnimals =
    animals.filter(
      (animal) =>
        animal.status === "Sold"
    );

  const totalPurchaseValue =
    purchasedAnimals.reduce(
      (sum, animal) =>
        sum +
        (Number(
          animal.purchasePrice
        ) || 0),
      0
    );

  const totalSaleValue =
    soldAnimals.reduce(
      (sum, animal) =>
        sum +
        (Number(
          animal.salePrice
        ) || 0),
      0
    );

  const tradingDifference =
    totalSaleValue -
    totalPurchaseValue;

  const monthlyData = {};

  animals.forEach(
    (animal) => {
      if (
        animal.purchaseDate
      ) {
        const date =
          new Date(
            animal.purchaseDate
          );

        const key =
          date.toLocaleString(
            "default",
            {
              month:
                "long",
              year: "numeric",
            }
          );

        if (
          !monthlyData[key]
        ) {
          monthlyData[
            key
          ] = {
            purchases: 0,
            purchaseValue: 0,
            sales: 0,
            saleValue: 0,
          };
        }

        monthlyData[
          key
        ].purchases += 1;

        monthlyData[
          key
        ].purchaseValue +=
          Number(
            animal.purchasePrice
          ) || 0;
      }

      if (
        animal.saleDate
      ) {
        const date =
          new Date(
            animal.saleDate
          );

        const key =
          date.toLocaleString(
            "default",
            {
              month:
                "long",
              year: "numeric",
            }
          );

        if (
          !monthlyData[key]
        ) {
          monthlyData[
            key
          ] = {
            purchases: 0,
            purchaseValue: 0,
            sales: 0,
            saleValue: 0,
          };
        }

        monthlyData[
          key
        ].sales += 1;

        monthlyData[
          key
        ].saleValue +=
          Number(
            animal.salePrice
          ) || 0;
      }
    }
  );

  const monthlyRows =
    Object.entries(
      monthlyData
    );

  return (
    <div>
      <h1>
        📈 Animal Trading
        Ledger
      </h1>

      <hr />

      <h2>
        Trading Summary
      </h2>

      <p>
        <strong>
          Animals Purchased:
        </strong>{" "}
        {
          purchasedAnimals.length
        }
      </p>

      <p>
        <strong>
          Animals Sold:
        </strong>{" "}
        {
          soldAnimals.length
        }
      </p>

      <p>
        <strong>
          Total Purchase
          Value:
        </strong>{" "}
        Rs{" "}
        {totalPurchaseValue.toLocaleString()}
      </p>

      <p>
        <strong>
          Total Sale
          Value:
        </strong>{" "}
        Rs{" "}
        {totalSaleValue.toLocaleString()}
      </p>

      <h2>
        Trading Difference:
        Rs{" "}
        {tradingDifference.toLocaleString()}
      </h2>

      <hr />

      <h2>
        Monthly Trading
        Summary
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>
              Month
            </th>

            <th>
              Purchased
            </th>

            <th>
              Purchase
              Value
            </th>

            <th>Sold</th>

            <th>
              Sale Value
            </th>

            <th>
              Difference
            </th>
          </tr>
        </thead>

        <tbody>
          {monthlyRows.map(
            (
              [month, data],
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {month}
                </td>

                <td>
                  {
                    data.purchases
                  }
                </td>

                <td>
                  Rs{" "}
                  {data.purchaseValue.toLocaleString()}
                </td>

                <td>
                  {data.sales}
                </td>

                <td>
                  Rs{" "}
                  {data.saleValue.toLocaleString()}
                </td>

                <td>
                  Rs{" "}
                  {(
                    data.saleValue -
                    data.purchaseValue
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Purchase Records
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Name</th>
            <th>
              Purchase Date
            </th>
            <th>
              Purchase Price
            </th>
          </tr>
        </thead>

        <tbody>
          {purchasedAnimals.map(
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
                  {animal.purchaseDate ||
                    "-"}
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    animal.purchasePrice
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Sale Records
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Name</th>
            <th>
              Sale Date
            </th>
            <th>
              Sale Price
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
                  {animal.saleDate ||
                    "-"}
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    animal.salePrice
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}