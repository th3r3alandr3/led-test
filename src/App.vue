<template>
  <div>
    <b-navbar
        :shadow="true"
        :spaced="true"
        :fixed-top="true"
        :close-on-click="true"
        wrapper-class="container"
    >
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
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <b-icon icon="led-strip" type="is-success" class="mr-2"></b-icon>
          Alle Leds Steuern
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/einzelnd' }">
          <b-icon icon="led-outline" type="is-info" class="mr-2"></b-icon>
          Einzelne Led Steuern
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/effekte' }">
          <b-icon icon="looks" type="is-danger" class="mr-2"></b-icon>
          Effekte
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="container" id="app">
      <vue-page-transition name="fade-in-up">
        <router-view/>
      </vue-page-transition>
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
