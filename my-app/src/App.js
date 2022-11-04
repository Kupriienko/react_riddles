import Riddle from './Riddle';
import AddRiddle from './AddRiddle';
import {useEffect, useState} from 'react';

const localURL = 'http://127.0.0.1:5000/'

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch(localURL);
      let actualData = await response.json();
      setData(actualData['riddles']);
    }
    getData();
  }, []);

  async function addRiddle(riddle, answer) {
    const initialResponse = await fetch(`${localURL}addRiddle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            riddle,
            answer,
        }),
    });
    const id = await initialResponse.json();
    const newData = [...data];
    newData.push({'id': id, 'riddle': riddle});
    setData(newData);
  }

  return (
      <div className='container'>
          <div className='riddles' id='riddles'>
              {data.map((riddle) => (<Riddle riddle={riddle['riddle']} id={riddle['id']}/>))}
              <h1>Додайте свою загадку:</h1>
              <AddRiddle func={addRiddle}/>
          </div>
      </div>
  );
}

export default App;
