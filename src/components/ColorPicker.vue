<template>
  <section class="section">
    <div class="columns">
      <div class="column mx-3"  v-bind:style="{ background: color }">
        <figure class="image is-96x96"></figure>
      </div>
      <div class="column">
        <b-button class="is-fullwidth" icon-left="sync" label="Übernehmen" type="is-primary" @click="notImplemented()"></b-button>
      </div>
      <div class="column">
        <b-tabs v-model="activeTab" :expanded="true">

          <b-tab-item label="Slider" icon="sort-variant">
            <div class="columns">
              <b-slider class="column" type="is-danger" v-model="slider.r" :max="255" :tooltip="tooltip" :rounded="rounded"></b-slider>
              <b-slider class="column" type="is-success" v-model="slider.g" :max="255" :tooltip="tooltip" :rounded="rounded"></b-slider>
              <b-slider class="column" type="is-info" v-model="slider.b" :max="255" :tooltip="tooltip" :rounded="rounded"></b-slider>
            </div>
          </b-tab-item>

          <b-tab-item label="Picker" icon="eyedropper-variant">
            <div class="columns">
              <div class="column is-flex is-justify-content-center">
                <color-pickers v-model="color" :startColor="color"></color-pickers>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Palette" icon="palette">
            <div class="columns is-mobile is-multiline">
              <div class="column is-4 is-flex is-justify-content-center" v-for="c in colors" :key="c">
                <figure class="image is-64x64" :style="[ {background: c}, c.toUpperCase() === color ? {'box-shadow': '0 0 20px ' + c} : '' ]" @click="setColor(c)"></figure>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import ColorPickers from 'vue-color-picker-wheel';

export default {
  name: "ColorPicker",
  components: {
    ColorPickers
  },
  data() {
    return {
      activeTab: 0,
      tooltip: true,
      rounded: true,
      slider: {
        r: 255,
        g: 255,
        b: 255,
      },
      color: '#FFFFFF',
      colors: [
        '#47ff00',
        '#981010',
        '#0b33ca',
        '#3f5628',
        '#ca0b11',
        '#ca640b',
        '#bdca0b',
        '#8800ff',
        '#350303',
        '#ca0bb7',
        '#88f52f',
        '#0bc4ca',
        '#eeff00',
        '#ca380b',
        '#ca0b47',
      ],
    }
  },
  watch: {
    'slider.r': function () {
      this.color = this.getColor();
    },
    'slider.g': function () {
      this.color = this.getColor();
    },
    'slider.b': function () {
      this.color = this.getColor();
    },
    color: function (value) {
      this.setColor(value);
    }
  },
  methods: {
    getColor() {
      const toHex = (number) => {
        let hex = Number(number).toString(16).toUpperCase();

        while (hex.length < 2) {
          hex = "0" + hex;
        }
        return hex;
      }

      return `#${toHex(this.slider.r)}${toHex(this.slider.g)}${toHex(this.slider.b)}`;
    },
    getTextColor(color) {
      color = color.replace("#", "");
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

      return (yiq >= 128) ? '#000' : '#fff';
    },
    invertColor(color) {
      color = color.replace("#", "");
      return `#${(Number(`0x1${color}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()}`;
    },
    setColor(color) {
      const hexColor = color.replace("#", "");
      this.slider.r = parseInt(hexColor.substr(0, 2), 16);
      this.slider.g = parseInt(hexColor.substr(2, 2), 16);
      this.slider.b = parseInt(hexColor.substr(4, 2), 16);
    },
    notImplemented() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Ich habe noch keine Funktion :(`,
        type: 'is-info'
      })
    }
  },
}
</script>

<style scoped>

</style>