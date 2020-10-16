<template>
  <div>
    <div class="v-step-0"></div>
    <div class="v-step-1"></div>
    <div class="v-step-2"></div>
    <div class="v-step-3"></div>
    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
export default {
  name: "vue-tour-component",
  data() {
    return {
      steps: [
        {
          target: ".v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Get Started",
          },
          content: `Welcome to DCDR!`,
          params: {
            placement: "top-start", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: ".v-step-1",
          content: "Click on the FAQ to learn more about this app.",
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: ".v-step-2",
          content: "Enter a room code and click 'Join' to join a poll room",
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: ".v-step-3",
          content: "Click on the login button to create a profile.",
          params: {
            placement: "top-end", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
      ],
    };
  },
  mounted: function () {
    this.$tours["myTour"].start();
  },
};
</script>

<style>
.v-step {
  background: #3c3444 !important;
  border: 5px solid #142854;
  box-shadow: 1px 1px 0px rgba(255, 255, 255, 0.151);
}

.v-step__header {
  color: #ff88ff;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.253);
  background: #241531 !important;
  font-size: 1.5em;
  font-family: Iceland;
}
.v-step__content {
  color: #81c8ff;
  font-size: 1.5em;
  font-family: Iceland;
}
.v-step__button,
.v-step__button-next,
.v-step__button-stop {
  color: #81c8ff !important;
  background: #171228 !important;
  border: #241531 !important;
  font-size: 1.5em !important;
  font-family: Iceland;
}
.v-step__button.v-step__button-skip {
  color: #81c8ff;
  font-size: 1.5em;
  font-family: Iceland;
}
</style>