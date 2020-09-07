<template>
  <ul class="sec-top-nav">
    <li
      v-for="nav in navList"
      :key="nav.key"
      @click="handleClickNav(nav)"
      :class="[{active: activeNav === nav.key}, {disable: nav.disable}]"
    >{{nav.label}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'sec-top-nav',
    components: {},
    props: {
      navList: {
        type: Array,
        default: () => ([]),
      },
      handleClickNav: {
        type: Function,
        default: () => {}
      },
      activeNav: {
        type: String,
        default: ''
      }
    },
  };
</script>
