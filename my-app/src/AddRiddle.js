import {useState} from 'react';
import './riddles.css';

function AddRiddle(props) {
  const [riddle, setRiddle] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <div className='block'>
        <textarea name='riddle' className='riddle'
                  onChange={(event) => setRiddle(event.target.value)} placeholder='Введіть загадку'></textarea>
        <div className='answer'>
            <input type='text' name='answer' onChange={(event) => setAnswer(event.target.value)}
                   placeholder='Введіть до неї відповідь'/>
            <button onClick={() => props.onRiddleAdd(riddle, answer)}>Додати</button>
        </div>
    </div>
  );
}

export default AddRiddle;
