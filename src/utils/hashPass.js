import bcrypt from 'bcryptjs'

const hashPass = password => {
    if (password.length < 8) {
        throw new Error('Password must be 8 characters or longer.')
    }
    return bcrypt.hash(password, 10)
}

export { hashPass as default }
