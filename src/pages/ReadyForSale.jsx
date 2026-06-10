export default function ReadyForSale() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const readyAnimals = animals.filter(
    (animal) => {
      if (
        !animal.expectedCalvingDate ||
        animal.status === "Sold"
      ) {
        return false;
      }

      const today = new Date();

      const calvingDate =
        new Date(
          animal.expectedCalvingDate
        );

      const daysToCalving =
        Math.floor(
          (calvingDate - today) /
            (1000 *
              60 *
              60 *
              24)
        );

      return (
        daysToCalving <= 90 &&
        daysToCalving >= 0
      );
    }
  );

  return (
    <div>
      <h1>
        💰 Ready For Sale
      </h1>

      <p>
        Animals within 90 days
        of calving.
      </p>

      <hr />

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Name</th>
            <th>
              Days To Calving
            </th>
            <th>
              Purchase Price
            </th>
            <th>
              Total Investment
            </th>
            <th>
              Sale Price
            </th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {readyAnimals.map(
            (animal) => {
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

              const totalInvestment =
                purchase +
                feed +
                medicine +
                labour +
                other;

              const salePrice =
                Number(
                  animal.salePrice
                ) || 0;

              const profit =
                salePrice -
                totalInvestment;

              const daysToCalving =
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
                    {animal.name}
                  </td>

                  <td>
                    {
                      daysToCalving
                    }
                  </td>

                  <td>
                    Rs{" "}
                    {purchase.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {totalInvestment.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {salePrice.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {profit.toLocaleString()}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}