<template>
  <div class="container">
    <div class="mb-20">
      <logo />
      <h1 class="title">
        Nuxt-ui demo
      </h1>
      <!-- <n-button class="mt-10" variant="primary">Primary button</n-button> -->
      <!-- <n-button variant="secondary">Secondary button</n-button> -->
      <div class="mt-10">
        <div class="text-center">
          <p>默认按钮组</p>
          <p>Default buttons</p>
        </div>
        <div class="mt-2">
          <n-button class="ml-10" size="xs">button text</n-button>
          <n-button class="ml-10" size="sm">button text</n-button>
          <n-button class="ml-10" size="base">button text</n-button>
          <n-button class="ml-10" size="lg">button text</n-button>
          <n-button class="ml-10" size="xl">button text</n-button>
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>主要按钮组</p>
          <p>Primary buttons</p>
        </div>
        <div class="mt-2">
          <n-button class="ml-10" variant="primary" size="xs"
            >button text</n-button
          >
          <n-button class="ml-10" variant="primary" size="sm"
            >button text</n-button
          >
          <n-button class="ml-10" variant="primary" size="base"
            >button text</n-button
          >
          <n-button class="ml-10" variant="primary" size="lg"
            >button text</n-button
          >
          <n-button class="ml-10" variant="primary" size="xl"
            >button text</n-button
          >
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>成功按钮组</p>
          <p>Success buttons</p>
        </div>
        <div class="mt-2">
          <n-button class="ml-10" variant="success" size="xs"
            >button text</n-button
          >
          <n-button class="ml-10" variant="success" size="sm"
            >button text</n-button
          >
          <n-button class="ml-10" variant="success" size="base"
            >button text</n-button
          >
          <n-button class="ml-10" variant="success" size="lg"
            >button text</n-button
          >
          <n-button class="ml-10" variant="success" size="xl"
            >button text</n-button
          >
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>警告按钮组</p>
          <p>Warning buttons</p>
        </div>
        <div class="mt-2">
          <n-button class="ml-10" variant="warning" size="xs"
            >button text</n-button
          >
          <n-button class="ml-10" variant="warning" size="sm"
            >button text</n-button
          >
          <n-button class="ml-10" variant="warning" size="base"
            >button text</n-button
          >
          <n-button class="ml-10" variant="warning" size="lg"
            >button text</n-button
          >
          <n-button class="ml-10" variant="warning" size="xl"
            >button text</n-button
          >
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>危险按钮组</p>
          <p>Danger buttons</p>
        </div>
        <div class="mt-2">
          <n-button class="ml-10" variant="danger" size="xs"
            >button text</n-button
          >
          <n-button class="ml-10" variant="danger" size="sm"
            >button text</n-button
          >
          <n-button class="ml-10" variant="danger" size="base"
            >button text</n-button
          >
          <n-button class="ml-10" variant="danger" size="lg"
            >button text</n-button
          >
          <n-button class="ml-10" variant="danger" size="xl"
            >button text</n-button
          >
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>禁用按钮组</p>
          <p>Disabled buttons</p>
        </div>
        <div class="mt-2">
          <n-button class="ml-10" disabled size="xs">button text</n-button>
          <n-button class="ml-10" variant="primary" disabled size="sm"
            >button text</n-button
          >
          <n-button class="ml-10" variant="success" disabled size="base"
            >button text</n-button
          >
          <n-button class="ml-10" variant="warning" disabled size="lg"
            >button text</n-button
          >
          <n-button class="ml-10" variant="danger" disabled size="xl"
            >button text</n-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NButton from "~/components/NButton";
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
    NButton
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
