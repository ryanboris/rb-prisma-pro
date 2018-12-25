import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({
        id: authorId
    })

    if (!userExists) {
        throw new Error('User not found.')
    }
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
        '{ id author { name posts { id title published } } }'
    )
    return post
}

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({
        id: postId
    })

    if (!postExists) {
        throw new Error('Post not found.')
    }
    const post = await prisma.mutation.updatePost(
        {
            where: {
                id: postId
            },

            data: {
                ...data
            }
        },
        '{ id author { email name posts { id title body published } } }'
    )

    return post
}

updatePostForUser('cjq2pgki0000t0a52nblfql5r', {
    title: 'updated',
    body: 'HAY!'
})
    .then(user => console.log(JSON.stringify(user, undefined, 4)))
    .catch(e => console.error(e))

// createPostForUser('cjq2hnylg000n0a52tqvoeejz', {
//     title: 'Add',
//     body:
//         'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
//     published: false
// })
//     .then(user => console.log(JSON.stringify(user, undefined, 4)))
//     .catch(e => console.error(e))

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
