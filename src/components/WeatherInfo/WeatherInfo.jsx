
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { CiSearch } from "react-icons/ci";
import styles from "./WeatherInfo.module.css";
import { useState } from "react";
import { useEffect} from "react";
const arr=[]
const WeatherInfo = (props) => {
  const { getWeather , city } = props;
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);

useEffect(()=>{
  const locolData=JSON.parse(localStorage.getItem("history") )?? []
 setHistory(locolData)

  },[])

  const handleClik = () => {
    setValue("")
    getWeather(value); 
    
    arr.unshift(value)
    localStorage.setItem('history',JSON.stringify(arr))

    
    setHistory((prevState)=>{
       return [value, ...prevState]
    })
  
  };
  
  const handleChange = (evt) => {
    const text = evt.target.value;
    setValue(text);
    
  };


  return (
    <div className={styles.wrap}>
      <div style={{ width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          <InputBase
            value={value}
            onChange={handleChange}
            sx={{ width: "100%", borderBottom: "1px solid red" }}
            placeholder="Another location"
            inputProps={{ "aria-label": "Another location" }}
          />
          <IconButton
            onClick={handleClik}
            type="button"
            sx={{
              p: "10px",
              borderRadius: "0px",
              background: "green",
              "&:hover": {
                background: "green",
              },
            }}
            aria-label="search"
          >
            <CiSearch />
          </IconButton>
        </Box>
      </div>
      <div>
        <ul  className={styles.ul}>
         {history.slice(0,6).map((el,index)=><li onClick={(evt)=>{
            console.log(evt.target.innerText)
            getWeather(evt.target.innerText)
         }} key={index}>{el}</li>)}
       
        </ul>
      </div>
      <div className={styles.pogoda_info}>
                <h4>Weather Details</h4>
                <div className={styles.dannye}>
                    <p>Cloudy</p>
                    <b>{city.clouds.all + "%" }</b>
                </div>
                <div className={styles.dannye}>
                    <p>Humidity</p>
                    <b>{(city.main.humidity + "%")}</b>
                </div>
                <div className={styles.dannye }>
                    <p>Wind</p>
                    <b>{city.wind.speed + "km/h"}</b>
                </div>
                <div className={styles.dannye} >
                    <p>Rain</p>
                    <b>{city.rain && city.rain['1h'] ? city.rain['1h']  + " mm" : "N/A"}</b>
                </div>
                </div>
      </div>
   
  );
};

export default WeatherInfo;
