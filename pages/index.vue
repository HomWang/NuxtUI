<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        wanghongui-demo
      </h1>
      <h2 class="subtitle">
        My majestic Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
    <t-input
      :id="text.id"
      v-model="text.value"
      :disabled="text.disabled"
      :name="text.name"
    />

    <p>{{ text.value }}</p>

    <ul>
      <li>
        <label for="text-disabled">
          <input id="text-disabled" v-model="text.disabled" type="checkbox" />
          Disabled
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import TInput from "~/components/TInput";
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
    TInput
  },
  data() {
    return {
      text: {
        value: null,
        disabled: null,
        id: "text-field",
        name: "text-field"
      }
    };
  },
  mounted() {
    console.log(this.comId);
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
