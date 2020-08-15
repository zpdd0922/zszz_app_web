<template>
  <div class="base-web-frame">
    <iframe :src="url" />
  </div>
</template>

<script>
  export default {
    name: 'base-web-frame',
    props: {
      url: {
        type: String,
        default: ''
      }
    }
  };
</script>
