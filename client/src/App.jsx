import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [scores, setScores] = useState([])
  const [awaitingFetch, setAwaitingFetch] = useState(false)

  useEffect(() => {
    setAwaitingFetch(true)
  }, [])

  const fetchScores = async () => {
    try {
      const response = await fetch("http://localhost:5001/scoreboard");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setScores(data);
      setAwaitingFetch(false);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  return (
    <div className="App">
      <h1>Scoreboard</h1>
      {awaitingFetch ? (
        <button onClick={fetchScores}>Show scores</button>
      ) : (
        <>

        <table border={1} className="scoreboard">
            <thead>
              <tr>
                <th>Name</th>
                <th>Points</th>
                <th>Attempts</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {scores
                .sort((a, b) => b.points - a.points) // Sort scores descending order
                .map(s => (
                  <tr key={s.sid}>
                    <td>{s.name}</td>
                    <td>{s.points}</td>
                    <td>{s.attempts}</td>
                    <td>{s.date}</td>
                  </tr>
              ))}
            </tbody>
          </table>

        </>
      )}
    </div>
  )
}

export default App