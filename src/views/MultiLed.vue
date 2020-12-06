<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-full-mobile is-6">
        <div v-bind:style="{ background: color }">
          <figure class="image is-96x96"></figure>
        </div>
        <b-button class="is-fullwidth mt-4 pt-2" icon-left="sync" label="Übernehmen" type="is-primary" @click="notImplemented()"></b-button>
      </div>
      <div class="column is-full-mobile  is-6">
        <color-picker v-model="color"/>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import ColorPicker from '@/components/ColorPicker.vue'

export default {
  name: 'Home',
  components: {
    ColorPicker
  },
  data() {
    return {
      color: '#FFFFFF',
    }
  },
  methods: {
    notImplemented() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Ich habe noch keine Funktion :(`,
        type: 'is-info'
      })
    },
    colorChange(color) {
      this.color = color;
    },
  }
}
</script>
