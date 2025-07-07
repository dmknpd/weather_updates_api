import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./SubscriptionStatusPage.module.css";

const SubscriptionStatusPage = ({ type }) => {
  const { token } = useParams();
  const [message, setMessage] = useState("Processing...");

  const subscribe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/confirm/${token}`
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error");
    }
  };

  const unsubscribe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/unsubscribe/${token}`
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error");
    }
  };

  useEffect(() => {
    if (token && type === "confirmation") subscribe();
    if (token && type === "unsubscribe") unsubscribe();
  }, [token, type]);

  return <div>{message}</div>;
};

export default SubscriptionStatusPage;
