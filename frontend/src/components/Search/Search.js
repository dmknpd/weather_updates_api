import styles from "./Search.module.css";
const Search = ({ city, handleSetCity, getWeather }) => {
  return (
    <div className={styles.search}>
      <form onSubmit={getWeather} className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter City"
          value={city}
          onChange={handleSetCity}
        />
        <button className={styles.button}>Get Weather</button>
      </form>
    </div>
  );
};

export default Search;
