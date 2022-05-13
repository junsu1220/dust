import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [airData, setAirData] = useState([]);
  /* what is side effect?
  http request 같은 것, local storage에 저장하는 것 등이 side effect에 해당. 즉, user input에 의해 JSX를 render, state와
  props를 관리 등 이외의 것을 side effect라고 함. 
  */
  /* why do we use useEffect?
  useEffect는 side effect를 실행할 수 있게 함.
  side effect가 일어나는 경우(http request, ajax request)에는 infinite loop 혹은 
  불필요한 http request를 보내지 않기 위해서
  http request를 component에 직접 넣지 말고 useEffect에 집어 넣을 필요가 있음. 
  */
  /* what does the useEffect do?
  A function that should be executed AFTER every component evaluation
  IF the specified dependencies changed
 */
  useEffect(() => {
    /* 언제 useEffect가 실행되는 지를 확인하기 위해서 console을 사용할 수 있음. 
    console.log("I RUN WITH EVERY RENDER")
    useEffect에는 async를 직접 사용할 수 없어서 이런 형식으로 만들어야 함. 
     */
    async function fetchAirData() {
      /* arrow function을 하고 싶으면..
        fetchAirData = async() => {} 으로 하면 됨. */
      const response = await axios.get("http://localhost:8000");

      /* const jsonResponseBodyItem = response.data
        response.data가 어떤 구조로 되어 있는 지를 보기 위해 console 사용.
        console.log("jsonResponseBodyItem from App", jsonResponseBodyItem.pm25)
        */

      const { location, time, pm10, pm25, no2 } = response.data;

      setAirData({ location, time, pm10, pm25, no2 });
    }
    fetchAirData();
    /*
    우리 예제의 경우는 component가 처음에 render 된 후 한번만 useEffect를 사용하면 되므로 
    useEffect의 second argument(dependency)를 []으로 하였음. 
    이런 경우가 많지는 않음. 가장 많은 경우는 second argument가 없는 경우임. 
    즉, component가 render 된 후 useEffect가 실행, 그후에 component가 rerender될 때 마다 
    useEffect가 실행됨. */
  }, []); // run the useEffect when the component is rendered first time only

  return (
    <ul>
      <li>위치: {airData.location}</li>
      <li>시각: {airData.time}</li>
      <li>pm10: {airData.pm10}</li>
      <li>pm25: {airData.pm25}</li>
      <li>no2: {airData.no2}</li>
    </ul>
  );
};

export default App;
