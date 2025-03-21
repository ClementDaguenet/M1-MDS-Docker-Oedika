<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Pour un guide et des recettes sur la façon de configurer / personnaliser
      ce projet,<br />découvrez la
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >documentation vue-cli</a
      >.
    </p>
    <h3>Liens essentiels</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener"
          >Documents de base</a
        >
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Chat communautaire</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener"
          >Nouvelles</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
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
  color: #2a3bbc;
}
</style>
