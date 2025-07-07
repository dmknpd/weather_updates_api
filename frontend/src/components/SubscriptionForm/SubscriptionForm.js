import styles from "./SubscriptionForm.module.css";

const SubscriptionForm = ({ data, handleSetData, subscribe }) => {
  return (
    <div className={styles.subscription}>
      <form onSubmit={subscribe} className={styles.form}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Enter Your Email"
          value={data.email}
          onChange={handleSetData}
          required
        />

        <input
          type="text"
          name="city"
          className={styles.input}
          placeholder="Enter City"
          value={data.city}
          onChange={handleSetData}
          required
        />

        <div className={styles.radio_wrapper}>
          <div className={styles.radio_container}>
            <label htmlFor="daily">Daily</label>
            <input
              className={styles.radio}
              type="radio"
              name="frequency"
              id="daily"
              value="daily"
              checked={data.frequency === "daily"}
              onChange={handleSetData}
            />
          </div>
          <div className={styles.radio_container}>
            <label htmlFor="hourly">Hourly</label>
            <input
              className={styles.radio}
              type="radio"
              name="frequency"
              id="hourly"
              value="hourly"
              checked={data.frequency === "hourly"}
              onChange={handleSetData}
            />
          </div>
        </div>

        <button className={styles.button} type="submit">
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
