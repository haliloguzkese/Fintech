import Link from "next/link";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Ülke ismi</div>

          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("capital")}
        >
          <div>Başkent</div>

          {value === "capital" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_region}
          onClick={() => setValueAndDirection("region")}
        >
          <div>Bölge</div>

          {value === "region" && <SortArrow direction={direction} />}
        </button>


        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Nüfusu</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>
       
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>

            <div className={styles.capital}>{country.capital}</div>

            <div className={styles.region}>{country.region}</div>

            <div className={styles.population}>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
