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

    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.deleteUser(
            {
                where: {
                    id: userId
                }
            },
            info
        )
    },

    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.updateUser(
            {
                where: {
                    id: userId
                },
                data: args.data
            },
            info
        )
    },

    async createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.createPost(
            {
                data: {
                    title: args.data.title,
                    body: args.data.body,
                    published: args.data.published,
                    author: {
                        connect: {
                            id: userId
                        }
                    }
                }
            },
            info
        )
    },

    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Operation failed.')
        }
        return prisma.mutation.deletePost(
            {
                where: {
                    id: args.id
                }
            },
            info
        )
    },

    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Operation failed.')
        }

        return prisma.mutation.updatePost(
            {
                where: {
                    id: args.id
                },
                data: args.data
            },
            info
        )
    },

    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
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
                            id: userId
                        }
                    }
                }
            },
            info
        )
    },

    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Operation failed.')
        }
        return prisma.mutation.deleteComment(
            {
                where: {
                    id: args.id
                }
            },
            info
        )
    },

    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Operation failed.')
        }

        return prisma.mutation.updateComment(
            {
                where: {
                    id: userId
                },
                data
            },
            info
        )
    }
}

export { Mutation as default }
