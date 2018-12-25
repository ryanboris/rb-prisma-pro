import colors from 'colors'

const Query = {
    posts(parent, args, { db, prisma }, info) {
        return prisma.query.posts(info)
    },

    users(parent, args, { db, prisma }, info) {
        return prisma.query.users(info)
    },

    comments(parent, args, { db, prisma }, info) {
        return prisma.query.comments(info)
    }
}

export { Query as default }
