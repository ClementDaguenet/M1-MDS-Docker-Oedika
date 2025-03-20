<template>
  <div class="maps">
    <img alt="Maps" :src="require('@/assets/maps.png')" id="img-maps">
    <h1>Ceci est une page de cartes</h1>
    <MapComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MapComponent from "@/components/MapComponent.vue";

export default defineComponent({
  name: "MapsView",
  components: {
    MapComponent,
  },
});
</script>

<style scoped>
#img-maps {
  width: 15%;
}

.maps h1 {
  color: #a0a0a0;
  margin-bottom: 20px;
  text-align: center;
}
</style>