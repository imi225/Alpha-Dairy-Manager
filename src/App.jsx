import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import AnimalProfile from "./pages/AnimalProfile";
import Breeding from "./pages/Breeding";
import BreedingDashboard from "./pages/BreedingDashboard";
import Calving from "./pages/Calving";
import Health from "./pages/Health";
import VeterinaryLedger from "./pages/VeterinaryLedger";
import AnimalTradingLedger from "./pages/AnimalTradingLedger";
import BackupRestore from "./pages/BackupRestore";
import Reports from "./pages/Reports";
import FeedInventory from "./pages/FeedInventory";
import LabourLedger from "./pages/LabourLedger";
import ExpenseLedger from "./pages/ExpenseLedger";
import Finance from "./pages/Finance";
import ReadyForSale from "./pages/ReadyForSale";
import SoldAnimals from "./pages/SoldAnimals";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "250px",
            minHeight: "100vh",
            background:
              "#16233b",
            color: "white",
            padding: "20px",
          }}
        >
          <h1>
            🐄 Alpha Dairy
          </h1>

          <nav
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "20px",
              marginTop:
                "30px",
            }}
          >
            <Link
              to="/"
              style={{
                color:
                  "white",
                textDecoration:
                  "none",
              }}
            >
              Dashboard
            </Link>

            <Link
              to="/animals"
              style={{
                color:
                  "white",
                textDecoration:
                  "none",
              }}
            >
              Animals
            </Link>

            <hr />

            <h3>
              Reproduction
            </h3>

            <Link
              to="/breeding-dashboard"
              style={{
                color:
                  "#4ade80",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              🧬 Breeding
              Dashboard
            </Link>

            <Link
              to="/breeding"
              style={{
                color:
                  "white",
                textDecoration:
                  "none",
              }}
            >
              Breeding
              Records
            </Link>

            <Link
              to="/calving"
              style={{
                color:
                  "#93c5fd",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              🐮 Calving
              Module
            </Link>

            <hr />

            <h3>
              Health &
              Veterinary
            </h3>

            <Link
              to="/health"
              style={{
                color:
                  "white",
                textDecoration:
                  "none",
              }}
            >
              Health
            </Link>

            <Link
              to="/veterinary-ledger"
              style={{
                color:
                  "#fca5a5",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              🩺 Veterinary
              Ledger
            </Link>

            <hr />

            <h3>
              Finance &
              Trading
            </h3>

            <Link
              to="/feed-inventory"
              style={{
                color:
                  "white",
                textDecoration:
                  "none",
              }}
            >
              Feed Expenses
            </Link>

            <Link
              to="/labour-ledger"
              style={{
                color:
                  "#86efac",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              👨‍🌾 Labour
              Ledger
            </Link>

            <Link
              to="/expense-ledger"
              style={{
                color:
                  "#fbbf24",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              🧾 Expense
              Ledger
            </Link>

            <Link
              to="/finance"
              style={{
                color:
                  "white",
                textDecoration:
                  "none",
              }}
            >
              Finance
            </Link>

            <Link
              to="/animal-trading-ledger"
              style={{
                color:
                  "#60a5fa",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              📈 Animal
              Trading
              Ledger
            </Link>

            <Link
              to="/reports"
              style={{
                color:
                  "#a78bfa",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              📊 Reports &
              Export
            </Link>

            <Link
              to="/backup-restore"
              style={{
                color:
                  "#34d399",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              💾 Backup &
              Restore
            </Link>

            <hr />

            <Link
              to="/ready-for-sale"
              style={{
                color:
                  "#facc15",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              💰 Ready For
              Sale
            </Link>

            <Link
              to="/sold-animals"
              style={{
                color:
                  "#f87171",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              📋 Sold
              Animals
            </Link>

            <Link
              to="/settings"
              style={{
                color:
                  "#34d399",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              ⚙️ Settings
            </Link>
          </nav>
        </div>

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard />
              }
            />

            <Route
              path="/animals"
              element={
                <Animals />
              }
            />

            <Route
              path="/animal-profile/:tagNumber"
              element={
                <AnimalProfile />
              }
            />

            <Route
              path="/breeding"
              element={
                <Breeding />
              }
            />

            <Route
              path="/breeding-dashboard"
              element={
                <BreedingDashboard />
              }
            />

            <Route
              path="/calving"
              element={
                <Calving />
              }
            />

            <Route
              path="/health"
              element={
                <Health />
              }
            />

            <Route
              path="/veterinary-ledger"
              element={
                <VeterinaryLedger />
              }
            />

            <Route
              path="/animal-trading-ledger"
              element={
                <AnimalTradingLedger />
              }
            />

            <Route
              path="/reports"
              element={
                <Reports />
              }
            />

            <Route
              path="/backup-restore"
              element={
                <BackupRestore />
              }
            />

            <Route
              path="/feed-inventory"
              element={
                <FeedInventory />
              }
            />

            <Route
              path="/labour-ledger"
              element={
                <LabourLedger />
              }
            />

            <Route
              path="/expense-ledger"
              element={
                <ExpenseLedger />
              }
            />

            <Route
              path="/finance"
              element={
                <Finance />
              }
            />

            <Route
              path="/ready-for-sale"
              element={
                <ReadyForSale />
              }
            />

            <Route
              path="/sold-animals"
              element={
                <SoldAnimals />
              }
            />

            <Route
              path="/settings"
              element={
                <Settings />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;