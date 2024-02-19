const express = require('express')
const app = express()
const fs = require('fs')

//Only in use when using postgres database, password field omitted.
// const { Client } = require("pg");
// const client = new Client({
//     user: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "scoreboard",
// });

//Circumvent cors issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Error, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, OPTIONS, GET')
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//connect to database
// async function connect() {
//     try {
//         await client.connect();
//         console.log(Connected);
//     } catch (e) {
//         console.error(connection failed ${e})
//     }
// }
//connect();

app.get('/scoreboard', async (req, res) => {
  try {
    //Fetch from database
    //const results = await client.query("SELECT * FROM Scores S JOIN Users U ON S.uid = U.uid;")
    //res.json(results.rows)

    const jsonData = fs.readFileSync('data.json', 'utf8')
    const data = JSON.parse(jsonData)
    const results = data.map((score) => {
      const user = data.find((u) => u.uid === score.uid)
      return { ...score, name: user.name }
    })
    res.json(results)
  } catch (e) {
    console.log('There was an error')
    res.send('There was an error')
  }

  //res.json([])
})

app.post('/scoreboard', async (req, res) => {
  try {
    const results = await client.query('INSERT INTO users (name) VALUES ($1)', [
      req.body.user,
    ])
    res.status(200)
  } catch (e) {
    console.log('There was an error')
    res.send('There was an error')
  }

  //res.json([])
})

app.listen(5001, () => console.log('listening on port 5001....'))
