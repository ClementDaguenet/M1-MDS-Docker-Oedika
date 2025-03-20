<template>
  <div class="home">
    <img alt="Vue logo" :src="require('@/assets/logo.png')" id="img-home" />
    <HelloWorld msg="Bienvenue sur mon application Oedika" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
