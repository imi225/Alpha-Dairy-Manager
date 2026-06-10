import { useState } from "react";

export default function Breeding() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("breedingRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const animals =
    JSON.parse(localStorage.getItem("animals")) || [];

  const eligibleAnimals = animals.filter(
    (animal) =>
      animal.status !== "Sold" &&
      !animal.pregnant
  );

  const [form, setForm] = useState({
    tagNumber: "",
    aiDate: "",
    semenType: "",
    semenCost: "",
    technician: "",
    aiCharges: "",
    serviceNumber: 1,
  });

  const saveRecord = () => {
    if (!form.tagNumber || !form.aiDate) {
      alert("Tag Number and AI Date are required");
      return;
    }

    const ultrasoundDate = new Date(form.aiDate);
    ultrasoundDate.setDate(
      ultrasoundDate.getDate() + 30
    );

    const expectedCalvingDate = new Date(
      form.aiDate
    );

    expectedCalvingDate.setDate(
      expectedCalvingDate.getDate() + 280
    );

    const newRecord = {
      ...form,

      status: "Waiting",

      ultrasoundDate: ultrasoundDate
        .toISOString()
        .split("T")[0],

      expectedCalvingDate:
        expectedCalvingDate
          .toISOString()
          .split("T")[0],
    };

    const updatedRecords = [
      ...records,
      newRecord,
    ];

    setRecords(updatedRecords);

    localStorage.setItem(
      "breedingRecords",
      JSON.stringify(updatedRecords)
    );

    const updatedAnimals = animals.map(
      (animal) => {
        if (
          animal.tagNumber === form.tagNumber
        ) {
          return {
            ...animal,

            aiDate: form.aiDate,

            semenType: form.semenType,

            technician: form.technician,

            ultrasoundDate:
              ultrasoundDate
                .toISOString()
                .split("T")[0],

            expectedCalvingDate:
              expectedCalvingDate
                .toISOString()
                .split("T")[0],

            pregnancyStatus: "Waiting",

            otherCost:
              (Number(
                animal.otherCost
              ) || 0) +
              (Number(
                form.semenCost
              ) || 0) +
              (Number(
                form.aiCharges
              ) || 0),
          };
        }

        return animal;
      }
    );

    localStorage.setItem(
      "animals",
      JSON.stringify(updatedAnimals)
    );

    alert("AI Record Saved");

    setForm({
      tagNumber: "",
      aiDate: "",
      semenType: "",
      semenCost: "",
      technician: "",
      aiCharges: "",
      serviceNumber: 1,
    });
  };

  const markPregnant = (index) => {
    const updatedRecords = [...records];

    updatedRecords[index].status =
      "Pregnant";

    setRecords(updatedRecords);

    localStorage.setItem(
      "breedingRecords",
      JSON.stringify(updatedRecords)
    );

    const updatedAnimals = animals.map(
      (animal) => {
        if (
          animal.tagNumber ===
          updatedRecords[index].tagNumber
        ) {
          return {
            ...animal,
            pregnant: true,
            pregnancyStatus: "Pregnant",
          };
        }

        return animal;
      }
    );

    localStorage.setItem(
      "animals",
      JSON.stringify(updatedAnimals)
    );
  };

  const markRepeatAI = (index) => {
    const updatedRecords = [...records];

    updatedRecords[index].status =
      "Repeat AI Required";

    setRecords(updatedRecords);

    localStorage.setItem(
      "breedingRecords",
      JSON.stringify(updatedRecords)
    );

    const updatedAnimals = animals.map(
      (animal) => {
        if (
          animal.tagNumber ===
          updatedRecords[index].tagNumber
        ) {
          return {
            ...animal,
            pregnant: false,
            pregnancyStatus:
              "Repeat AI Required",
          };
        }

        return animal;
      }
    );

    localStorage.setItem(
      "animals",
      JSON.stringify(updatedAnimals)
    );
  };

  return (
    <div>
      <h1>Breeding Module</h1>

      <h2>Eligible For Breeding</h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>Name</th>
            <th>Status</th>
            <th>Weight</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {eligibleAnimals.map(
            (animal, index) => (
              <tr key={index}>
                <td>
                  {animal.tagNumber}
                </td>

                <td>
                  {animal.name}
                </td>

                <td>
                  {animal.status}
                </td>

                <td>
                  {animal.weight}
                </td>

                <td>
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        tagNumber:
                          animal.tagNumber,
                      })
                    }
                  >
                    Record AI
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Artificial Insemination
      </h2>

      <input
        placeholder="Tag Number"
        value={form.tagNumber}
        onChange={(e) =>
          setForm({
            ...form,
            tagNumber:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={form.aiDate}
        onChange={(e) =>
          setForm({
            ...form,
            aiDate:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Semen Type"
        value={form.semenType}
        onChange={(e) =>
          setForm({
            ...form,
            semenType:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Semen Cost"
        value={form.semenCost}
        onChange={(e) =>
          setForm({
            ...form,
            semenCost:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Technician"
        value={form.technician}
        onChange={(e) =>
          setForm({
            ...form,
            technician:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="AI Charges"
        value={form.aiCharges}
        onChange={(e) =>
          setForm({
            ...form,
            aiCharges:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={form.serviceNumber}
        onChange={(e) =>
          setForm({
            ...form,
            serviceNumber:
              e.target.value,
          })
        }
      >
        <option value="1">
          1st Service
        </option>

        <option value="2">
          2nd Service
        </option>

        <option value="3">
          3rd Service
        </option>

        <option value="4">
          4th Service
        </option>
      </select>

      <br />
      <br />

      <button onClick={saveRecord}>
        Save AI Record
      </button>

      <hr />

      <h2>AI Records</h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Tag</th>
            <th>AI Date</th>
            <th>Ultrasound Due</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map(
            (record, index) => (
              <tr key={index}>
                <td>
                  {record.tagNumber}
                </td>

                <td>
                  {record.aiDate}
                </td>

                <td>
                  {
                    record.ultrasoundDate
                  }
                </td>

                <td>
                  {record.status}
                </td>

                <td>
                  <button
                    onClick={() =>
                      markPregnant(
                        index
                      )
                    }
                  >
                    Pregnant
                  </button>

                  <button
                    style={{
                      marginLeft:
                        "10px",
                    }}
                    onClick={() =>
                      markRepeatAI(
                        index
                      )
                    }
                  >
                    Repeat AI Required
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