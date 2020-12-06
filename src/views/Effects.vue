<template>
  <div class="wrapper">
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-full">
          <span class="title is-2">Im Bau</span>
        </div>
        <div class="column is-full-mobile is-4 is-offset-4">
          <b-image
              :src="image"
              :webp-fallback="fallback"
              ratio="1by1"
              alt="Under construction"
              class="image-under-construction"
              rounded
          ></b-image>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Effects',
  data() {
    return {
      image: require('@/assets/under_construction.webp'),
      fallback: require('@/assets/under_construction.jpg')
    }
  },
}
</script>