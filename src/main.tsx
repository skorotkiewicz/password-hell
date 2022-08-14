import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gun from "gun";
import "gun/sea";
// import "gun/lib/webrtc";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/rindexed";
import "./main.scss";
import GunContext from "./context";
import Dashboard from "./routes/Dashboard";
import Register from "./routes/Register";
import Admin from "./routes/Admin";
const gun = Gun();

gun.opt({
  peers:
    process.env.NODE_ENV === "development"
      ? ["http://localhost:8765/gun"]
      : [
          "https://grizzly.de1.hashbang.sh/gun",
          // "https://gun-manhattan.herokuapp.com/gun",
        ],
  localStorage: false,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="App">
      <header>
        Claim your free game
        <p>
          <small>(For now, only for Steam)</small>
        </p>
      </header>
      <main>
        <GunContext gun={gun}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin/p/game/:gameId" element={<Admin />} />
              <Route path="/register/:gameId" element={<Register />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </BrowserRouter>
        </GunContext>
      </main>
      <footer>
        <div>
          To get the game just register. Once registered, you will receive a
          Steam key.
        </div>
        <div>
          Please note, the games may not be available after registration, first
          come, first served. Be quick!
        </div>
      </footer>
    </div>
  </React.StrictMode>
);
