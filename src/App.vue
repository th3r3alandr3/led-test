<template>
  <div>
    <b-navbar :shadow="true" :spaced="true" wrapper-class="container">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <div class="title">
              <b-icon size="is-medium" type="is-primary" icon="led-strip-variant" class="mr-1"></b-icon>
              <span class="has-text-danger">L</span>
              <span class="has-text-success">E</span>
              <span class="has-text-info">D</span>
            </div>
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item tag="router-link" :to="{ path: '/' }" :active="true">
            <b-icon icon="led-strip" type="is-success"></b-icon>
            <span class="ml-1">Alle Leds Steuern</span>
          </b-navbar-item>
          <b-navbar-item href="#">
            <b-icon icon="led-outline" type="is-info"></b-icon>
            <span class="ml-1">Einzelne Led Steuern</span>
          </b-navbar-item>
          <b-navbar-item href="#">
            <b-icon icon="looks" type="is-danger"></b-icon>
            <span class="ml-1">Effekte</span>
          </b-navbar-item>
        </template>
    </b-navbar>
    <div class="container" id="app">
      <ColorPicker/>
    </div>
  </div>
</template>


<script>
import ColorPicker from "./components/ColorPicker.vue";

export default {
  name: 'App',
  components: {
    ColorPicker,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
