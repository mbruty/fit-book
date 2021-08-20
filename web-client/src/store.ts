import { ref, reactive } from 'vue';

// Navigation options
export const showNav = ref(true);

// User options
export const user = reactive({
  nick: '',
  isLoggedIn: false,
});

export const breadcrumb = ref<Array<string>>([]);
