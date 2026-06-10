import { useParams } from "react-router-dom";
import { useState } from "react";

import AnimalHealthHistory from "../components/AnimalHealthHistory";
import AnimalCalvingHistory from "../components/AnimalCalvingHistory";

export default function AnimalProfile() {
  const { tagNumber } =
    useParams();

  const animals =
    JSON.parse(
      localStorage.getItem(
        "animals"
      )
    ) || [];

  const animalIndex =
    animals.findIndex(
      (animal) =>
        animal.tagNumber ===
        tagNumber
    );

  const animal =
    animals[animalIndex];

  const [feedCost, setFeedCost] =
    useState("");

  const [laborCost, setLaborCost] =
    useState("");

  const [otherCost, setOtherCost] =
    useState("");

  const [salePrice, setSalePrice] =
    useState(
      animal?.salePrice || ""
    );

  const [saleDate, setSaleDate] =
    useState(
      animal?.saleDate || ""
    );

  const [editAnimal, setEditAnimal] =
    useState({
      name:
        animal?.name || "",

      breed:
        animal?.breed || "",

      animalSource:
        animal?.animalSource ||
        "Purchased",

      purchaseDate:
        animal?.purchaseDate ||
        "",

      purchasePrice:
        animal?.purchasePrice ||
        "",

      weight:
        animal?.weight || "",

      status:
        animal?.status ||
        "Heifer",
      notes:
        animal?.notes || "",

      aiDate:
        animal?.aiDate || "",

      technician:
        animal?.technician ||
        "",

      semenType:
        animal?.semenType ||
        "",

      pregnancyStatus:
        animal?.pregnancyStatus ||
        "Not Inseminated",

      ultrasoundDate:
        animal?.ultrasoundDate ||
        "",

      expectedCalvingDate:
        animal?.expectedCalvingDate ||
        "",
    });

  if (!animal) {
    return (
      <h2>
        Animal not found
      </h2>
    );
  }

  const purchasePrice =
    Number(
      animal.purchasePrice
    ) || 0;

  const feed =
    Number(
      animal.feedCost
    ) || 0;

  const medicine =
    Number(
      animal.medicineCost
    ) || 0;

  const labour =
    Number(
      animal.laborCost
    ) || 0;

  const other =
    Number(
      animal.otherCost
    ) || 0;

  const sale =
    Number(
      animal.salePrice
    ) || 0;

  const totalInvestment =
    purchasePrice +
    feed +
    medicine +
    labour +
    other;

  const profit =
    sale -
    totalInvestment;

  let daysSinceAI = "-";

  if (animal.aiDate) {
    daysSinceAI =
      Math.floor(
        (new Date() -
          new Date(
            animal.aiDate
          )) /
          (1000 *
            60 *
            60 *
            24)
      );
  }

  let daysToCalving =
    "-";

  if (
    animal.expectedCalvingDate
  ) {
    daysToCalving =
      Math.floor(
        (new Date(
          animal.expectedCalvingDate
        ) -
          new Date()) /
          (1000 *
            60 *
            60 *
            24)
      );
  }

  const calves =
    animals.filter(
      (a) =>
        a.motherTag ===
        animal.tagNumber
    );

  const saveAnimals = (
    updatedAnimal
  ) => {
    const updatedAnimals =
      [...animals];

    updatedAnimals[
      animalIndex
    ] = updatedAnimal;

    localStorage.setItem(
      "animals",
      JSON.stringify(
        updatedAnimals
      )
    );

    window.location.reload();
  };

  const updateAnimal = () => {
    saveAnimals({
      ...animal,

      name:
        editAnimal.name,

      breed:
        editAnimal.breed,

      animalSource:
        editAnimal.animalSource,

        purchaseDate:
        editAnimal.purchaseDate,

      purchasePrice:
        editAnimal.purchasePrice,

      weight:
        editAnimal.weight,

      status:
        editAnimal.status,

        notes:
        editAnimal.notes,

      aiDate:
        editAnimal.aiDate,

      technician:
        editAnimal.technician,

      semenType:
        editAnimal.semenType,

      pregnancyStatus:
        editAnimal.pregnancyStatus,

      ultrasoundDate:
        editAnimal.ultrasoundDate,

      expectedCalvingDate:
        editAnimal.expectedCalvingDate,
    });

    alert(
      "Animal Updated Successfully"
    );
  };
    const archiveAnimal = () => {
    saveAnimals({
      ...animal,
      archived: true,
    });

    alert(
      "Animal Archived"
    );
  };

  const addFeedCost = () => {
    if (!feedCost) return;

    saveAnimals({
      ...animal,
      feedCost:
        feed +
        Number(feedCost),
    });
  };

  const addLaborCost = () => {
    if (!laborCost) return;

    saveAnimals({
      ...animal,
      laborCost:
        labour +
        Number(laborCost),
    });
  };

  const addOtherCost = () => {
    if (!otherCost) return;

    saveAnimals({
      ...animal,
      otherCost:
        other +
        Number(otherCost),
    });
  };

  const sellAnimal = () => {
    if (!salePrice) {
      alert(
        "Enter Sale Price"
      );
      return;
    }

    saveAnimals({
      ...animal,
      status: "Sold",
      salePrice,
      saleDate,
    });

    alert(
      "Animal Marked Sold"
    );
  };

  return (
    <div>
      <h1>
        🐄 Animal Profile -
        Tag {animal.tagNumber}
      </h1>

      <hr />

      <h2>
        Animal Information
      </h2>

      <input
        placeholder="Name"
        value={editAnimal.name}
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            name:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Breed"
        value={
          editAnimal.breed
        }
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            breed:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={
          editAnimal.animalSource
        }
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            animalSource:
              e.target.value,
          })
        }
      >
        <option>
          Purchased
        </option>

        <option>
          Born on Farm
        </option>
      </select>

      <br />
      <br />
      <br />
      <br />

      <br />
      <br />

      <input
        type="date"
        value={
          editAnimal.purchaseDate
        }
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            purchaseDate:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Purchase Price"
        value={
          editAnimal.purchasePrice
        }
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            purchasePrice:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Weight"
        value={
          editAnimal.weight
        }
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            weight:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={
          editAnimal.status
        }
        onChange={(e) =>
          setEditAnimal({
            ...editAnimal,
            status:
              e.target.value,
          })
        }
      >
        <option>Calf</option>
        <option>Heifer</option>
        <option>
          Lactating
        </option>
        <option>Dry</option>
        <option>Sold</option>
      </select>

      <br />
      <br />

      <button
        onClick={
          updateAnimal
        }
      >
        Save Animal
      </button>

      <hr />

      <h2>
        Breeding Timeline
      </h2>

      <p>
        <strong>
          AI Date:
        </strong>{" "}
        {animal.aiDate || "-"}
      </p>

      <p>
        <strong>
          Days Since AI:
        </strong>{" "}
        {daysSinceAI}
      </p>

      <p>
        <strong>
          Technician:
        </strong>{" "}
        {animal.technician ||
          "-"}
      </p>

      <p>
        <strong>
          Semen Type:
        </strong>{" "}
        {animal.semenType ||
          "-"}
      </p>

      <p>
        <strong>
          Pregnancy Status:
        </strong>{" "}
        {
          animal.pregnancyStatus
        }
      </p>

      <p>
        <strong>
          Ultrasound Date:
        </strong>{" "}
        {animal.ultrasoundDate ||
          "-"}
      </p>

      <p>
        <strong>
          Expected Calving:
        </strong>{" "}
        {animal.expectedCalvingDate ||
          "-"}
      </p>

      <p>
        <strong>
          Days To Calving:
        </strong>{" "}
        {daysToCalving}
      </p>

      <hr />

      <h2>
        Recorded Calves
      </h2>

      <p>
        Total Calves:
        {calves.length}
      </p>
            {calves.length >
        0 && (
        <table
          border="1"
          cellPadding="8"
        >
          <thead>
            <tr>
              <th>Tag</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {calves.map(
              (
                calf,
                index
              ) => (
                <tr
                  key={index}
                >
                  <td>
                    {
                      calf.tagNumber
                    }
                  </td>

                  <td>
                    {calf.name}
                  </td>

                  <td>
                    {
                      calf.status
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      <hr />

      <AnimalHealthHistory
        tagNumber={
          animal.tagNumber
        }
      />

      <hr />

      <AnimalCalvingHistory
        tagNumber={
          animal.tagNumber
        }
      />

      <hr />

      <h2>
        Financial Ledger
      </h2>

      <p>
        Purchase Price:
        Rs{" "}
        {purchasePrice.toLocaleString()}
      </p>

      <p>
        Feed Cost:
        Rs{" "}
        {feed.toLocaleString()}
      </p>

      <p>
        Medicine Cost:
        Rs{" "}
        {medicine.toLocaleString()}
      </p>

      <p>
        Labour Cost:
        Rs{" "}
        {labour.toLocaleString()}
      </p>

      <p>
        Other Cost:
        Rs{" "}
        {other.toLocaleString()}
      </p>

      <h3>
        Total Investment:
        Rs{" "}
        {totalInvestment.toLocaleString()}
      </h3>

      <hr />

      <h2>
        Add Costs
      </h2>

      <input
        type="number"
        placeholder="Feed Cost"
        value={feedCost}
        onChange={(e) =>
          setFeedCost(
            e.target.value
          )
        }
      />

      <button
        onClick={
          addFeedCost
        }
      >
        Add Feed Cost
      </button>

      <br />
      <br />

      <input
        type="number"
        placeholder="Labour Cost"
        value={laborCost}
        onChange={(e) =>
          setLaborCost(
            e.target.value
          )
        }
      />

      <button
        onClick={
          addLaborCost
        }
      >
        Add Labour Cost
      </button>

      <br />
      <br />

      <input
        type="number"
        placeholder="Other Cost"
        value={otherCost}
        onChange={(e) =>
          setOtherCost(
            e.target.value
          )
        }
      />

      <button
        onClick={
          addOtherCost
        }
      >
        Add Other Cost
      </button>

      <hr />

      <h2>
        Sale Center
      </h2>

      <input
        type="number"
        placeholder="Sale Price"
        value={salePrice}
        onChange={(e) =>
          setSalePrice(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={saleDate}
        onChange={(e) =>
          setSaleDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          sellAnimal
        }
      >
        Mark As Sold
      </button>

      <hr />

      <h2>
        Lifetime Profit Analysis
      </h2>

      <p>
        Sale Price:
        Rs{" "}
        {sale.toLocaleString()}
      </p>

      <h2>
        Profit / Loss:
        Rs{" "}
        {profit.toLocaleString()}
      </h2>

      <hr />

      <h2>
        Archive Animal
      </h2>

      <button
        onClick={
          archiveAnimal
        }
      >
        Archive Animal
      </button>
    </div>
  );
}