<template>
  <div class="home">
    <img alt="Camera" :src="require('@/assets/camera.png')" id="img-camera">
    <CameraUser/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CameraUser from '@/components/CameraUser.vue';

@Options({
  components: {
    CameraUser,
  },
})
export default class CameraView extends Vue {}
</script>

<style scoped>
#img-camera {
  width: 15%;
}
</style>