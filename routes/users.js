const express = require('express')
const router = express.Router()

const  { getAllUsers, 
    getUser,
    createUser,
    deleteUser,
    editUser
} =  require('../controlers/userControlers')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.get('/', getAllUsers)

router.get('/:id', getUser)

router.post('/', createUser)

// Update User
router.patch('/:id', editUser)

router.delete('/:id', deleteUser)

module.exports = router