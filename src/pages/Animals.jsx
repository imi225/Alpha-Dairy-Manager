import { useState, useEffect } from "react";
import AnimalForm from "../components/AnimalForm";
import AnimalTable from "../components/AnimalTable";

export default function Animals() {
  const [animals, setAnimals] =
    useState(() => {
      const savedAnimals =
        localStorage.getItem(
          "animals"
        );

      return savedAnimals
        ? JSON.parse(
            savedAnimals
          )
        : [];
    });

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  useEffect(() => {
    localStorage.setItem(
      "animals",
      JSON.stringify(
        animals
      )
    );
  }, [animals]);

  const addAnimal = (
    animal
  ) => {
    const duplicate =
      animals.find(
        (a) =>
          a.tagNumber ===
          animal.tagNumber
      );

    if (duplicate) {
      alert(
        "Tag Number already exists"
      );
      return;
    }

    setAnimals([
      ...animals,
      {
        ...animal,
        archived: false,
      },
    ]);
  };

  const restoreAnimal = (
    tagNumber
  ) => {
    const updatedAnimals =
      animals.map(
        (animal) => {
          if (
            animal.tagNumber ===
            tagNumber
          ) {
            return {
              ...animal,
              archived: false,
            };
          }

          return animal;
        }
      );

    setAnimals(
      updatedAnimals
    );

    alert(
      "Animal Restored"
    );
  };

  const filteredAnimals =
    animals.filter(
      (animal) => {
        const searchMatch =
          animal.tagNumber
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          animal.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          animal.breed
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        switch (filter) {
          case "Archived":
            return (
              searchMatch &&
              animal.archived ===
                true
            );

          case "Pregnant":
            return (
              searchMatch &&
              animal.archived !==
                true &&
              animal.pregnant ===
                true
            );

          case "Sold":
            return (
              searchMatch &&
              animal.archived !==
                true &&
              animal.status ===
                "Sold"
            );

          
            case "Calf":
            return (
              searchMatch &&
              animal.archived !==
                true &&
              animal.status ===
                "Calf"
            );

          case "Heifer":
            return (
              searchMatch &&
              animal.archived !==
                true &&
              animal.status ===
                "Heifer"
            );

          case "Lactating":
            return (
              searchMatch &&
              animal.archived !==
                true &&
              animal.status ===
                "Lactating"
            );

          case "Dry":
            return (
              searchMatch &&
              animal.archived !==
                true &&
              animal.status ===
                "Dry"
            );
                      case "Ready For Sale": {
            if (
              !animal.expectedCalvingDate
            ) {
              return false;
            }

            const days =
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

            return (
              searchMatch &&
              animal.archived !==
                true &&
              days <= 90 &&
              days >= 0 &&
              animal.status !==
                "Sold"
            );
          }

          default:
            return (
              searchMatch &&
              animal.archived !==
                true
            );
        }
      }
    );

  const animalsOnFarm =
    animals.filter(
      (animal) =>
        animal.status !==
          "Sold" &&
        animal.archived !==
          true
    );

  const pregnantAnimals =
    animals.filter(
      (animal) =>
        animal.pregnant ===
          true &&
        animal.archived !==
          true
    );

  const soldAnimals =
    animals.filter(
      (animal) =>
        animal.status ===
          "Sold" &&
        animal.archived !==
          true
    );

  const calves =
    animals.filter(
      (animal) =>
        animal.status ===
          "Calf" &&
        animal.archived !==
          true
    );

  const archivedAnimals =
    animals.filter(
      (animal) =>
        animal.archived ===
        true
    );

  return (
    <div>
      <h1>
        🐄 Animal Management
      </h1>

      <AnimalForm
        onAddAnimal={
          addAnimal
        }
      />

      <hr />

      <h2>
        Herd Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
        }}
      >
        <Card
          title="Total Animals"
          value={
            animals.length
          }
        />

        <Card
          title="On Farm"
          value={
            animalsOnFarm.length
          }
        />

        <Card
          title="Pregnant"
          value={
            pregnantAnimals.length
          }
        />

        <Card
          title="Calves"
          value={
            calves.length
          }
        />

        <Card
          title="Sold"
          value={
            soldAnimals.length
          }
        />

        <Card
          title="Archived"
          value={
            archivedAnimals.length
          }
        />

        <Card
          title="Showing"
          value={
            filteredAnimals.length
          }
        />
      </div>

      <hr />

      <h2>
        Search & Filters
      </h2>

      <input
        placeholder="Search Tag, Name or Breed"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "350px",
          padding: "8px",
        }}
      />

      <br />
      <br />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(
            e.target.value
          )
        }
      >
        <option>All</option>
        <option>Pregnant</option>
        <option>
          Ready For Sale
        </option>
        <option>Sold</option>
        <option>Calf</option>
        <option>Heifer</option>
        <option>
          Lactating
        </option>
        <option>Dry</option>
        <option>
          Archived
        </option>
      </select>

      <hr />
            {filter ===
      "Archived" ? (
        <div>
          <h2>
            Archived Animals
          </h2>

          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Tag</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Status</th>
                <th>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAnimals.map(
                (
                  animal,
                  index
                ) => (
                  <tr
                    key={
                      index
                    }
                  >
                    <td>
                      {
                        animal.tagNumber
                      }
                    </td>

                    <td>
                      {
                        animal.name
                      }
                    </td>

                    <td>
                      {
                        animal.breed
                      }
                    </td>

                    <td>
                      {
                        animal.status
                      }
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          restoreAnimal(
                            animal.tagNumber
                          )
                        }
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <AnimalTable
          animals={
            filteredAnimals
          }
        />
      )}
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        border:
          "1px solid #ddd",
        borderRadius:
          "10px",
        padding: "20px",
        background:
          "white",
      }}
    >
      <h3>
        {title}
      </h3>

      <h1>
        {value}
      </h1>
    </div>
  );
}