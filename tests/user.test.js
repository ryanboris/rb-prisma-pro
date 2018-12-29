import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import bcrypt from 'bcryptjs'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

beforeEach(async () => {
    await prisma.mutation.deleteManyUsers()
    await prisma.mutation.deleteManyPosts()
    const user = await prisma.mutation.createUser({
        data: {
            name: 'Jen',
            email: 'jen@example.com',
            password: bcrypt.hashSync('Red#4@djdjd')
        }
    })

    await prisma.mutation.createPost({
        data: {
            title: 'My published post',
            body: 'la la la',
            published: true,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: 'My draft post',
            body: 'lu lu lu lu',
            published: false,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
})

test('should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "RB"
                    email: "rb@example.com"
                    password: "mypassword123"
                }
            ) {
                token
                user {
                    id
                }
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser
    })

    const userExists = await prisma.exists.User({
        id: response.data.createUser.user.id
    })

    expect(userExists).toBe(true)
})
