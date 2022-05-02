<template>
  <q-item
    clickable
    @click="$router.push(`${link}`)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <img :src="require(`../assets/icons/${icon}.svg`)" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="[$route.path === link? 'activeLink':'text-white']">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>


<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup() {
  },
}
</script>
