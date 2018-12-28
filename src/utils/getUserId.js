import jwt from 'jsonwebtoken'
require('dotenv').config({
    path: '/Users/rb/Documents/rb-prisma-pro/config/dev.env'
})

const getUserId = (request, requireAuth = true) => {
    const header = request.request
        ? request.request.headers.authorization
        : request.connection.context.Authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required.')
    }

    return null
}

export { getUserId as default }
