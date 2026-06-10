import { useState } from "react";

export default function ExpenseLedger() {
  const [expenses, setExpenses] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "expenseLedger"
          )
        ) || []
      );
    });

  const [category, setCategory] =
    useState("Electricity");

  const [date, setDate] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [description, setDescription] =
    useState("");

  const saveExpense = () => {
    if (!date || !amount) {
      alert(
        "Please complete all required fields"
      );
      return;
    }

    const newExpense = {
      id: Date.now(),
      category,
      date,
      amount:
        Number(amount),
      description,
    };

    const updatedExpenses = [
      ...expenses,
      newExpense,
    ];

    setExpenses(
      updatedExpenses
    );

    localStorage.setItem(
      "expenseLedger",
      JSON.stringify(
        updatedExpenses
      )
    );

    alert(
      "Expense Saved Successfully"
    );

    setCategory(
      "Electricity"
    );
    setDate("");
    setAmount("");
    setDescription("");
  };

  const deleteExpense = (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this expense?"
      )
    )
      return;

    const updatedExpenses =
      expenses.filter(
        (expense) =>
          expense.id !== id
      );

    setExpenses(
      updatedExpenses
    );

    localStorage.setItem(
      "expenseLedger",
      JSON.stringify(
        updatedExpenses
      )
    );
  };

  const totalElectricity =
    expenses
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

  const totalRepair =
    expenses
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

  const totalSupplies =
    expenses
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

  const totalOther =
    expenses
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

  const grandTotal =
    expenses.reduce(
      (sum, e) =>
        sum +
        Number(
          e.amount || 0
        ),
      0
    );

  const monthlyTotals = {};

  expenses.forEach(
    (expense) => {
      const month =
        expense.date?.slice(
          0,
          7
        ) || "Unknown";

      monthlyTotals[
        month
      ] =
        (monthlyTotals[
          month
        ] || 0) +
        Number(
          expense.amount
        );
    }
  );

  return (
    <div>
      <h1>
        🧾 Expense Ledger
      </h1>

      <hr />

      <h2>
        Add Expense
      </h2>

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
      >
        <option>
          Electricity
        </option>

        <option>
          Repair & Maintenance
        </option>

        <option>
          Farm Supplies
        </option>

        <option>
          Other
        </option>
      </select>

      <br />
      <br />

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          saveExpense
        }
      >
        Save Expense
      </button>

      <hr />

      <h2>
        Expense Summary
      </h2>

      <p>
        Electricity:
        Rs{" "}
        {totalElectricity.toLocaleString()}
      </p>

      <p>
        Repair &
        Maintenance:
        Rs{" "}
        {totalRepair.toLocaleString()}
      </p>

      <p>
        Farm Supplies:
        Rs{" "}
        {totalSupplies.toLocaleString()}
      </p>

      <p>
        Other:
        Rs{" "}
        {totalOther.toLocaleString()}
      </p>

      <h2>
        Total Farm
        Overheads:
        Rs{" "}
        {grandTotal.toLocaleString()}
      </h2>

      <hr />

      <h2>
        Monthly Expense
        Summary
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Month</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(
            monthlyTotals
          ).map(
            (
              [
                month,
                total,
              ],
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {month}
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    total
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Expense History
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>
              Category
            </th>
            <th>
              Amount
            </th>
            <th>
              Description
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(
            (
              expense
            ) => (
              <tr
                key={
                  expense.id
                }
              >
                <td>
                  {
                    expense.date
                  }
                </td>

                <td>
                  {
                    expense.category
                  }
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    expense.amount
                  ).toLocaleString()}
                </td>

                <td>
                  {
                    expense.description
                  }
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}