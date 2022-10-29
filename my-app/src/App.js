import Riddle from "./Riddle";
import {useEffect, useState} from "react";

const localURL = "http://127.0.0.1:5000/"

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getData() {
      const response = await fetch(localURL);
      let actualData = await response.json();
      const riddles = [];
      for (const line of actualData["riddles"]) {
        riddles.push(<Riddle riddle={line["riddle"]} id={line["id"]}/>);
      }
      setData(riddles);
    }
    getData();
  }, []);
  return (
      <>
        {data}
      </>
  );
}

export default App;
