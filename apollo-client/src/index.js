import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

client
    .query({
        query: gql`
            query {
                users {
                    id
                    name
                    email
                }
            }
        `
    })
    .then(response => {
        let html = ''
        response.data.users.forEach(user => {
            html += `
                <div>
                    <h3>${user.name}</h3>
                </div>
            `
        })
        document.getElementById('users').innerHTML = html
    })
    .catch(e => console.error(e))

client
    .query({
        query: gql`
            query {
                posts {
                    title
                    body
                    author {
                        name
                    }
                }
            }
        `
    })
    .then(response => {
        let html = ''
        response.data.posts.forEach(post => {
            html += `
                <div>
                    <h3 style="color:red">${post.title}</h3>
                    <p>${post.body}</p>
                    <p style="color:orange">${post.author.name}</p>
                </div>
            `
        })
        document.getElementById('posts').innerHTML = html
    })
    .catch(e => console.error(e))
