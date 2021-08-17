<template>
  <h1>{{email}}</h1>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { dependencyResolver, Endpoints } from '@/api-interface/index';
import { IMeQuery } from '@/api-interface/interfaces';

export default defineComponent({
  name: 'Search',

  setup() {
    const query = new URLSearchParams(window.location.search);
    console.log(query);
    const { state, fetchData } = dependencyResolver<IMeQuery>(Endpoints.me);
    onMounted(() => {
      fetchData();
    });

    const email = computed(() => state.data?.email);
    return {
      email,
    };
  },
});
</script>
