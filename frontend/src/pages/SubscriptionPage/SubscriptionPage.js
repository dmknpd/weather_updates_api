import { useState } from "react";
import axios from "axios";

import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";

import styles from "./SubscriptionPage.module.css";

const SubscriptionPage = () => {
  const [data, setData] = useState({
    email: "",
    city: "",
    frequency: "daily",
  });
  const [error, setError] = useState("");

  const handleSetData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(data);
  };

  const subscribe = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/subscribe`,
        data
      );

      setData({
        email: "",
        city: "",
        frequency: "daily",
      });
    } catch (e) {
      setError(e.status);
    }
  };

  return (
    <main className={styles.main}>
      <SubscriptionForm
        data={data}
        handleSetData={handleSetData}
        subscribe={subscribe}
      />
    </main>
  );
};

export default SubscriptionPage;
