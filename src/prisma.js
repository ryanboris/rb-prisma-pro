import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// TODO:     prisma.query

// prisma.query
//     .users(null, '{ id name posts { id title body } }')
//     .then(data => console.log('Users: ', JSON.stringify(data, undefined, 4)))
//     .catch(err => console.error(err))

// prisma.query
//     .comments(null, '{ id text author { id name }}')
//     .then(data => console.log('Comments: ', JSON.stringify(data, undefined, 4)))
//     .catch(err => console.error(err))

// prisma.mutation
//     .createPost(
//         {
//             data: {
//                 title: 'Hey',
//                 body: 'Hey how are you?',
//                 published: true,
//                 author: {
//                     connect: {
//                         id: 'cjq2hnylg000n0a52tqvoeejz'
//                     }
//                 }
//             }
//         },
//         '{ id title body published }'
//     )
//     .then(data => {
//         console.log(data)
//         return prisma.query.users(null, '{ id name posts { id title body } }')
//     })
//     .then(data => {
//         console.log(JSON.stringify(data, undefined, 4))
//     })
//     .catch(err => console.error(err))

// prisma.mutation
//     .updatePost(
//         {
//             where: {
//                 id: 'cjq2pmwco00110a52fs8zph0j'
//             },
//             data: {
//                 title: 'My Title is a new title',
//                 body: 'My body has been updated'
//             }
//         },
//         '{ id title body published }'
//     )
//     .then(data => {
//         console.log(data)
//         return prisma.query.posts(null, '{ id title body published }')
//     })
//     .then(data => console.log(JSON.stringify(data, undefined, 4)))
//     .catch(e => console.log(e))
