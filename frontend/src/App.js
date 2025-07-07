import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import SubscriptionStatusPage from "./pages/SubscriptionStatusPage/SubscriptionStatusPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route
            path="/confirmation/:token"
            element={<SubscriptionStatusPage type={"confirmation"} />}
          />
          <Route
            path="/unsubscribe/:token"
            element={<SubscriptionStatusPage type={"unsubscribe"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
