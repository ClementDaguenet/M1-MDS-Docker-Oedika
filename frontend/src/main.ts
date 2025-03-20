import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "maplibre-gl/dist/maplibre-gl.css";

createApp(App).use(router).mount("#app");
// Ask to client to active notifications
const askNotificationPermission = () => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
    });
  }
};
askNotificationPermission();
