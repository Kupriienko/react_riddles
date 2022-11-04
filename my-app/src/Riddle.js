import './riddles.css';
import {useState} from 'react';

const localURL = 'http://127.0.0.1:5000/verifyAnswer?';

function Riddle(props) {
  const [answer, setAnswer] = useState('');
  const [correctness, setCorrectness] = useState(null);
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
              }} className={correctness !== null ? `answer-${correctness}` : ''} placeholder='Введіть відповідь'/>
              <button onClick={() => verify(props.id)}>Перевірити</button>
          </div>
      </div>
  );
}

export default Riddle;
