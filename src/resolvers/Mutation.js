require('dotenv').config()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const { data } = args
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password = await bcrypt.hash(data.password, 10)

        const user = await prisma.mutation.createUser({
            data: {
                ...data,
                password
            }
        })

        return {
            user,
            token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        }
    },

    async loginUser(parent, { data }, { prisma }, info) {
        const user = await prisma.query.user({
            where: { email: data.email }
        })

        if (!user) {
            throw new Error('Unable to login.')
        }

        const isMatch = await bcrypt.compare(data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login.')
        }

        return {
            user,
            token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        }
    },

    deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser(
            {
                where: {
                    id: args.id
                }
            },
            info
        )
    },

    updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser(
            {
                where: {
                    id: args.id
                },
                data: args.data
            },
            info
        )
    },

    createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.createPost(
            {
                data: {
                    title: args.data.title,
                    body: args.data.body,
                    published: args.data.published,
                    author: {
                        connect: {
                            id: args.data.author
                        }
                    }
                }
            },
            info
        )
    },

    deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost(
            {
                where: {
                    id: args.id
                }
            },
            info
        )
    },

    updatePost(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updatePost(
            {
                where: {
                    id
                },
                data
            },
            info
        )
    },

    createComment(parent, args, { prisma }, info) {
        const { text, post, author } = args.data
        return prisma.mutation.createComment(
            {
                data: {
                    text,
                    post: {
                        connect: {
                            id: post
                        }
                    },
                    author: {
                        connect: {
                            id: author
                        }
                    }
                }
            },
            info
        )
    },

    deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment(
            {
                where: {
                    id: args.id
                }
            },
            info
        )
    },

    updateComment(parent, args, { prisma }, info) {
        const { id, data } = args
        return prisma.mutation.updateComment(
            {
                where: {
                    id
                },
                data
            },
            info
        )
    }
}

export { Mutation as default }
