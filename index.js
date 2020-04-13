const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./quires')

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json());
app.use( 
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users/', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
	console.log('App running on port:' + port)
})
