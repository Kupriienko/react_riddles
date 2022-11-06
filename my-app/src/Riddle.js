import {useEffect, useState} from 'react';
import './riddles.css';

const localURL = 'http://127.0.0.1:5000/verifyAnswer?';

function Riddle(props) {
  const [answer, setAnswer] = useState('');
  const [correctness, setCorrectness] = useState(null);
  useEffect(() => {
      async function userData() {
          for (const [, value] of Object.entries(localStorage)) {
              const data = JSON.parse(value);
              if (data[0] === props.id) {
                  setAnswer(data[1]);
                  setCorrectness(data[2]);
              }
          }
      }
      userData();
  }, [props]);

  async function verify(id) {
    const initialResponse = await fetch(localURL  + new URLSearchParams({
        id,
        answer,
    }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await initialResponse.json();
    setCorrectness(response['correct']);
    localStorage.setItem(`userAnswer-${id}`, JSON.stringify([id, answer, response['correct']]));
  }

  return (
      <div className='block'>
          <div className='riddle'>{props.riddle}</div>
          <div className='answer'>
              <input type='text' name='answer' onChange={(event) => {
                  setAnswer(event.target.value);
                  setCorrectness('');
              }} className={correctness !== null ? `answer-${correctness}` : ''}
                     defaultValue={answer} placeholder='Введіть відповідь'/>
              <button onClick={() => verify(props.id)}>Перевірити</button>
          </div>
      </div>
  );
}

export default Riddle;
