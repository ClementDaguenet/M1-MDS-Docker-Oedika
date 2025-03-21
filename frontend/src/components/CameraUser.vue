<template>
  <div class="media-capture">
    <video ref="video" autoplay></video>
    <button @click="toggleCamera" class="btn-trans-purple">
      {{ isCameraActive ? "Désactiver la caméra" : "Activer la caméra" }}
    </button>
    <div v-if="photoData.length > 0" class="carousel">
      <button @click="previousPhoto" class="carousel-btn prev-btn">
        &#10094;
      </button>
      <img :src="photoData[photoIndex]" class="carousel-img" />
      <button @click="nextPhoto" class="carousel-btn next-btn">&#10095;</button>
    </div>
    <button v-if="isCameraActive" @click="takePhoto" class="btn-trans-purple">
      Prendre une photo
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "CameraUser",
  setup() {
    const video = ref<HTMLVideoElement | null>(null);
    const isCameraActive = ref(false);
    const photoData = ref<string[]>([]);
    const photoIndex = ref(0);
    const backendUrl = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000';
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video.value) {
          video.value.srcObject = stream;
        }
        isCameraActive.value = true;
      } catch {
        alert("L'accès à la caméra est refusé. Merci de l'autoriser.");
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
      isCameraActive.value = false;
    };

    const toggleCamera = () => {
      if (isCameraActive.value) {
        stopCamera();
      } else {
        startCamera();
      }
    };

    const takePhoto = () => {
      if (video.value) {
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        if (canvasContext) {
          canvas.width = video.value.videoWidth;
          canvas.height = video.value.videoHeight;
          canvasContext.drawImage(
            video.value,
            0,
            0,
            canvas.width,
            canvas.height
          );
          const imageData = canvas.toDataURL("image/jpeg", 0.7);
          uploadPhoto(imageData);
        }
      }
    };

    const uploadPhoto = async (imageData: string) => {
      try {
        const formData = new FormData();
        formData.append("photo", convertDataURLtoBlob(imageData), "photo.jpg");

        const response = await fetch(`${backendUrl}/photos`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          fetchPhotos();
        } else {
          console.error(
            "Erreur lors de l'envoi de la photo:",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la photo", error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${backendUrl}/photos`);
        if (response.ok) {
          const photos = await response.json();
          photoData.value = photos.map(
            (photo: any) => `data:image/jpeg;base64,${photo.image}`
          );
          photoIndex.value = photoData.value.length - 1;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des photos", error);
      }
    };

    const previousPhoto = () => {
      photoIndex.value =
        (photoIndex.value - 1 + photoData.value.length) %
        photoData.value.length;
    };

    const nextPhoto = () => {
      photoIndex.value = (photoIndex.value + 1) % photoData.value.length;
    };

    const convertDataURLtoBlob = (dataURL: string) => {
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: mimeString });
    };

    onMounted(fetchPhotos);

    return {
      video,
      isCameraActive,
      toggleCamera,
      takePhoto,
      photoData,
      previousPhoto,
      nextPhoto,
      photoIndex,
    };
  },
});
</script>

<style scoped>
.media-capture {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

video {
  width: 100%;
  max-width: 400px;
  border: 2px solid #ccc;
  transform: scaleX(-1);
}

.btn-trans-purple {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2a3bbc;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-trans-purple:hover {
  background-color: #252c89;
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(33, 44, 124, 0.5);
}

.btn-trans-purple::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
}

.btn-trans-purple:active::after {
  width: 200px;
  height: 200px;
  opacity: 0;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: relative;
}

.carousel-img {
  max-width: 300px;
  max-height: 300px;
  border: 2px solid #ccc;
  margin: 0 10px;
  transform: scaleX(-1);
}

.carousel-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.prev-btn {
  left: 10px;
  z-index: 1;
}

.next-btn {
  right: 10px;
}

.carousel-btn:hover {
  background-color: #252c89;
}

.carousel-btn:focus {
  outline: none;
}
</style>
