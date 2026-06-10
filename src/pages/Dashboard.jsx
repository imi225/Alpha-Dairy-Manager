import DashboardAlerts from "../components/DashboardAlerts";

export default function Dashboard() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];
const farmSettings =
  JSON.parse(
    localStorage.getItem(
      "farmSettings"
    )
  ) || {};
  const vetBills =
    JSON.parse(
      localStorage.getItem(
        "vetBills"
      )
    ) || [];

  const vetPayments =
    JSON.parse(
      localStorage.getItem(
        "vetPayments"
      )
    ) || [];

  const today = new Date();

  const soldAnimals =
    animals.filter(
      (animal) =>
        animal.status === "Sold"
    );
const archivedAnimals =
  animals.filter(
    (animal) =>
      animal.archived === true
  );
  const animalsOnFarm =
  animals.filter(
    (animal) =>
      animal.status !==
        "Sold" &&
      animal.archived !==
        true
  );
  const pregnantAnimals =
  animals.filter(
    (animal) =>
      animal.pregnant ===
        true &&
      animal.archived !==
        true
  );
  const sickAnimals =
  animals.filter(
    (animal) =>
      animal.sick ===
        true &&
      animal.archived !==
        true
  );
  const calves =
    animals.filter(
      (animal) =>
        animal.status === "Calf"
    );

  const heifers =
    animals.filter(
      (animal) =>
        animal.status === "Heifer"
    );

  const lactating =
    animals.filter(
      (animal) =>
        animal.status === "Lactating"
    );

  const ultrasoundDue =
    animals.filter(
      (animal) =>
        animal.pregnancyStatus ===
          "Waiting for Ultrasound" &&
        animal.ultrasoundDate &&
        new Date(
          animal.ultrasoundDate
        ) <= today
    );

  const repeatAI =
    animals.filter(
      (animal) =>
        animal.pregnancyStatus ===
        "Repeat AI Required"
    );

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

  const readyForSale =
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
        days >= 0 &&
        animal.status !==
          "Sold"
      );
    });

  let totalInvestment = 0;
  let totalSales = 0;

  animals.forEach(
    (animal) => {
      const investment =
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

      totalInvestment +=
        investment;

      totalSales +=
        Number(
          animal.salePrice
        ) || 0;
    }
  );

  const totalProfit =
    totalSales -
    totalInvestment;

const financialStatus =
  totalProfit > 0
    ? "Profitable"
    : totalProfit < 0
    ? "Loss"
    : "Break Even";
  const totalVetBills =
    vetBills.reduce(
      (
        sum,
        bill
      ) =>
        sum +
        Number(
          bill.billAmount || 0
        ),
      0
    );

  const totalVetPayments =
    vetPayments.reduce(
      (
        sum,
        payment
      ) =>
        sum +
        Number(
          payment.amount || 0
        ),
      0
    );

  const outstandingVetBalance =
    totalVetBills -
    totalVetPayments;

  const latestAnimal =
    animals.length > 0
      ? animals[
          animals.length - 1
        ]
      : null;

  const latestVetBill =
    vetBills.length > 0
      ? vetBills[
          vetBills.length - 1
        ]
      : null;

  return (
    <div>
      <h1>
  🐄{" "}
  {farmSettings.farmName ||
    "Alpha Dairy Manager"}
</h1>

<h3>
  Owner:{" "}
  {farmSettings.ownerName ||
    "-"}
</h3>

<h3>
  Phone:{" "}
  {farmSettings.phone ||
    "-"}
</h3>

<h2>Dashboard</h2>

      <hr />

      <DashboardAlerts
        ultrasoundDue={
          ultrasoundDue
        }
        repeatAI={repeatAI}
        calving30={calving30}
        readyForSale={
          readyForSale
        }
      />

      <hr />

      <h2>
        Herd Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Card
          title="Animals On Farm"
          value={
            animalsOnFarm.length
          }
        />

        <Card
          title="Pregnant"
          value={
            pregnantAnimals.length
          }
        />

        <Card
          title="Ready For Sale"
          value={
            readyForSale.length
          }
        />

        <Card
          title="Lactating"
          value={
            lactating.length
          }
        />

        <Card
          title="Heifers"
          value={
            heifers.length
          }
        />

        <Card
          title="Calves"
          value={
            calves.length
          }
        />

        <Card
          title="Sick"
          value={
            sickAnimals.length
          }
        />

        <Card
          title="Sold Animals"
          value={
            soldAnimals.length
          }
        />
        <Card
  title="Archived"
  value={
    archivedAnimals.length
  }
/>

        <Card
          title="Total Animals"
          value={
            animals.length
          }
        />
      </div>

      <hr />

      <h2>
        Financial Snapshot
      </h2>

      <h3>
        Total Investment:
        Rs{" "}
        {totalInvestment.toLocaleString()}
      </h3>

      <h3>
        Total Sales:
        Rs{" "}
        {totalSales.toLocaleString()}
      </h3>

      <h3>
        Net Profit:
        Rs{" "}
        {totalProfit.toLocaleString()}
      </h3>
<h3>
  Status:
  {financialStatus}
</h3>
      <h3>
        Outstanding Vet Balance:
        Rs{" "}
        {outstandingVetBalance.toLocaleString()}
      </h3>

      <hr />

      <h2>
        Recent Activity
      </h2>

      <p>
        <strong>
          Latest Animal:
        </strong>{" "}
        {latestAnimal
          ? `${latestAnimal.tagNumber} - ${latestAnimal.name}`
          : "No Animals"}
      </p>

      <p>
        <strong>
          Latest Vet Bill:
        </strong>{" "}
        {latestVetBill
          ? `Rs ${Number(
              latestVetBill.billAmount
            ).toLocaleString()}`
          : "No Bills"}
      </p>

      <hr />
<hr />

<h2>
  Recent Animals
</h2>

<table
  border="1"
  cellPadding="8"
>
  <thead>
    <tr>
      <th>Tag</th>
      <th>Name</th>
      <th>Breed</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {animals
      .slice(-5)
      .reverse()
      .map((animal) => (
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
              animal.breed
            }
          </td>

          <td>
            {
              animal.status
            }
          </td>
        </tr>
      ))}
  </tbody>
</table>
      <h2>
        Ultrasound Due
      </h2>

      <ul>
        {ultrasoundDue.map(
          (animal) => (
            <li
              key={
                animal.tagNumber
              }
            >
              Tag{" "}
              {
                animal.tagNumber
              }{" "}
              -{" "}
              {
                animal.ultrasoundDate
              }
            </li>
          )
        )}
      </ul>

      <hr />

      <h2>
        Repeat AI Required
      </h2>

      <ul>
        {repeatAI.map(
          (animal) => (
            <li
              key={
                animal.tagNumber
              }
            >
              Tag{" "}
              {
                animal.tagNumber
              }
            </li>
          )
        )}
      </ul>

      <hr />

      <h2>
        Calving Within 30
        Days
      </h2>

      <ul>
        {calving30.map(
          (animal) => (
            <li
              key={
                animal.tagNumber
              }
            >
              Tag{" "}
              {
                animal.tagNumber
              }{" "}
              -{" "}
              {
                animal.expectedCalvingDate
              }
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        padding: "20px",
        border:
          "1px solid #ddd",
        borderRadius:
          "10px",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}