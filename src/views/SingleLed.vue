<template>
  <section class="section">
    <div class="columns is-multiline">
      <draggable
          v-model="sliders"
          handle=".handle"
          class="list-group column is-full"
      >
        <div class="column is-full" v-for="(slider, index) in sliders" v-bind:key="index">
          <div class="notification with-handle">
            <button class="delete" @click="removeSlider(index)"></button>
            <b-icon class="handle" icon="drag"></b-icon>
            <vue-slider
                ref="slider"
                v-for="(range, color) in slider"
                v-model="slider[color]"
                v-bind="options"
                :processStyle="{background: color}"
                :tooltipStyle="{background: color, 'border-color': color, 'color': getTextColor(color)}"
                v-bind:key="color"
            ></vue-slider>
          </div>
        </div>
      </draggable>
      <div class="column is-offset-9 is-3 is-full-mobile">
        <b-button class="is-fullwidth" icon-left="plus" label="Hinzufügen" @click="isColorPickerModalActive = true" type="is-success" outlined></b-button>
      </div>
      <div class="column is-full">
        <b-tabs v-model="activeTab" expanded>
          <b-tab-item label="1:5">
            <div class="columns is-multiline is-mobile leds-padding">
              <div class="column is-1-mobile is-flex is-justify-content-center px-1" v-for="(led, index) in leds" v-bind:key="index">
                <div class="led" :style="[ {background: led}, led === '#000000' ? '' : {'box-shadow': '0 0 20px ' + led} ]"></div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="1:1">
            <div class="columns is-multiline is-mobile leds-padding">
              <div class="column is-1-mobile is-flex is-justify-content-center px-1" v-for="(led, index) in ledsFull" v-bind:key="index">
                <div class="led" :style="[ {background: led}, {'box-shadow': '0 0 20px ' + led} ]"></div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="column is-offset-9 is-3 is-full-mobile">
        <b-button class="is-fullwidth" icon-left="sync" label="Übernehmen" type="is-primary" @click="notImplemented()"></b-button>
      </div>
      <b-modal
          v-model="isColorPickerModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="false"
          :onCancel="resetColor()"
          aria-role="dialog"
          aria-modal>
        <template #default="props">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Farbe wählen</p>
              <button
                  type="button"
                  class="delete"
                  @click="props.close"/>
            </header>
            <section class="modal-card-body color-modal-body">
              <color-picker v-model="color" @close="props.close"/>
            </section>
            <footer class="modal-card-foot is-flex is-justify-content-space-between">
              <div>
                <figure class="image is-48x48" v-bind:style="{ background: color }"></figure>
              </div>
              <div class="is-pulled-right">
                <b-button type="is-success" icon-left="plus" label="Hinzufügen" @click="addSlider(color)"></b-button>
                <b-button type="is-danger" icon-left="cancel" label="Abbrechen" @click="props.close"></b-button>
              </div>
            </footer>
          </div>
        </template>
      </b-modal>
    </div>
  </section>
</template>

<script>
import ColorPicker from '@/components/ColorPicker.vue'
import draggable from 'vuedraggable'

export default {
  created() {
    this.leds = Array(60).fill('#000000');
    this.ledsFull = Array(300).fill('#000000');
    this.slidersToLEDs();
  },
  data() {
    return {
      activeTab: 0,
      color: '#FFFFFF',
      leds: null,
      ledsFull: null,
      snackbar: null,
      isColorPickerModalActive: false,
      sliders: [
        {'#f00': [20, 50]},
        {'#0f0': [10, 100]},
        {'#00f': [200, 255]},
      ],
      options: {
        dotSize: 14,
        width: 'auto',
        height: 4,
        contained: false,
        direction: 'ltr',
        data: null,
        dataLabel: 'label',
        dataValue: 'value',
        min: 1,
        max: 300,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: true,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: false,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },
    }
  },
  components: {
    ColorPicker,
    draggable
  },
  watch: {
    sliders: {
      handler: function () {
        this.slidersToLEDs();
      },
      deep: true
    },
  },
  methods: {
    getTextColor(color) {
      color = color.replace("#", "");
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

      return (yiq >= 128) ? '#000' : '#fff';
    },
    resetColor() {
      this.color = '#FFFFFF';
    },
    removeSlider(index) {
      const backup = [...this.sliders];
      this.sliders.splice(index, 1)
      if (this.snackbar) {
        this.snackbar.close();
      }
      this.snackbar = this.$buefy.snackbar.open({
        duration: 5000,
        message: 'Der Slider wurde entfernt.',
        type: 'is-danger',
        position: 'is-top',
        actionText: 'Undo',
        queue: false,
        onAction: () => {
          this.sliders = backup
          this.$buefy.toast.open({
            message: 'Es ist niemals geschehen 😉',
            type: 'is-success',
            duration: 3000,
            queue: false
          })
        }
      })
    },
    addSlider(color) {
      this.sliders.push({
        [color]: [50, 250],
      })
      this.isColorPickerModalActive = false;
      this.resetColor();
    },
    notImplemented() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Ich habe noch keine Funktion :(`,
        type: 'is-info'
      })
    },
    slidersToLEDs() {
      this.ledsFull = Array(300).fill('#000000');
      this.sliders.forEach((colors) => {
        Object.keys(colors).forEach((color) => {
          const range = colors[color];
          for (let i = range[0]-1; i < range[1]; i++) {
            this.ledsFull[i] = color;
          }
        });
      });

      const chunk = (array, size) => {
        const chunked_arr = [];
        let index = 0;
        while (index < array.length) {
          chunked_arr.push(array.slice(index, size + index));
          index += size;
        }
        return chunked_arr;
      }

      const ledsLight = chunk(this.ledsFull, 5);

      this.leds = ledsLight.map((colors) => {
        const occurrence = [];
        colors.forEach((color) => {
          if (color in occurrence) {
            occurrence[color] += 1;
          } else {
            occurrence[color] = 1;
          }
        });
        let max = 0;
        let color = null;
        Object.keys(occurrence).forEach((index) => {
          const amount = occurrence[index];
          if (amount > max || amount === max && index !== '#000000') {
            max = amount;
            color = index;
          }
        });
        return color;
      });

    }
  }
}
</script>