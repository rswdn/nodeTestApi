const Pool = require('pg').Pool
const pool = new Pool({
	user: 'Ryan',
	host: 'localhost',
	database: 'api',
	password: '',
	port: 5432,
})
//getting all users
const getUsers = (req, res) => {
	pool.query('SELECT * FROM users Order BY id ASC', (error, results) => {
		if (error) {
			throw error 
		} else if (res){
			res.status(200).json(results.rows)
		}
	})
}
//getting specific user by id
const getUserById = (req, res) => {
	const id = parseInt(req.params.id)
	
	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) =>{
		if (error) {
			throw error
		} 
		res.status(200).json(results.rows)
	})
}
//creating a new user
const createUser = (req, res) =>{
	const {name, email} = req.body

	pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) =>{
		if (error) {
			throw error
		}
		res.status(201).send(`User added with ID: ${res.insertId}`)

	})
}
//updating an existing user
const updateUser = (req, res) =>{
	const id = parseInt(req.params.id)
	const {name, email} = req.body

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
		[name, email, id],
		(error, results) => {
			if (error) {
				throw error
			}
			res.status(200).send(`User updated with ID: ${id}`)
		}
	)
}

//deleting an existing user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
