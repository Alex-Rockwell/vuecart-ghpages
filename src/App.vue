<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@charset "UTF-8";
@font-face {
  font-family: "Lato";
  src: url("../../assets/fonts/Lato/Lato-Medium.ttf");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Lato";
  src: url("../../assets/fonts/Lato/Lato-SemiBold.ttf");
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: "Lato";
  src: url("../../assets/fonts/Lato/Lato-Bold.ttf");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: url("../../assets/fonts/Roboto/Roboto-Regular.ttf");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: url("../../assets/fonts/Roboto/Roboto-Medium.ttf");
  font-weight: 500;
  font-style: normal;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1280px;
  margin: 0 auto;

  @media screen and (max-width: 1280px) {
    margin: 0 30px;
  }
}
body {
  font-family: "Lato", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  padding-bottom: 200px;
  color: #1f2432;
}
</style>
