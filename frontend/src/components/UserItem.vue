<template>
  <div>
    <h2>{{user.name}}</h2>
    <p>{{user.email}}</p>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  props: ["user"]
};
</script>
