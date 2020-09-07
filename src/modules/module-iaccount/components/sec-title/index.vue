<template>
  <h5 class="sec-title">
    <span>{{content}}</span>
  </h5>
</template>

<script>
export default {
  name: 'sec-title',
  components: {},
  props: {
    content: {
      type: String,
      default: '',
    }
  },
};
</script>
