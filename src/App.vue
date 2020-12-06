<template>
  <div>
    <b-navbar :shadow="true" :spaced="true" :fixed-top="true" wrapper-class="container">
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
        <b-navbar-item tag="router-link" :to="{ path: '/einzelnd' }">
          <b-icon icon="led-outline" type="is-info"></b-icon>
          <span class="ml-1">Einzelne Led Steuern</span>
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/effekte' }">
          <b-icon icon="looks" type="is-danger"></b-icon>
          <span class="ml-1">Effekte</span>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="container" id="app">
      <router-view/>
      <vue-progress-bar/>
    </div>
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {}

}
</script>
