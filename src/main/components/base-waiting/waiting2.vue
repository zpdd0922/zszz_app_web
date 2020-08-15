<template>
  <div class="loading">
    <div class="spinner">
      <div class="double-bounce1" />
      <div class="double-bounce2" />
    </div>
    <p>loading</p>
  </div>
</template>

<script>
  export default {
    name: 'waiting'
  };
</script>
<style scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    margin: -25px 0 0 -25px;
  }

  .spinner {
    width: 30px;
    height: 30px;
    position: relative;
    margin: 0 auto;
  }

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: red;
    opacity: .6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }

    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }

    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }

  p {
    line-height: 1.5em;
    font-size: 14px;
    text-align: center;
    color: #ccc;
  }
</style>
