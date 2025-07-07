import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import styles from "./SubscriptionStatusPage.module.css";

const SubscriptionStatusPage = ({ type }) => {
  const { token } = useParams();
  const [message, setMessage] = useState("Processing...");
  const calledRef = useRef(false);

  const confirm = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/confirm/${token}`
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error");
    }
  };

  const cancel = async () => {
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
    if (!token || !type || calledRef.current) return;

    calledRef.current = true;

    if (type === "confirmation") confirm();
    if (type === "unsubscribe") cancel();
  }, [token, type]);

  return <main className={styles.main}>{message}</main>;
};

export default SubscriptionStatusPage;
