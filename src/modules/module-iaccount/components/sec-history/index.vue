<template>
  <div class="sec-history">
    <header>
      <ul>
        <li
          v-for="nav in navList"
          :key="nav.key"
          @click="handleClickNav(nav)"
        >{{nav.label}}</li>
      </ul>
    </header>
    <section></section>
  </div>
</template>

<script>
  export default {
    name: 'sec-history',
    components: {},
    props: {
      navList: {
        type: Array,
        default: () => ([]),
      },
      handleChangeNav: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      handleClickNav(nav) {
        this.handleChangeNav(nav);
      }
    }
  };
</script>
