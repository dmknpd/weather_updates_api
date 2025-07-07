import styles from "./WeatherInfo.module.css";
const WeatherInfo = ({ weather, error }) => {
  return (
    <>
      {error ? (
        <div className={styles.error}>City is not found</div>
      ) : weather && weather.city ? (
        <div className={styles.info}>
          <h2 className={styles.title}>{weather.city}</h2>
          <hr />

          <div className={styles.item}>
            <span>Temperature:</span>
            <span className={styles.temperature}>{weather.temperature}</span>
          </div>
          <div className={styles.item}>
            <span>Humidity:</span>
            <span className={styles.humidity}>{weather.humidity}</span>
          </div>
          <div className={styles.item}>
            <span>Description:</span>
            <span className={styles.description}>{weather.description}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WeatherInfo;
