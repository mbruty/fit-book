<template>
  <main>
    <Nav></Nav>
    <div class="content">
      <router-view/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from './components/Nav.vue';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
  },
});
</script>

<style>
  @import './assets/resources.css';
</style>
