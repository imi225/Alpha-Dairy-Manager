import { useState } from "react";

export default function Health() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const herdTreatments =
    JSON.parse(
      localStorage.getItem(
        "herdTreatments"
      )
    ) || [];

  const individualTreatments =
    JSON.parse(
      localStorage.getItem(
        "individualTreatments"
      )
    ) || [];

  const today = new Date();

  const animalsOnFarm =
    animals.filter(
      (animal) =>
        animal.status !== "Sold"
    );

  const [treatmentType, setTreatmentType] =
    useState("FMD");

  const [customTreatment, setCustomTreatment] =
    useState("");

  const [treatmentDate, setTreatmentDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [nextDueDate, setNextDueDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [animalTag, setAnimalTag] =
    useState("");

  const [disease, setDisease] =
    useState("");

  const [treatment, setTreatment] =
    useState("");

  const [individualDate, setIndividualDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [individualNotes, setIndividualNotes] =
    useState("");

  const saveHerdTreatment = () => {
    const updated =
      [...herdTreatments];

    updated.push({
      treatmentType,
      customTreatment,
      treatmentDate,
      nextDueDate,
      notes,
    });

    localStorage.setItem(
      "herdTreatments",
      JSON.stringify(updated)
    );

    alert(
      "Herd treatment saved."
    );

    window.location.reload();
  };

  const saveIndividualTreatment =
    () => {
      if (!animalTag) {
        alert(
          "Select animal."
        );
        return;
      }

      const updated = [
        ...individualTreatments,
      ];

      updated.push({
        animalTag,
        disease,
        treatment,
        date:
          individualDate,
        notes:
          individualNotes,
      });

      localStorage.setItem(
        "individualTreatments",
        JSON.stringify(updated)
      );

      alert(
        "Individual treatment saved."
      );

      window.location.reload();
    };

  const dueTreatments =
    herdTreatments.filter(
      (record) =>
        record.nextDueDate &&
        new Date(
          record.nextDueDate
        ) <= today
    );

  return (
    <div>
      <h1>
        🩺 Health Management
      </h1>

      <hr />

      <h2>
        Health Dashboard
      </h2>

      <p>
        <strong>
          Animals On Farm:
        </strong>{" "}
        {
          animalsOnFarm.length
        }
      </p>

      <p>
        <strong>
          Herd Treatments:
        </strong>{" "}
        {
          herdTreatments.length
        }
      </p>

      <p>
        <strong>
          Individual Treatments:
        </strong>{" "}
        {
          individualTreatments.length
        }
      </p>

      <p>
        <strong>
          Due Treatments:
        </strong>{" "}
        {
          dueTreatments.length
        }
      </p>

      <hr />

      <h2>
        Herd Treatment
      </h2>

      <select
        value={
          treatmentType
        }
        onChange={(e) =>
          setTreatmentType(
            e.target.value
          )
        }
      >
        <option value="FMD">
          FMD Vaccination
        </option>

        <option value="LSD">
          Lumpy Skin Vaccination
        </option>

        <option value="Mites">
          Mite Control
        </option>

        <option value="Deworming">
          Deworming
        </option>

        <option value="Other">
          Other Treatment
        </option>
      </select>

      {treatmentType ===
        "Other" && (
        <>
          <br />
          <br />

          <input
            placeholder="Treatment Name"
            value={
              customTreatment
            }
            onChange={(e) =>
              setCustomTreatment(
                e.target.value
              )
            }
          />
        </>
      )}

      <br />
      <br />

      <label>
        Treatment Date
      </label>

      <br />

      <input
        type="date"
        value={
          treatmentDate
        }
        onChange={(e) =>
          setTreatmentDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <label>
        Next Due Date
      </label>

      <br />

      <input
        type="date"
        value={
          nextDueDate
        }
        onChange={(e) =>
          setNextDueDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          saveHerdTreatment
        }
      >
        Save Herd Treatment
      </button>

      <hr />

      <h2>
        Individual Animal Treatment
      </h2>

      <select
        value={animalTag}
        onChange={(e) =>
          setAnimalTag(
            e.target.value
          )
        }
      >
        <option value="">
          Select Animal
        </option>

        {animalsOnFarm.map(
          (animal) => (
            <option
              key={
                animal.tagNumber
              }
              value={
                animal.tagNumber
              }
            >
              {
                animal.tagNumber
              }{" "}
              -{" "}
              {animal.name ||
                "Unnamed"}
            </option>
          )
        )}
      </select>

      <br />
      <br />

      <input
        placeholder="Disease"
        value={disease}
        onChange={(e) =>
          setDisease(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        placeholder="Treatment"
        value={treatment}
        onChange={(e) =>
          setTreatment(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={
          individualDate
        }
        onChange={(e) =>
          setIndividualDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Notes"
        value={
          individualNotes
        }
        onChange={(e) =>
          setIndividualNotes(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          saveIndividualTreatment
        }
      >
        Save Individual Treatment
      </button>

      <hr />

      <h2>
        Due Treatments
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>
              Treatment
            </th>
            <th>
              Next Due Date
            </th>
          </tr>
        </thead>

        <tbody>
          {dueTreatments.map(
            (
              record,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {record.treatmentType ===
                  "Other"
                    ? record.customTreatment
                    : record.treatmentType}
                </td>

                <td>
                  {
                    record.nextDueDate
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Herd Treatment History
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>
              Treatment
            </th>
            <th>Date</th>
            <th>
              Next Due
            </th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {herdTreatments.map(
            (
              record,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {record.treatmentType ===
                  "Other"
                    ? record.customTreatment
                    : record.treatmentType}
                </td>

                <td>
                  {
                    record.treatmentDate
                  }
                </td>

                <td>
                  {
                    record.nextDueDate
                  }
                </td>

                <td>
                  {record.notes}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Individual Treatment History
      </h2>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>
              Animal
            </th>
            <th>
              Disease
            </th>
            <th>
              Treatment
            </th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {individualTreatments.map(
            (
              record,
              index
            ) => (
              <tr
                key={index}
              >
                <td>
                  {
                    record.animalTag
                  }
                </td>

                <td>
                  {
                    record.disease
                  }
                </td>

                <td>
                  {
                    record.treatment
                  }
                </td>

                <td>
                  {record.date}
                </td>

                <td>
                  {record.notes}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}