import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import bcrypt from 'bcryptjs'
import prisma from '../src/prisma'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  const user = await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('Red098!@#$')
    }
  })
  await prisma.mutation.createPost({
    data: {
      title: 'My published post',
      body: '',
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
      body: '',
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })
})

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Andrew"
          email: "andrew@example.com"
          password: "MyPass123"
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

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  })
  expect(exists).toBe(true)
})

test('should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `
  const response = await client.query({
    query: getUsers
  })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBeNull()
  expect(response.data.users[0].name).toBe('Jen')
})

test('should only expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        published
      }
    }
  `

  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      loginUser(
        data: {
          email: "qtpatootie48@gmail.com"
          password: "tootieonmyooti338xx"
        }
      ) {
        token
      }
    }
  `
  await expect(client.mutate({ mutation: login })).rejects.toThrow()
})

test('should not allow account to be created with a short password', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "Ryan", email: "ryry@ex.com", password: "myboo1" }
      ) {
        token
      }
    }
  `
  await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})
