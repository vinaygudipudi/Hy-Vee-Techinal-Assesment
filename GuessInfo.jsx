import { useState } from 'react';
import styles from './GuessInfo.module.css';

export default function GuessInfo() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [agifyResponse, genderizeResponse, nationalizeResponse] = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`).then(res => res.json()),
        fetch(`https://api.genderize.io?name=${name}`).then(res => res.json()),
        fetch(`https://api.nationalize.io?name=${name}`).then(res => res.json())
      ]);

      setAge(agifyResponse.age);
      setGender(genderizeResponse.gender);
      setCountry(nationalizeResponse.country[0]?.country_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Guess Info</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className={styles.infoContainer}>
        <h2>Guessed Information:</h2>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  );
}
