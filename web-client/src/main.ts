import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faChevronRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

library.add(faSearch);
library.add(faChevronRight);
library.add(faExclamationTriangle);

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
