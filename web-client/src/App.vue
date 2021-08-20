<template>
  <main>
    <Nav></Nav>
    <breadcrumbs />
    <div class="content">
      <router-view/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from './components/Nav.vue';
import breadcrumbs from '@/components/Breadcrumbs.vue';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
    breadcrumbs,
  },
});
</script>

<style>
  @import './assets/resources.css';
</style>
