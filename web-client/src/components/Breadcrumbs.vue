<template>
  <div v-if="breadcrumb.lengh !== 0" class="breadcrumb__container">
    <ul class="breadcrumb">
      <li v-for="route in breadcrumb" :key="route">
        <router-link :to="`/${route}`">
          {{`${route.charAt(0).toUpperCase()}${route.slice(1)}`}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { breadcrumb } from '@/store';

export default defineComponent({
  name: 'Breadcrumbs',

  setup() {
    return { breadcrumb };
  },
});
</script>

<style>
.breadcrumb__container {
  margin-top: 100px;
}

.breadcrumb {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
}

.breadcrumb li {
  float: left;
  margin-left: 2rem;
}

.breadcrumb li a {
  display: block;
  color: var(--grey);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 1.3em;
}

.breadcrumb li:not(:last-child) a::after {
  content: '>';
  margin-left: 10px;
  margin-right: -50px;
}

</style>
