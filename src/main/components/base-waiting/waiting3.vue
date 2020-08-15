<template>
  <div class="waiting">
    <div class="waiting-icon" />
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
.waiting-icon,
.waiting-icon::before,
.waiting-icon::after {
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}

.waiting-icon {
  color: #8eaae6;
  font-size: 10px;
  margin: 0 auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.waiting-icon:before,
.waiting-icon:after {
  content: "";
  position: absolute;
  top: 0;
}

.waiting-icon:before {
  left: -2em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.waiting-icon:after {
  left: 2em;
}

@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 1.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 1.5em 0 0;
  }
}

@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 1.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 1.5em 0 0;
  }
}
</style>
