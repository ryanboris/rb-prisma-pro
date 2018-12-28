import getUserId from '../utils/getUserId'

const Query = {
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            where: {
                published: true
            }
        }
        if (args.query) {
            opArgs.where.OR = [
                {
                    title_contains: args.query
                },

                {
                    body_contains: args.query
                }
            ]
        }
        return prisma.query.posts(opArgs, info)
    },

    myPosts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }
        if (args.query) {
            opArgs.where.OR = [
                {
                    title_contains: args.query
                },
                {
                    body_contains: args.query
                }
            ]
        }

        return prisma.query.posts(opArgs, info)
    },

    users(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip
        }
        if (args.query) {
            opArgs.where = {
                OR: [
                    {
                        name_contains: args.query
                    }
                ]
            }
        }
        return prisma.query.users(opArgs, info)
    },

    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    },

    async me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const user = await prisma.query.user(
            {
                where: {
                    id: userId
                }
            },
            info
        )

        return user
    },

    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const posts = await prisma.query.posts(
            {
                where: {
                    id: args.id,
                    OR: [
                        {
                            published: true
                        },
                        {
                            author: {
                                id: userId
                            }
                        }
                    ]
                }
            },
            info
        )
        if (posts.length === 0) {
            throw new Error('Post not found.')
        }

        const [post] = posts
        return post
    }
}

export { Query as default }
