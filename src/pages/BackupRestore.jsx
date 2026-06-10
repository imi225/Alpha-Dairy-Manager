export default function BackupRestore() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const healthRecords =
    JSON.parse(
      localStorage.getItem(
        "healthRecords"
      )
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

  const downloadBackup =
    () => {
      const backupData = {
        backupDate:
          new Date().toISOString(),

        animals,

        healthRecords,

        breedingRecords,

        calvingRecords,

        vetBills,

        vetPayments,

        employees,

        salaryPayments,

        expenseLedger,
      };

      const blob =
        new Blob(
          [
            JSON.stringify(
              backupData,
              null,
              2
            ),
          ],
          {
            type:
              "application/json",
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
        `AlphaDairyBackup_${
          new Date()
            .toISOString()
            .split("T")[0]
        }.json`;

      link.click();

      URL.revokeObjectURL(
        url
      );
    };

  const restoreBackup =
    (event) => {
      const file =
        event.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        (e) => {
          try {
            const data =
              JSON.parse(
                e.target.result
              );

            if (
              !data.animals
            ) {
              alert(
                "Invalid backup file."
              );
              return;
            }

            const confirmRestore =
              window.confirm(
                "This will replace ALL current farm data. Continue?"
              );

            if (
              !confirmRestore
            )
              return;

            localStorage.setItem(
              "animals",
              JSON.stringify(
                data.animals ||
                  []
              )
            );

            localStorage.setItem(
              "healthRecords",
              JSON.stringify(
                data.healthRecords ||
                  []
              )
            );

            localStorage.setItem(
              "breedingRecords",
              JSON.stringify(
                data.breedingRecords ||
                  []
              )
            );

            localStorage.setItem(
              "calvingRecords",
              JSON.stringify(
                data.calvingRecords ||
                  []
              )
            );

            localStorage.setItem(
              "vetBills",
              JSON.stringify(
                data.vetBills ||
                  []
              )
            );

            localStorage.setItem(
              "vetPayments",
              JSON.stringify(
                data.vetPayments ||
                  []
              )
            );

            localStorage.setItem(
              "employees",
              JSON.stringify(
                data.employees ||
                  []
              )
            );

            localStorage.setItem(
              "salaryPayments",
              JSON.stringify(
                data.salaryPayments ||
                  []
              )
            );

            localStorage.setItem(
              "expenseLedger",
              JSON.stringify(
                data.expenseLedger ||
                  []
              )
            );

            alert(
              "Backup restored successfully."
            );

            window.location.reload();
          } catch {
            alert(
              "Invalid backup file."
            );
          }
        };

      reader.readAsText(
        file
      );
    };

  return (
    <div>
      <h1>
        💾 Backup &
        Restore
      </h1>

      <hr />

      <h2>
        System Status
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
        Breeding Records:{" "}
        {
          breedingRecords.length
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

      <hr />

      <h2>
        Download Full
        Backup
      </h2>

      <p>
        Download a full
        backup of Alpha
        Dairy Manager.
      </p>

      <button
        onClick={
          downloadBackup
        }
      >
        Download Backup
      </button>

      <hr />

      <h2>
        Restore Backup
      </h2>

      <p>
        Select a backup
        JSON file to
        restore all farm
        records.
      </p>

      <input
        type="file"
        accept=".json"
        onChange={
          restoreBackup
        }
      />

      <hr />

      <h2>
        Backup Includes
      </h2>

      <ul>
        <li>
          Animals
        </li>

        <li>
          Breeding Records
        </li>

        <li>
          Health Records
        </li>

        <li>
          Calving Records
        </li>

        <li>
          Veterinary Bills
        </li>

        <li>
          Veterinary Payments
        </li>

        <li>
          Employees
        </li>

        <li>
          Salary Payments
        </li>

        <li>
          Expense Ledger
        </li>
      </ul>
    </div>
  );
}