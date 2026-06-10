export default function Reports() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

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

  const healthRecords =
    JSON.parse(
      localStorage.getItem(
        "healthRecords"
      )
    ) || [];

  const calvingRecords =
    JSON.parse(
      localStorage.getItem(
        "calvingRecords"
      )
    ) || [];

  const employees =
    JSON.parse(
      localStorage.getItem(
        "employees"
      )
    ) || [];

  const salaryPayments =
    JSON.parse(
      localStorage.getItem(
        "salaryPayments"
      )
    ) || [];

  const expenseLedger =
    JSON.parse(
      localStorage.getItem(
        "expenseLedger"
      )
    ) || [];

  const exportCSV = (
    filename,
    rows
  ) => {
    if (!rows.length) {
      alert(
        "No data available."
      );
      return;
    }

    const csvContent =
      rows
        .map((row) =>
          row.join(",")
        )
        .join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;
    link.download =
      filename;

    link.click();

    URL.revokeObjectURL(
      url
    );
  };

  const exportAnimalInventory =
    () => {
      const rows = [
        [
          "Tag Number",
          "Name",
          "Breed",
          "Status",
          "Weight",
          "Purchase Date",
          "Purchase Price",
        ],
      ];

      animals.forEach(
        (animal) => {
          rows.push([
            animal.tagNumber,
            animal.name,
            animal.breed,
            animal.status,
            animal.weight,
            animal.purchaseDate,
            animal.purchasePrice,
          ]);
        }
      );

      exportCSV(
        "AnimalInventory.csv",
        rows
      );
    };

  const exportPregnancyReport =
    () => {
      const rows = [
        [
          "Tag",
          "AI Date",
          "Technician",
          "Pregnancy Status",
          "Ultrasound Date",
          "Expected Calving",
        ],
      ];

      animals
        .filter(
          (animal) =>
            animal.pregnant ===
            true
        )
        .forEach(
          (animal) => {
            rows.push([
              animal.tagNumber,
              animal.aiDate,
              animal.technician,
              animal.pregnancyStatus,
              animal.ultrasoundDate,
              animal.expectedCalvingDate,
            ]);
          }
        );

      exportCSV(
        "PregnancyReport.csv",
        rows
      );
    };

  const exportArchivedAnimals =
    () => {
      const rows = [
        [
          "Tag",
          "Name",
          "Breed",
          "Status",
        ],
      ];

      animals
        .filter(
          (animal) =>
            animal.archived ===
            true
        )
        .forEach(
          (animal) => {
            rows.push([
              animal.tagNumber,
              animal.name,
              animal.breed,
              animal.status,
            ]);
          }
        );

      exportCSV(
        "ArchivedAnimals.csv",
        rows
      );
    };
      const exportCalvingReport =
    () => {
      const rows = [
        [
          "Mother Tag",
          "Calf Tag",
          "Calf Sex",
          "Birth Weight",
          "Calving Date",
        ],
      ];

      calvingRecords.forEach(
        (record) => {
          rows.push([
            record.motherTag,
            record.calfTag,
            record.calfSex,
            record.calfWeight,
            record.calvingDate,
          ]);
        }
      );

      exportCSV(
        "CalvingReport.csv",
        rows
      );
    };

  const exportHealthReport =
    () => {
      const rows = [
        [
          "Tag",
          "Date",
          "Treatment",
          "Medicine",
          "Cost",
          "Veterinarian",
        ],
      ];

      healthRecords.forEach(
        (record) => {
          rows.push([
            record.tagNumber,
            record.date,
            record.type,
            record.medicineName,
            record.medicineCost,
            record.veterinarian,
          ]);
        }
      );

      exportCSV(
        "HealthReport.csv",
        rows
      );
    };

  const exportVetLedger =
    () => {
      const rows = [
        [
          "Month",
          "Year",
          "Bill Amount",
          "Animals",
          "Cost Per Animal",
        ],
      ];

      vetBills.forEach(
        (bill) => {
          rows.push([
            bill.month,
            bill.year,
            bill.billAmount,
            bill.animalCount,
            bill.costPerAnimal,
          ]);
        }
      );

      exportCSV(
        "VeterinaryLedger.csv",
        rows
      );
    };

  const exportTradingLedger =
    () => {
      const rows = [
        [
          "Tag",
          "Name",
          "Purchase Date",
          "Purchase Price",
          "Sale Date",
          "Sale Price",
        ],
      ];

      animals.forEach(
        (animal) => {
          rows.push([
            animal.tagNumber,
            animal.name,
            animal.purchaseDate,
            animal.purchasePrice,
            animal.saleDate,
            animal.salePrice,
          ]);
        }
      );

      exportCSV(
        "AnimalTradingLedger.csv",
        rows
      );
    };

  const exportEmployeeReport =
    () => {
      const rows = [
        [
          "Employee",
          "Position",
          "Salary",
        ],
      ];

      employees.forEach(
        (employee) => {
          rows.push([
            employee.name,
            employee.position,
            employee.salary,
          ]);
        }
      );

      exportCSV(
        "EmployeeReport.csv",
        rows
      );
    };
      const exportFinancialSummary =
    () => {
      let purchase = 0;
      let feed = 0;
      let medicine = 0;
      let labour = 0;
      let other = 0;
      let sales = 0;

      animals.forEach(
        (animal) => {
          purchase +=
            Number(
              animal.purchasePrice
            ) || 0;

          feed +=
            Number(
              animal.feedCost
            ) || 0;

          medicine +=
            Number(
              animal.medicineCost
            ) || 0;

          labour +=
            Number(
              animal.laborCost
            ) || 0;

          other +=
            Number(
              animal.otherCost
            ) || 0;

          sales +=
            Number(
              animal.salePrice
            ) || 0;
        }
      );

      expenseLedger.forEach(
        (expense) => {
          other +=
            Number(
              expense.amount
            ) || 0;
        }
      );

      const totalInvestment =
        purchase +
        feed +
        medicine +
        labour +
        other;

      const profit =
        sales -
        totalInvestment;

      const rows = [
        [
          "Item",
          "Amount",
        ],
        [
          "Purchase Value",
          purchase,
        ],
        [
          "Feed Cost",
          feed,
        ],
        [
          "Medicine Cost",
          medicine,
        ],
        [
          "Labour Cost",
          labour,
        ],
        [
          "Other Expenses",
          other,
        ],
        [
          "Total Investment",
          totalInvestment,
        ],
        [
          "Total Sales",
          sales,
        ],
        [
          "Net Profit",
          profit,
        ],
      ];

      exportCSV(
        "FinancialSummary.csv",
        rows
      );
    };

  return (
    <div>
      <h1>
        📊 Reports V2
      </h1>

      <hr />

      <h2>
        Animal Reports
      </h2>

      <button
        onClick={
          exportAnimalInventory
        }
      >
        Animal Inventory
      </button>

      <br />
      <br />

      <button
        onClick={
          exportPregnancyReport
        }
      >
        Pregnancy Report
      </button>

      <br />
      <br />

      <button
        onClick={
          exportArchivedAnimals
        }
      >
        Archived Animals
      </button>

      <br />
      <br />

      <button
        onClick={
          exportCalvingReport
        }
      >
        Calving Report
      </button>

      <br />
      <br />

      <button
        onClick={
          exportHealthReport
        }
      >
        Health Report
      </button>

      <hr />

      <h2>
        Financial Reports
      </h2>

      <button
        onClick={
          exportFinancialSummary
        }
      >
        Financial Summary
      </button>

      <br />
      <br />

      <button
        onClick={
          exportTradingLedger
        }
      >
        Trading Ledger
      </button>

      <br />
      <br />

      <button
        onClick={
          exportVetLedger
        }
      >
        Veterinary Ledger
      </button>

      <br />
      <br />

      <button
        onClick={
          exportEmployeeReport
        }
      >
        Employee Report
      </button>

      <hr />

      <h2>
        Record Summary
      </h2>

      <p>
        Animals:{" "}
        {animals.length}
      </p>

      <p>
        Health Records:{" "}
        {
          healthRecords.length
        }
      </p>

      <p>
        Calving Records:{" "}
        {
          calvingRecords.length
        }
      </p>

      <p>
        Veterinary Bills:{" "}
        {vetBills.length}
      </p>

      <p>
        Veterinary Payments:{" "}
        {
          vetPayments.length
        }
      </p>

      <p>
        Employees:{" "}
        {employees.length}
      </p>

      <p>
        Salary Payments:{" "}
        {
          salaryPayments.length
        }
      </p>

      <p>
        Expense Records:{" "}
        {
          expenseLedger.length
        }
      </p>
    </div>
  );
}