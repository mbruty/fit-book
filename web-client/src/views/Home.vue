<template>
<div>
  <div class="hero">
    <h2>Pain is temporary... Quitting is for ever</h2>
  </div>
  <div class="flex--horizontal flex--centre">
    <div class="home__content colour--background">
      <h2 class="colour__text--primary title">Services</h2>
      <div class="a__grid--four">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { showNav } from '../store';

export default defineComponent({
  name: 'Home',
  setup() {
    const count = ref(0);
    function incRef() {
      count.value += 1;
    }

    // Always show the nav on this component
    if (!showNav.value) {
      showNav.value = true;
    }

    return {
      count,
      incRef,
    };
  },
});
</script>

<style>
  .home__content {
    width: 100%;
    max-width: 1200px;
    margin-top: -20px;
    height: 500px;
  border-radius: 10px;
  }

  h2.title {
    text-align: center;
    padding-top: 10px;
    font-size: 2rem;
    margin-top: 5px;
  }

  .a__grid--four {
    margin: 0 2rem;
  }

  .a__grid--four > * {
    width: 100%;
    border: 1px solid black;
  }
</style>
