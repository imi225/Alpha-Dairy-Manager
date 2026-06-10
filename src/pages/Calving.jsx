import { useState } from "react";

export default function Calving() {
  const animals =
    JSON.parse(
      localStorage.getItem("animals")
    ) || [];

  const today = new Date();

  const pregnantAnimals =
    animals.filter(
      (animal) =>
        animal.pregnant === true ||
        animal.pregnancyStatus ===
          "Pregnant"
    );

  const dueAnimals =
    pregnantAnimals.filter(
      (animal) => {
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
          days >= -30
        );
      }
    );

  const [selectedTag, setSelectedTag] =
    useState("");

  const [calfTag, setCalfTag] =
    useState("");

  const [calfName, setCalfName] =
    useState("");

  const [calfSex, setCalfSex] =
    useState("Female");

  const [birthWeight, setBirthWeight] =
    useState("");

  const [calvingDate, setCalvingDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const recordCalving = () => {
    if (
      !selectedTag ||
      !calfTag
    ) {
      alert(
        "Please select dam and enter calf tag."
      );
      return;
    }

    const duplicate =
      animals.find(
        (animal) =>
          animal.tagNumber ===
          calfTag
      );

    if (duplicate) {
      alert(
        "Calf tag already exists."
      );
      return;
    }

    const updatedAnimals =
      [...animals];

    const motherIndex =
      updatedAnimals.findIndex(
        (animal) =>
          animal.tagNumber ===
          selectedTag
      );

    if (
      motherIndex === -1
    ) {
      alert(
        "Mother not found."
      );
      return;
    }

    updatedAnimals[
      motherIndex
    ] = {
      ...updatedAnimals[
        motherIndex
      ],

      status:
        "Lactating",

      pregnant: false,

      pregnancyStatus:
        "Calved",

      expectedCalvingDate:
        "",

      aiDate: "",

      ultrasoundDate: "",
    };

    const calf = {
      tagNumber: calfTag,

      name: calfName,

      sex: calfSex,

      weight:
        Number(
          birthWeight
        ) || 0,

      birthDate:
        calvingDate,

      damTag:
        selectedTag,

      status: "Calf",

      purchasePrice: 0,

      feedCost: 0,

      medicineCost: 0,

      laborCost: 0,

      otherCost: 0,
    };

    updatedAnimals.push(
      calf
    );

    localStorage.setItem(
      "animals",
      JSON.stringify(
        updatedAnimals
      )
    );

    const calvingRecords =
      JSON.parse(
        localStorage.getItem(
          "calvingRecords"
        )
      ) || [];

    calvingRecords.push({
      damTag:
        selectedTag,

      calfTag,

      calfName,

      calfSex,

      birthWeight,

      calvingDate,
    });

    localStorage.setItem(
      "calvingRecords",
      JSON.stringify(
        calvingRecords
      )
    );

    alert(
      "Calving recorded successfully."
    );

    window.location.reload();
  };

  return (
    <div>
      <h1>
        🐮 Calving Module
      </h1>

      <hr />

      <h2>
        Due To Calve
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
              Expected Calving
            </th>
          </tr>
        </thead>

        <tbody>
          {dueAnimals.map(
            (animal) => (
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
                    animal.expectedCalvingDate
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr />

      <h2>
        Record Calving
      </h2>

      <select
        value={selectedTag}
        onChange={(e) =>
          setSelectedTag(
            e.target.value
          )
        }
      >
        <option value="">
          Select Dam
        </option>

        {pregnantAnimals.map(
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
        placeholder="Calf Tag"
        value={calfTag}
        onChange={(e) =>
          setCalfTag(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        placeholder="Calf Name"
        value={calfName}
        onChange={(e) =>
          setCalfName(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <select
        value={calfSex}
        onChange={(e) =>
          setCalfSex(
            e.target.value
          )
        }
      >
        <option value="Female">
          Female
        </option>

        <option value="Male">
          Male
        </option>
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Birth Weight (kg)"
        value={birthWeight}
        onChange={(e) =>
          setBirthWeight(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={calvingDate}
        onChange={(e) =>
          setCalvingDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          recordCalving
        }
      >
        Record Calving
      </button>
    </div>
  );
}