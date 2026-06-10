import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "farmSettings"
          )
        ) || {
          farmName:
            "Alpha Dairy Farm",

          ownerName: "",

          address: "",

          phone: "",

          email: "",

          logoUrl: "",
        }
      );
    });

  const saveSettings =
    () => {
      localStorage.setItem(
        "farmSettings",
        JSON.stringify(
          settings
        )
      );

      alert(
        "Settings Saved Successfully"
      );
    };

  return (
    <div>
      <h1>
        ⚙️ Farm Settings
      </h1>

      <hr />

      <h2>
        Farm Information
      </h2>

      <input
        placeholder="Farm Name"
        value={
          settings.farmName
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            farmName:
              e.target.value,
          })
        }
        style={{
          width: "400px",
        }}
      />

      <br />
      <br />

      <input
        placeholder="Owner Name"
        value={
          settings.ownerName
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            ownerName:
              e.target.value,
          })
        }
        style={{
          width: "400px",
        }}
      />

      <br />
      <br />

      <textarea
        placeholder="Address"
        value={
          settings.address
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            address:
              e.target.value,
          })
        }
        rows="4"
        cols="60"
      />

      <br />
      <br />

      <input
        placeholder="Phone Number"
        value={
          settings.phone
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            phone:
              e.target.value,
          })
        }
        style={{
          width: "400px",
        }}
      />

      <br />
      <br />

      <input
        placeholder="Email"
        value={
          settings.email
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            email:
              e.target.value,
          })
        }
        style={{
          width: "400px",
        }}
      />

      <br />
      <br />

      <input
        placeholder="Logo URL"
        value={
          settings.logoUrl
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            logoUrl:
              e.target.value,
          })
        }
        style={{
          width: "600px",
        }}
      />

      <br />
      <br />

      <button
        onClick={
          saveSettings
        }
      >
        Save Settings
      </button>

      <hr />

      <h2>
        Preview
      </h2>

      <p>
        <strong>
          Farm:
        </strong>{" "}
        {
          settings.farmName
        }
      </p>

      <p>
        <strong>
          Owner:
        </strong>{" "}
        {
          settings.ownerName
        }
      </p>

      <p>
        <strong>
          Phone:
        </strong>{" "}
        {settings.phone}
      </p>

      <p>
        <strong>
          Email:
        </strong>{" "}
        {settings.email}
      </p>

      <p>
        <strong>
          Address:
        </strong>{" "}
        {
          settings.address
        }
      </p>

      {settings.logoUrl && (
        <img
          src={
            settings.logoUrl
          }
          alt="Farm Logo"
          style={{
            maxWidth:
              "200px",
            marginTop:
              "20px",
          }}
        />
      )}
    </div>
  );
}