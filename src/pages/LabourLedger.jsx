import { useState } from "react";

export default function LabourLedger() {
  const [employees, setEmployees] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "employees"
          )
        ) || []
      );
    });

  const [payments, setPayments] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "salaryPayments"
          )
        ) || []
      );
    });

  const [employeeName, setEmployeeName] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [monthlySalary, setMonthlySalary] =
    useState("");

  const [selectedEmployee, setSelectedEmployee] =
    useState("");

  const [month, setMonth] =
    useState("");

  const [amountPaid, setAmountPaid] =
    useState("");

  const addEmployee = () => {
    if (
      !employeeName ||
      !monthlySalary
    ) {
      alert(
        "Enter employee details"
      );
      return;
    }

    const updatedEmployees = [
      ...employees,
      {
        id: Date.now(),
        employeeName,
        position,
        monthlySalary:
          Number(monthlySalary),
      },
    ];

    setEmployees(
      updatedEmployees
    );

    localStorage.setItem(
      "employees",
      JSON.stringify(
        updatedEmployees
      )
    );

    setEmployeeName("");
    setPosition("");
    setMonthlySalary("");
  };

  const savePayment = () => {
    if (
      !selectedEmployee ||
      !month ||
      !amountPaid
    ) {
      alert(
        "Complete all fields"
      );
      return;
    }

    const employee =
      employees.find(
        (e) =>
          e.id ===
          Number(
            selectedEmployee
          )
      );

    if (!employee) return;

    const paidAmount =
      Number(amountPaid);

    const existingIndex =
      payments.findIndex(
        (p) =>
          p.employeeId ===
            employee.id &&
          p.month === month
      );

    let updatedPayments =
      [...payments];

    if (
      existingIndex >= 0
    ) {
      const existing =
        updatedPayments[
          existingIndex
        ];

      const newPaid =
        existing.amountPaid +
        paidAmount;

      updatedPayments[
        existingIndex
      ] = {
        ...existing,
        amountPaid:
          newPaid,
        remaining:
          existing.salaryDue -
          newPaid,
      };
    } else {
      updatedPayments.push({
        id: Date.now(),
        employeeId:
          employee.id,
        employeeName:
          employee.employeeName,
        month,
        salaryDue:
          employee.monthlySalary,
        amountPaid:
          paidAmount,
        remaining:
          employee.monthlySalary -
          paidAmount,
      });
    }

    setPayments(
      updatedPayments
    );

    localStorage.setItem(
      "salaryPayments",
      JSON.stringify(
        updatedPayments
      )
    );

    const animals =
      JSON.parse(
        localStorage.getItem(
          "animals"
        )
      ) || [];

    const activeAnimals =
      animals.filter(
        (animal) =>
          animal.status !==
          "Sold"
      );

    if (
      activeAnimals.length > 0
    ) {
      const perAnimal =
        Math.round(
          paidAmount /
            activeAnimals.length
        );

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
              laborCost:
                (Number(
                  animal.laborCost
                ) || 0) +
                perAnimal,
            };
          }
        );

      localStorage.setItem(
        "animals",
        JSON.stringify(
          updatedAnimals
        )
      );
    }

    alert(
      "Payment Saved"
    );

    setSelectedEmployee("");
    setMonth("");
    setAmountPaid("");
  };

  const totalDue =
    payments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.salaryDue || 0
        ),
      0
    );

  const totalPaid =
    payments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.amountPaid || 0
        ),
      0
    );

  const totalRemaining =
    payments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.remaining || 0
        ),
      0
    );

  return (
    <div>
      <h1>
        👨‍🌾 Labour Ledger
      </h1>

      <hr />

      <h2>
        Add Employee
      </h2>

      <input
        placeholder="Employee Name"
        value={employeeName}
        onChange={(e) =>
          setEmployeeName(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        placeholder="Position"
        value={position}
        onChange={(e) =>
          setPosition(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Monthly Salary"
        value={monthlySalary}
        onChange={(e) =>
          setMonthlySalary(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          addEmployee
        }
      >
        Add Employee
      </button>

      <hr />

      <h2>
        Salary Payment
      </h2>

      <select
        value={
          selectedEmployee
        }
        onChange={(e) =>
          setSelectedEmployee(
            e.target.value
          )
        }
      >
        <option value="">
          Select Employee
        </option>

        {employees.map(
          (employee) => (
            <option
              key={
                employee.id
              }
              value={
                employee.id
              }
            >
              {
                employee.employeeName
              }
            </option>
          )
        )}
      </select>

      <br />
      <br />

      <input
        placeholder="Month (e.g. June 2026)"
        value={month}
        onChange={(e) =>
          setMonth(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount Paid"
        value={amountPaid}
        onChange={(e) =>
          setAmountPaid(
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
        Save Payment
      </button>

      <hr />

      <h2>
        Labour Summary
      </h2>

      <p>
        Total Salary Due:
        Rs{" "}
        {totalDue.toLocaleString()}
      </p>

      <p>
        Total Salary Paid:
        Rs{" "}
        {totalPaid.toLocaleString()}
      </p>

      <p>
        Outstanding:
        Rs{" "}
        {totalRemaining.toLocaleString()}
      </p>

      <hr />

      <h2>
        Salary Ledger
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>
              Employee
            </th>
            <th>
              Month
            </th>
            <th>
              Salary Due
            </th>
            <th>
              Total Paid
            </th>
            <th>
              Remaining
            </th>
          </tr>
        </thead>

        <tbody>
          {payments.map(
            (payment) => (
              <tr
                key={
                  payment.id
                }
              >
                <td>
                  {
                    payment.employeeName
                  }
                </td>

                <td>
                  {
                    payment.month
                  }
                </td>

                <td>
                  Rs{" "}
                  {payment.salaryDue.toLocaleString()}
                </td>

                <td>
                  Rs{" "}
                  {payment.amountPaid.toLocaleString()}
                </td>

                <td>
                  Rs{" "}
                  {payment.remaining.toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}