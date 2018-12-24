import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// 1. Create a new post
// 2. Fetch all the info about the user(author)

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost(
        {
            data: {
                ...data,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            }
        },
        '{ id }'
    )

    const user = await prisma.query.user(
        {
            where: {
                id: authorId
            }
        },
        '{ id name email posts { id title body published } }'
    )

    return user
}

createPostForUser('cjq2hnylg000n0a52tqvoeejz', {
    title: 'my note',
    body: 'my body',
    published: false
})
    .then(user => console.log(JSON.stringify(user, undefined, 4)))
    .catch(e => console.error(e))

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
