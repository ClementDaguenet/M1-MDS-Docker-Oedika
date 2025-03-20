<template>
  <div id="app">
    <!-- Navbar burger -->
    <nav>
      <div class="burger-menu" @click="toggleMenu">
        <div :class="{ 'burger-bar': true, open: menuOpen }"></div>
        <div :class="{ 'burger-bar': true, open: menuOpen }"></div>
        <div :class="{ 'burger-bar': true, open: menuOpen }"></div>
      </div>

      <!-- Menu items with background -->
      <div class="menu-background" :class="{ open: menuOpen }"></div>
      <div class="menu-items" :class="{ open: menuOpen }">
        <router-link to="/" @click="closeMenu">Accueil</router-link>
        <router-link to="/camera" @click="closeMenu">Caméra</router-link>
        <router-link to="/maps" @click="closeMenu">Cartes</router-link>
      </div>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // Function for managing menu visibility
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    // Function to close menu when a link is clicked
    const closeMenu = () => {
      menuOpen.value = false;
    };

    return {
      menuOpen,
      toggleMenu,
      closeMenu,
    };
  },
});
</script>

<style>
body {
  background-color: #1f1f1f;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a0a0a0;
}

nav {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

.burger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  cursor: pointer;
  position: fixed;
}

.burger-bar {
  width: 30px;
  height: 5px;
  background-color: #a0a0a0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.burger-bar.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger-bar.open:nth-child(2) {
  opacity: 0;
}

.burger-bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.menu-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 140px;
  height: 100vh;
  background-color: #2a2a2a;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
  transform: translateX(-92%);
}

.menu-background.open {
  transform: translateX(0);
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #2a2a2a;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 2;
}

.menu-items.open {
  transform: translateX(0);
}

.menu-items a {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 18px;
}

.menu-items a.router-link-exact-active {
  color: #b142b9;
  font-weight: bold;
}

.language-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.language-btn:hover {
  transform: scale(1.1);
}

.language-btn img {
  width: 30px;
  height: 20px;
}
</style>
