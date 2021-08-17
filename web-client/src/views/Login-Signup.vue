<template>
  <div v-if="!user.isLoggedIn">
    <div class="flex--horizontal paper__heading">
      <div
        v-bind:class="{ 'paper__top--active': (side === 'login'), 'paper__top': true }"
        @click="openLogin"
      >
        <h3>Log In</h3>
      </div>
      <div class="divider"></div>
      <div
        v-bind:class="{ 'paper__top--active': (side === 'signup'), 'paper__top': true }"
        @click="openSignup"
      >
        <h3>Sign Up</h3>
      </div>
    </div>
  </div>
  <div class="paper">
    <h2 v-if="user.isLoggedIn">You are already logged in</h2>
    <div v-if="side === 'login'">
      <h2>Login</h2>
      <form @submit.prevent="login" novalidate>
        <label for="email"><h4>Email</h4><br></label>
        <input
          id="email"
          type="email"
          class="form__input"
          v-model="loginData.data.email"
        >
        <p v-if="loginData.errors.email !== ''" class="form--error">
          <font-awesome-icon
            icon="exclamation-triangle"
            :style="{ color: '#9e1313', 'font-size': '1.5rem', 'padding-top': '6px' }"
          />
          {{loginData.errors.email}}
        </p>
        <label for="password"><h4>Password</h4><br></label>
        <input
          id="password"
          type="password"
          class="form__input"
          v-model="loginData.data.password"
        >

        <p v-if="loginData.errors.password !== ''" class="form--error">
          <font-awesome-icon
            icon="exclamation-triangle"
            :style="{ color: '#9e1313', 'font-size': '1.5rem', 'padding-top': '6px' }"
          />
          {{loginData.errors.password}}
        </p>
        <div class="flex--horizontal">
          <button class="button" type="submit">Login
            <font-awesome-icon
              icon="chevron-right"
              :style="{ color: 'white', 'font-size': '1.5rem', 'padding-top': '6px' }"
            />
          </button>
        </div>
      </form>
    </div>
    <div v-if="side === 'signup'">
      <h2>Create an account</h2>
      <form @submit.prevent="signup" novalidate>
        <label for="email"><h4>Email</h4><br></label>
        <input
          id="email"
          type="email"
          class="form__input"
          v-model="signUpData.data.email"
        >
        <p v-if="loginData.errors.email !== ''" class="form--error">
          <font-awesome-icon
            icon="exclamation-triangle"
            :style="{ color: '#9e1313', 'font-size': '1.5rem', 'padding-top': '6px' }"
          />
          {{signUpData.errors.email}}
        </p>
        <label for="password"><h4>Password</h4><br></label>
        <input
          id="password"
          type="password"
          class="form__input"
          v-model="signUpData.data.password"
        >

        <p v-if="signUpData.errors.password !== ''" class="form--error">
          <font-awesome-icon
            icon="exclamation-triangle"
            :style="{ color: '#9e1313', 'font-size': '1.5rem', 'padding-top': '6px' }"
          />
          {{signUpData.errors.password}}
        </p>
        <label for="password_conf"><h4>Confirm your password</h4><br></label>
        <input
          id="password_conf"
          type="password"
          class="form__input"
          v-model="signUpData.data.confirmPassword"
        >

        <p v-if="signUpData.errors.confirmPassword !== ''" class="form--error">
          <font-awesome-icon
            icon="exclamation-triangle"
            :style="{ color: '#9e1313', 'font-size': '1.5rem', 'padding-top': '6px' }"
          />
          {{signUpData.errors.confirmPassword}}
        </p>
        <div class="flex--horizontal">
          <button class="button" type="submit">Sign Up
            <font-awesome-icon
              icon="chevron-right"
              :style="{ color: 'white', 'font-size': '1.5rem', 'padding-top': '6px' }"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { user } from '@/store';

export default defineComponent({
  name: 'Login / Signup',

  setup() {
    const side = ref('login');

    function openLogin() {
      side.value = 'login';
    }

    function openSignup() {
      side.value = 'signup';
    }

    const loginData = reactive({
      errors: {
        email: '',
        password: '',
      },
      data: {
        email: '',
        password: '',
      },
    });

    const signUpData = reactive({
      errors: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      data: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    });

    function login() {
      const { email, password } = loginData.data;
      // Validate email
      if (!email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        loginData.errors.email = 'Please enter a valid email address';
        return;
      }

      loginData.errors.email = '';

      console.log(email, password);
    }

    function signup() {
      const { email, password, confirmPassword } = signUpData.data;

      if (!email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        signUpData.errors.email = 'Please enter a valid email address';
        return;
      }

      loginData.errors.email = '';

      if (password !== confirmPassword) {
        signUpData.errors.confirmPassword = 'Passwords do not match';
      }
    }

    return {
      user,
      side,
      openLogin,
      openSignup,
      login,
      loginData,
      signUpData,
      signup,
    };
  },
});
</script>

<style scoped>
.button {
  margin: 20px 0 0 auto;
}
</style>
