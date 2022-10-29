import './riddles.css';
import {useState} from 'react';

const localURL = 'http://127.0.0.1:5000/verifyAnswer?'

function Riddle(props) {
  const [answer, setAnswer] = useState('');
  const [inputClass, setClass] = useState('');
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
    setClass(`answer-${response['correct']}`)
    localStorage.setItem(`userAnswer-${id}`, JSON.stringify([id, answer, response['correct']]));
  }
  return (
      <div className="block">
          <div className="riddle">{props.riddle}</div>
          <div className="answer">
              <input onChange={(event) => setAnswer(event.target.value)} type="text" name="answer" className={inputClass} />
              <button onClick={() => verify(props.id)}>Перевірити</button>
          </div>
      </div>
  );
}

export default Riddle;
