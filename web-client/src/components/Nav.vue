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
  <div v-if="showNav" class="header__actions--mobile colour--primary">
    <div class="a__container flex--horizontal flex--between p-auto nav">
      <div class="flex--vertical flex--centre pointer" @click="openMobileNav">
        <font-awesome-icon
          icon="bars"
          :style="{ color: 'white', 'font-size': '2rem' }"
        />
      </div>
      <router-link to="/">
        <div class="logo text-align-centre flex--vertical flex--centre">
          <h1 class="p-auto">FITBOOK</h1>
        </div>
      </router-link>
      <transition name="slide-fade" mode="in-out">
        <div v-if="mobileNavOpen" class="nav__mobile">
          <div class="flex--horizontal" @click="closeMobileNav">
            <font-awesome-icon
              icon="times"
              :style="{ color: 'white', 'font-size': '2rem', 'margin': '25px 25px 0 auto' }"
            />
          </div>
          <div class="nav__contnet--mobile">
            <form @submit.prevent="search" style="padding-right: 2em;">
              <div class="flex--vertical flex--centre">
                <div class="flex--horizontal">
                  <div class="searchform">
                    <input
                      type="text"
                      class="searchform__input searchform__input--mobile"
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
            <div v-else class="flex--vertical flex--centre button--mobile">
              <router-link
                to="/login"
                class="button button--light"
                @click="closeMobileNav
              ">
                Log in / Sign up
              </router-link>
            </div>
          </div>
        </div>
      </transition>
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

    const mobileNavOpen = ref(false);

    function openMobileNav() {
      mobileNavOpen.value = true;
    }

    function closeMobileNav() {
      mobileNavOpen.value = false;
    }

    function search() {
      router.push(`/search?q=${searchContent.value}`);
    }
    return {
      searchContent,
      showNav,
      search,
      user,
      openMobileNav,
      closeMobileNav,
      mobileNavOpen,
    };
  },
});
</script>

<style>
  .header__actions,
  .header__actions--mobile {
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

  .nav__mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: var(--grey);
  }

  .nav__contnet--mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  .nav__contnet--mobile > * {
    margin-bottom: 25px;
  }

  .nav__contnet--mobile > form {
    margin-left: 25px;
  }

  .button--mobile {
    text-align: center;
    width: 50%;
    min-width: 350px;
  }

  .searchform__input--mobile:focus {
    outline: 0;
  }

  .header__actions--mobile {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    .header__actions {
      display: none;
    }

    .header__actions--mobile {
      display: unset;
    }
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-100vw);
  }
</style>
