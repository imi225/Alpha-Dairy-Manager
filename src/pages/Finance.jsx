export default function Finance() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const healthRecords =
    JSON.parse(
      localStorage.getItem("healthRecords")
    ) || [];

  const breedingRecords =
    JSON.parse(
      localStorage.getItem(
        "breedingRecords"
      )
    ) || [];

  const expenseLedger =
    JSON.parse(
      localStorage.getItem(
        "expenseLedger"
      )
    ) || [];

  const salaryPayments =
    JSON.parse(
      localStorage.getItem(
        "salaryPayments"
      )
    ) || [];
    const employees =
  JSON.parse(
    localStorage.getItem(
      "employees"
    )
  ) || [];

  const animalsOnFarm =
    animals.filter(
      (animal) =>
        animal.status !== "Sold"
    );

  let totalPurchase = 0;
  let totalFeed = 0;
  let totalMedicine = 0;
  let totalLabor = 0;
  let totalOther = 0;
  let totalSales = 0;

  animals.forEach((animal) => {
    totalPurchase +=
      Number(
        animal.purchasePrice || 0
      );

    totalFeed +=
      Number(
        animal.feedCost || 0
      );

    totalMedicine +=
      Number(
        animal.medicineCost || 0
      );

    totalLabor +=
      Number(
        animal.laborCost || 0
      );

    totalOther +=
      Number(
        animal.otherCost || 0
      );

    totalSales +=
      Number(
        animal.salePrice || 0
      );
  });

  const animalInvestment =
    totalPurchase +
    totalFeed +
    totalMedicine +
    totalLabor +
    totalOther;

  const animalProfit =
    totalSales -
    animalInvestment;

  const electricityExpense =
    expenseLedger
      .filter(
        (e) =>
          e.category ===
          "Electricity"
      )
      .reduce(
        (sum, e) =>
          sum +
          Number(
            e.amount || 0
          ),
        0
      );

  const repairExpense =
    expenseLedger
      .filter(
        (e) =>
          e.category ===
          "Repair & Maintenance"
      )
      .reduce(
        (sum, e) =>
          sum +
          Number(
            e.amount || 0
          ),
        0
      );

  const farmSuppliesExpense =
    expenseLedger
      .filter(
        (e) =>
          e.category ===
          "Farm Supplies"
      )
      .reduce(
        (sum, e) =>
          sum +
          Number(
            e.amount || 0
          ),
        0
      );

  const overheadOtherExpense =
    expenseLedger
      .filter(
        (e) =>
          e.category ===
          "Other"
      )
      .reduce(
        (sum, e) =>
          sum +
          Number(
            e.amount || 0
          ),
        0
      );

  const totalFarmOverheads =
    electricityExpense +
    repairExpense +
    farmSuppliesExpense +
    overheadOtherExpense;

  const totalSalaryDue =
    salaryPayments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.salaryDue || 0
        ),
      0
    );

  const totalSalaryPaid =
    salaryPayments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.amountPaid || 0
        ),
      0
    );

  const outstandingSalary =
    salaryPayments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.remaining || 0
        ),
      0
    );

  const trueFarmInvestment =
    animalInvestment +
    totalFarmOverheads;

  const actualFarmProfit =
    totalSales -
    trueFarmInvestment;

  const financialStatus =
    actualFarmProfit > 0
      ? "Profitable"
      : actualFarmProfit < 0
      ? "Loss"
      : "Break Even";

  const averageInvestment =
    animals.length > 0
      ? Math.round(
          animalInvestment /
            animals.length
        )
      : 0;

  const averageFeed =
    animalsOnFarm.length > 0
      ? Math.round(
          totalFeed /
            animalsOnFarm.length
        )
      : 0;

  const averageVet =
    animalsOnFarm.length > 0
      ? Math.round(
          totalMedicine /
            animalsOnFarm.length
        )
      : 0;

  const topAnimals =
    [...animals]
      .sort((a, b) => {
        const costA =
          (Number(
            a.purchasePrice
          ) || 0) +
          (Number(
            a.feedCost
          ) || 0) +
          (Number(
            a.medicineCost
          ) || 0) +
          (Number(
            a.laborCost
          ) || 0) +
          (Number(
            a.otherCost
          ) || 0);

        const costB =
          (Number(
            b.purchasePrice
          ) || 0) +
          (Number(
            b.feedCost
          ) || 0) +
          (Number(
            b.medicineCost
          ) || 0) +
          (Number(
            b.laborCost
          ) || 0) +
          (Number(
            b.otherCost
          ) || 0);

        return costB - costA;
      })
      .slice(0, 5);

        return (
    <div>
      <h1>
        💰 Finance Dashboard
      </h1>

      <hr />

      <h2>
        Animal Financial Summary
      </h2>

      <p>
        <strong>
          Total Purchase Value:
        </strong>{" "}
        Rs{" "}
        {totalPurchase.toLocaleString()}
      </p>

      <p>
        <strong>
          Total Feed Cost:
        </strong>{" "}
        Rs{" "}
        {totalFeed.toLocaleString()}
      </p>

      <p>
        <strong>
          Total Veterinary Cost:
        </strong>{" "}
        Rs{" "}
        {totalMedicine.toLocaleString()}
      </p>

      <p>
        <strong>
          Total Labour Cost:
        </strong>{" "}
        Rs{" "}
        {totalLabor.toLocaleString()}
      </p>

      <p>
        <strong>
          Animal Other Costs:
        </strong>{" "}
        Rs{" "}
        {totalOther.toLocaleString()}
      </p>

      <hr />

      <h2>
        Farm Overheads
      </h2>

      <p>
        <strong>
          Electricity:
        </strong>{" "}
        Rs{" "}
        {electricityExpense.toLocaleString()}
      </p>

      <p>
        <strong>
          Repair &
          Maintenance:
        </strong>{" "}
        Rs{" "}
        {repairExpense.toLocaleString()}
      </p>

      <p>
        <strong>
          Farm Supplies:
        </strong>{" "}
        Rs{" "}
        {farmSuppliesExpense.toLocaleString()}
      </p>

      <p>
        <strong>
          Other Farm Expenses:
        </strong>{" "}
        Rs{" "}
        {overheadOtherExpense.toLocaleString()}
      </p>

      <h3>
        Total Farm Overheads:
        Rs{" "}
        {totalFarmOverheads.toLocaleString()}
      </h3>

      <hr />

      <h2>
        Labour Summary
      </h2>

      <p>
        <strong>
          Total Salary Due:
        </strong>{" "}
        Rs{" "}
        {totalSalaryDue.toLocaleString()}
      </p>

      <p>
        <strong>
          Total Salary Paid:
        </strong>{" "}
        Rs{" "}
        {totalSalaryPaid.toLocaleString()}
      </p>

      <p>
        <strong>
          Outstanding Salary:
        </strong>{" "}
        Rs{" "}
        {outstandingSalary.toLocaleString()}
      </p>

      <hr />

      <h2>
        Profit Analysis
      </h2>

      <h3>
        Animal Investment:
        Rs{" "}
        {animalInvestment.toLocaleString()}
      </h3>

      <h3>
        Animal Sales:
        Rs{" "}
        {totalSales.toLocaleString()}
      </h3>

      <h2>
        Animal Profit:
        Rs{" "}
        {animalProfit.toLocaleString()}
      </h2>

      <hr />

      <h3>
        True Farm
        Investment:
        Rs{" "}
        {trueFarmInvestment.toLocaleString()}
      </h3>

      <h2>
        Actual Farm Profit:
        Rs{" "}
        {actualFarmProfit.toLocaleString()}
      </h2>

      <h3>
        Financial Status:
        {financialStatus}
      </h3>

      <hr />

      <h2>
        Cost Analysis
      </h2>

      <p>
        <strong>
          Average Investment
          Per Animal:
        </strong>{" "}
        Rs{" "}
        {averageInvestment.toLocaleString()}
      </p>

      <p>
        <strong>
          Average Feed Cost
          Per Animal:
        </strong>{" "}
        Rs{" "}
        {averageFeed.toLocaleString()}
      </p>

      <p>
        <strong>
          Average Vet Cost
          Per Animal:
        </strong>{" "}
        Rs{" "}
        {averageVet.toLocaleString()}
      </p>

      <hr />

      <h2>
        Top 5 Most
        Expensive Animals
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
              Total Cost
            </th>
          </tr>
        </thead>

        <tbody>
          {topAnimals.map(
            (
              animal,
              index
            ) => {
              const totalCost =
                (Number(
                  animal.purchasePrice
                ) || 0) +
                (Number(
                  animal.feedCost
                ) || 0) +
                (Number(
                  animal.medicineCost
                ) || 0) +
                (Number(
                  animal.laborCost
                ) || 0) +
                (Number(
                  animal.otherCost
                ) || 0);

              return (
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
                    Rs{" "}
                    {totalCost.toLocaleString()}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      <hr />
            <h2>
        Animal Investment
        Ledger
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Purchase</th>
            <th>Feed</th>
            <th>Vet</th>
            <th>Labour</th>
            <th>Other</th>
            <th>
              Total Cost
            </th>
            <th>
              Sale Price
            </th>
            <th>
              Profit/Loss
            </th>
          </tr>
        </thead>

        <tbody>
          {animals.map(
            (
              animal,
              index
            ) => {
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
                sale -
                totalCost;

              return (
                <tr
                  key={index}
                >
                  <td>
                    {
                      animal.tagNumber
                    }
                  </td>

                  <td>
                    Rs{" "}
                    {purchase.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {feed.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {medicine.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {labour.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {other.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {totalCost.toLocaleString()}
                  </td>

                  <td>
                    Rs{" "}
                    {sale.toLocaleString()}
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

      <hr />

      <h2>
        Farm Statistics
      </h2>

      <p>
        Total Animals:
        {" "}
        {animals.length}
      </p>

      <p>
        Animals On Farm:
        {" "}
        {animalsOnFarm.length}
      </p>

      <p>
        Health Records:
        {" "}
        {healthRecords.length}
      </p>

      <p>
        Breeding Records:
        {" "}
        {breedingRecords.length}
      </p>

<p>
  Employees:
  {" "}
  {employees.length}
</p>

<p>
  Expense Entries:
  {" "}
  {expenseLedger.length}
</p>

    </div>
  );
}