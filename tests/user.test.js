import { getFirstName, isValidPassword } from '../src/utils/user'

test('Should return first name when given full name', () => {
    const firstName = getFirstName('Ryan Boris')
    expect(firstName).toBe('Ryan')
})

test('should return first name when given first name', () => {
    const firstName = getFirstName('Jen')
    expect(firstName).toBe('Jen')
})

test('should reject password shorter than 8 characters', () => {
    const password = isValidPassword('dog')
    expect(password).toBeFalsy()
})

test('should validate a password that is valid', () => {
    const password = isValidPassword('doggy12234')
    expect(password).toBeTruthy()
})

test('should reject the use of the string "password" as the password', () => {
    const password = isValidPassword('password')
    expect(password).toBeFalsy()
})
