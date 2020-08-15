<template>
  <div class="waiting">
    <div class="waiting-icon" />
    <p>loading</p>
  </div>
</template>

<script>
export default {
  name: 'waiting'
};
</script>
<style scoped>
  .waiting {
    width: 50px;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
    position: absolute;
    text-align: center;
  }

  .waiting-icon {
    margin: 0 auto;
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-radius: 50%;
    border-color: #a89999 transparent transparent;
    animation: loadingCircle 1s infinite linear;
  }

  @keyframes loadingCircle {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    padding-top: 10px;
    font-size: 14px;
    text-align: center;
    color: #ccc;
  }
</style>
