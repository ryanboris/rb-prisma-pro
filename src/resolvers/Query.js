import getUserId from '../utils/getUserId'

const Query = {
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
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
                first: args.first,
                skip: args.skip,
                after: args.after,
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
            skip: args.skip,
            after: args.after
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
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }
        return prisma.query.comments(opArgs, info)
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
