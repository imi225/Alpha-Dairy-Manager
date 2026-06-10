import { useState } from "react";

export default function VeterinaryLedger() {
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

  const animalsOnFarm =
    animals.filter(
      (animal) =>
        animal.status !== "Sold"
    );

  const [month, setMonth] =
    useState("");

  const [year, setYear] =
    useState(
      new Date().getFullYear()
    );

  const [billAmount, setBillAmount] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [paymentDate, setPaymentDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const [paymentRemarks, setPaymentRemarks] =
    useState("");

  const totalBills =
    vetBills.reduce(
      (sum, bill) =>
        sum +
        Number(
          bill.billAmount || 0
        ),
      0
    );

  const totalPayments =
    vetPayments.reduce(
      (sum, payment) =>
        sum +
        Number(
          payment.amount || 0
        ),
      0
    );

  const amountDue =
    totalBills -
    totalPayments;

  const saveBill = () => {
    if (
      !month ||
      !year ||
      !billAmount
    ) {
      alert(
        "Please complete all fields."
      );
      return;
    }

    const duplicate =
      vetBills.find(
        (bill) =>
          bill.month ===
            month &&
          bill.year === year
      );

    if (duplicate) {
      alert(
        "Bill already exists for this month."
      );
      return;
    }

    const totalBill =
      Number(
        billAmount
      );

    const animalCount =
      animalsOnFarm.length;

    const costPerAnimal =
      animalCount > 0
        ? totalBill /
          animalCount
        : 0;

    const updatedAnimals =
      animals.map(
        (animal) => {
          if (
            animal.status ===
            "Sold"
          ) {
            return animal;
          }

          return {
            ...animal,

            medicineCost:
              (Number(
                animal.medicineCost
              ) || 0) +
              costPerAnimal,
          };
        }
      );

    localStorage.setItem(
      "animals",
      JSON.stringify(
        updatedAnimals
      )
    );

    const updatedBills =
      [
        ...vetBills,
        {
          month,
          year,
          billAmount:
            totalBill,
          animalCount,
          costPerAnimal,
          remarks,
        },
      ];

    localStorage.setItem(
      "vetBills",
      JSON.stringify(
        updatedBills
      )
    );

    alert(
      "Monthly bill saved."
    );

    window.location.reload();
  };

  const savePayment =
    () => {
      if (
        !paymentAmount
      ) {
        alert(
          "Enter payment amount."
        );
        return;
      }

      const updatedPayments =
        [
          ...vetPayments,
          {
            date:
              paymentDate,
            amount:
              Number(
                paymentAmount
              ),
            remarks:
              paymentRemarks,
          },
        ];

      localStorage.setItem(
        "vetPayments",
        JSON.stringify(
          updatedPayments
        )
      );

      alert(
        "Payment recorded."
      );

      window.location.reload();
    };

  return (
    <div>
      <h1>
        🩺 Veterinary Ledger
      </h1>

      <hr />

      <h2>
        Account Summary
      </h2>

      <p>
        <strong>
          Total Bills:
        </strong>{" "}
        Rs{" "}
        {totalBills.toLocaleString()}
      </p>

      <p>
        <strong>
          Total Payments:
        </strong>{" "}
        Rs{" "}
        {totalPayments.toLocaleString()}
      </p>

      <h2>
        Outstanding Amount:
        Rs{" "}
        {amountDue.toLocaleString()}
      </h2>

      <hr />

      <h2>
        Monthly Bill Entry
      </h2>

      <select
        value={month}
        onChange={(e) =>
          setMonth(
            e.target.value
          )
        }
      >
        <option value="">
          Select Month
        </option>

        <option>
          January
        </option>

        <option>
          February
        </option>

        <option>
          March
        </option>

        <option>
          April
        </option>

        <option>
          May
        </option>

        <option>
          June
        </option>

        <option>
          July
        </option>

        <option>
          August
        </option>

        <option>
          September
        </option>

        <option>
          October
        </option>

        <option>
          November
        </option>

        <option>
          December
        </option>
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) =>
          setYear(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Bill Amount"
        value={
          billAmount
        }
        onChange={(e) =>
          setBillAmount(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Remarks"
        value={remarks}
        onChange={(e) =>
          setRemarks(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          saveBill
        }
      >
        Save Monthly Bill
      </button>

      <hr />

      <h2>
        Record Payment
      </h2>

      <input
        type="date"
        value={
          paymentDate
        }
        onChange={(e) =>
          setPaymentDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount Paid"
        value={
          paymentAmount
        }
        onChange={(e) =>
          setPaymentAmount(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Remarks"
        value={
          paymentRemarks
        }
        onChange={(e) =>
          setPaymentRemarks(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          savePayment
        }
      >
        Record Payment
      </button>

      <hr />

      <h2>
        Monthly Bills
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
              Year
            </th>

            <th>
              Bill
            </th>

            <th>
              Animals
            </th>

            <th>
              Cost /
              Animal
            </th>

            <th>
              Remarks
            </th>
          </tr>
        </thead>

        <tbody>
          {vetBills.map(
            (
              bill,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {
                    bill.month
                  }
                </td>

                <td>
                  {
                    bill.year
                  }
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    bill.billAmount
                  ).toLocaleString()}
                </td>

                <td>
                  {
                    bill.animalCount
                  }
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    bill.costPerAnimal
                  ).toFixed(
                    2
                  )}
                </td>

                <td>
                  {
                    bill.remarks
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Payment History
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>
              Date
            </th>

            <th>
              Amount
            </th>

            <th>
              Remarks
            </th>
          </tr>
        </thead>

        <tbody>
          {vetPayments.map(
            (
              payment,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {
                    payment.date
                  }
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    payment.amount
                  ).toLocaleString()}
                </td>

                <td>
                  {
                    payment.remarks
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