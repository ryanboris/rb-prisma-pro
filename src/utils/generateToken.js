import jwt from 'jsonwebtoken'
require('dotenv').config({
    path: '/Users/rb/Documents/rb-prisma-pro/config/dev.env'
})

const generateToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7 days' })
}

export { generateToken as default }
