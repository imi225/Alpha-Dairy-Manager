import { useState } from "react";

export default function FeedInventory() {
  const [records, setRecords] = useState(() => {
    const saved =
      localStorage.getItem(
        "feedExpenses"
      );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [form, setForm] =
    useState({
      month: "",
      maizeSilage: "",
      barley: "",
      losan: "",
      wheatGrain: "",
      mineralMix: "",
      soda: "",
      otherFeed: "",
    });

  const saveRecord = () => {
    if (!form.month) {
      alert(
        "Please enter month"
      );
      return;
    }

    const totalCost =
      (Number(
        form.maizeSilage
      ) || 0) +
      (Number(form.barley) ||
        0) +
      (Number(form.losan) ||
        0) +
      (Number(
        form.wheatGrain
      ) || 0) +
      (Number(
        form.mineralMix
      ) || 0) +
      (Number(form.soda) ||
        0) +
      (Number(
        form.otherFeed
      ) || 0);

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

    const feedCostPerAnimal =
      activeAnimals.length > 0
        ? Math.round(
            totalCost /
              activeAnimals.length
          )
        : 0;

    const updatedAnimals =
      animals.map((animal) => {
        if (
          animal.status ===
          "Sold"
        ) {
          return animal;
        }

        return {
          ...animal,
          feedCost:
            (Number(
              animal.feedCost
            ) || 0) +
            feedCostPerAnimal,
        };
      });

    localStorage.setItem(
      "animals",
      JSON.stringify(
        updatedAnimals
      )
    );

    const newRecord = {
      ...form,
      totalCost,
      feedCostPerAnimal,
      dateCreated:
        new Date().toLocaleDateString(),
    };

    const updatedRecords = [
      ...records,
      newRecord,
    ];

    setRecords(
      updatedRecords
    );

    localStorage.setItem(
      "feedExpenses",
      JSON.stringify(
        updatedRecords
      )
    );

    alert(
      "Feed expenses saved successfully"
    );

    setForm({
      month: "",
      maizeSilage: "",
      barley: "",
      losan: "",
      wheatGrain: "",
      mineralMix: "",
      soda: "",
      otherFeed: "",
    });
  };

  const grandTotal =
    records.reduce(
      (sum, record) =>
        sum +
        Number(
          record.totalCost || 0
        ),
      0
    );

  return (
    <div>
      <h1>
        🌾 Feed Expenses
      </h1>

      <hr />

      <h2>
        Monthly Feed Entry
      </h2>

      <input
        placeholder="Month (e.g. June 2026)"
        value={form.month}
        onChange={(e) =>
          setForm({
            ...form,
            month:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Maize Silage Expense"
        value={
          form.maizeSilage
        }
        onChange={(e) =>
          setForm({
            ...form,
            maizeSilage:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Barley Expense"
        value={form.barley}
        onChange={(e) =>
          setForm({
            ...form,
            barley:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Losan Expense"
        value={form.losan}
        onChange={(e) =>
          setForm({
            ...form,
            losan:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Wheat Grain Expense"
        value={
          form.wheatGrain
        }
        onChange={(e) =>
          setForm({
            ...form,
            wheatGrain:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Mineral Mix Expense"
        value={
          form.mineralMix
        }
        onChange={(e) =>
          setForm({
            ...form,
            mineralMix:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Soda Expense"
        value={form.soda}
        onChange={(e) =>
          setForm({
            ...form,
            soda:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Other Feed Expense"
        value={
          form.otherFeed
        }
        onChange={(e) =>
          setForm({
            ...form,
            otherFeed:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <button
        onClick={saveRecord}
      >
        Save Feed Expenses
      </button>

      <hr />

      <h2>
        Feed Expense History
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Month</th>
            <th>
              Total Feed Cost
            </th>
            <th>
              Cost Per Animal
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map(
            (
              record,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {
                    record.month
                  }
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    record.totalCost
                  ).toLocaleString()}
                </td>

                <td>
                  Rs{" "}
                  {Number(
                    record.feedCostPerAnimal
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Total Feed Expenses
      </h2>

      <h3>
        Rs{" "}
        {grandTotal.toLocaleString()}
      </h3>
    </div>
  );
}