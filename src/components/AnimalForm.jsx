import { useState } from "react";

export default function AnimalForm({
  onAddAnimal,
}) {
  const emptyAnimal = {
    tagNumber: "",
    name: "",

    breed:
      "Holstein Friesian",

    animalSource:
      "Purchased",

    purchaseDate: "",
    purchasePrice: "",

    weight: "",

    status: "Heifer",

    notes: "",

    feedCost: 0,
    medicineCost: 0,
    laborCost: 0,
    otherCost: 0,

    salePrice: "",
    saleDate: "",

    archived: false,
  };

  const [animal, setAnimal] =
    useState(emptyAnimal);

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !animal.tagNumber
    ) {
      alert(
        "Tag Number is required"
      );
      return;
    }

    onAddAnimal(animal);

    setAnimal(
      emptyAnimal
    );
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <h2>
        Add Animal
      </h2>

      <input
        placeholder="Tag Number"
        value={
          animal.tagNumber
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
            tagNumber:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Name (Optional)"
        value={animal.name}
        onChange={(e) =>
          setAnimal({
            ...animal,
            name:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <label>
        Breed
      </label>

      <br />

      <select
        value={
          animal.breed
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
            breed:
              e.target.value,
          })
        }
      >
        <option>
          Holstein Friesian
        </option>

        <option>
          Jersey
        </option>

        <option>
          Sahiwal
        </option>

        <option>
          Cholistani
        </option>

        <option>
          Crossbred
        </option>

        <option>
          Other
        </option>
      </select>

      <br />
      <br />

      <label>
        Animal Source
      </label>

      <br />

      <select
        value={
          animal.animalSource
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
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

      <label>
        Purchase Date
      </label>

      <br />

      <input
        type="date"
        value={
          animal.purchaseDate
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
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
          animal.purchasePrice
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
            purchasePrice:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={
          animal.weight
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
            weight:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <label>
        Status
      </label>

      <br />

      <select
        value={
          animal.status
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
            status:
              e.target.value,
          })
        }
      >
        <option>
          Calf
        </option>

        <option>
          Heifer
        </option>

        <option>
          Lactating
        </option>

        <option>
          Dry
        </option>
      </select>

      <br />
      <br />

      <textarea
        placeholder="Notes"
        value={
          animal.notes
        }
        onChange={(e) =>
          setAnimal({
            ...animal,
            notes:
              e.target.value,
          })
        }
        rows="4"
        cols="40"
      />

      <br />
      <br />

      <button
        type="submit"
      >
        Save Animal
      </button>
    </form>
  );
}