<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <user-item v-for="user in users" :key="user.id" :user="user"></user-item>
  </div>
</template>

<script>
import UserItem from "./UserItem";
import gql from "graphql-tag";
const users = gql`
  query {
    users {
      name
      email
    }
  }
`;
export default {
  name: "HelloWorld",
  data() {
    return {
      users: {
        name
      }
    };
  },
  components: {
    UserItem
  },
  apollo: {
    users: {
      query: users
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
