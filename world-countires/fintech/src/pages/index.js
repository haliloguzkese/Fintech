import Head from "next/head";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import SearchInput from "../components/Searchinput/Searchinput";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.capital.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };
  return (
   <Layout>
     
    <div className={styles.counts}> {countries.length} ülke bulundu</div>
    <SearchInput 
    placeholder="Ülke ismi, başkentleri ya da bölgelerine göre arama yapabilirsiniz.."onChange={onInputChange}/>
    
    <CountriesTable countries={filteredCountries} />
   </Layout>
  );
}


export const getStaticProps = async () => {
  const response = await axios.get("https://restcountries.eu/rest/v2/all");
  const countries = await response.data;

  return {
    props: {
      countries,
    },
  };
};