<template>
  <div id="map" class="map-container"></div>
  <div class="address-input">
    <input
      v-model="localAddress"
      type="text"
      placeholder="🗺️"
      @keyup.enter="addMarker"
    />
    <button @click="addMarker" class="btn-add-marker">
      Ajouter un marqueur
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import maplibregl from "maplibre-gl";

export default defineComponent({
  name: "MapComponent",
  setup() {
    let map: maplibregl.Map | null = null;
    let marker: maplibregl.Marker | null = null;
    const localAddress = ref<string>("");

    const initializeMap = (latitude: number, longitude: number) => {
      map = new maplibregl.Map({
        container: "map",
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: [longitude, latitude],
        zoom: 13,
      });

      marker = new maplibregl.Marker({ color: "red" })
        .setLngLat([longitude, latitude])
        .setPopup(
          new maplibregl.Popup().setHTML(`<b>${"Vous êtes ici !"}</b>`)
        )
        .addTo(map);
    };

    const getCoordinatesFromAddress = async (address: string) => {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }
      return null;
    };

    const addMarker = async () => {
      if (!localAddress.value.trim()) return;

      const coordinates = await getCoordinatesFromAddress(localAddress.value);
      if (coordinates) {
        if (map) {
          map.flyTo({
            center: [coordinates.longitude, coordinates.latitude],
            zoom: 13,
          });

          if (marker) marker.remove();
          marker = new maplibregl.Marker({ color: "purple" })
            .setLngLat([coordinates.longitude, coordinates.latitude])
            .setPopup(
              new maplibregl.Popup().setHTML(
                `<b>${"Vous voulez aller ici !"}</b>`
              )
            )
            .addTo(map);
        }
      } else {
        alert("Adresse introuvable");
      }
    };

    onMounted(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initializeMap(position.coords.latitude, position.coords.longitude);
          },
          () => {
            alert("Permission de géolocalisation refusée. Impossible de montrer votre localisation.");
          }
        );
      } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
      }
    });

    return {
      localAddress,
      addMarker,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 90%;
  height: 70vh;
  border: 2px solid #a0a0a0;
  border-radius: 8px;
  margin-top: 20px;
  left: 5%;
}

.address-input {
  margin-top: 20px;
  text-align: center;
}

input {
  width: 75%;
  padding: 12px;
  border: none;
  border-radius: 25px;
  text-align: center;
  font-size: 16px;
  outline: none;
  background: #333;
  color: white;
  transition: 0.3s;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
}

input::placeholder {
  color: #aaa;
}

input:focus {
  background: #444;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.5);
}

.btn-add-marker {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: rgb(177, 66, 185);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-add-marker:hover {
  background-color: #812688;
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(177, 66, 185, 0.5);
}
</style>
