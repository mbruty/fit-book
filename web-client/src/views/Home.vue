<template>
<div>
  <h4>
    {{count}}
  </h4>
  <button @click="incRef">count++</button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const count = ref(0);
    function incRef() {
      count.value += 1;
    }

    return {
      count,
      incRef,
    };
  },
});
</script>
