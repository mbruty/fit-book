<template>
  <div v-if="showNav" class="header__actions colour--primary">
    <div class="a__container flex--horizontal flex--between p-auto nav">
      <router-link to="/">
        <div class="logo text-align-centre flex--vertical flex--centre">
          <h1 class="p-auto">FITBOOK</h1>
        </div>
      </router-link>
      <div class="flex--horizontal">
        <form @submit.prevent="search" style="padding-right: 2em;">
          <div class="flex--vertical flex--centre">
            <div class="flex--horizontal">
              <div class="searchform">
                <input
                  type="text"
                  class="searchform__input"
                  placeholder="Search here..."
                  v-model="searchContent"
                >
              </div>
              <router-link :to="`/search?q=${searchContent}`">
                <div class="flex--vertical flex--centre">
                  <font-awesome-icon
                    icon="search"
                    :style="{ color: 'white', 'font-size': '1.5rem' }"
                  />
                </div>
              </router-link>
            </div>
          </div>
        </form>
        <div v-if="user.isLoggedIn"></div>
        <div v-else class="flex--vertical flex--centre">
            <router-link to="/login" class="button button--light">Log in / Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { showNav, user } from '../store';

export default defineComponent({
  name: 'Nav',
  setup() {
    const searchContent = ref('');

    function search() {
      router.push(`/search?q=${searchContent.value}`);
    }
    return {
      searchContent,
      showNav,
      search,
      user,
    };
  },
});
</script>

<style>
  .header__actions {
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
  }

  .searchform {
    border-bottom: 2px dotted #80c0b1;
  }

  .searchform__input {
    background-color: transparent;
    color: white;
    border: 0;
    padding: 1rem;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .searchform__input::placeholder {
    color: white;
    font-weight: bold;
  }

  .searchform__input:focus {
    outline: solid 2px white;
  }

  .logo > h1 {
    color: white;
  }

  .search {
    width: 150px;
  }

  .nav {
    margin: 0 2rem;
  }
</style>
