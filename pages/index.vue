<template>
  <!-- <div class="container"> -->
  <!-- class="w-screen h-screen" -->
  <div>
    <!-- <div class="m-auto" style="width: 600px;height: 400px;">
      <n-container>
        <n-header class="text-center bg-gray-600">
          布局容器一
        </n-header>
        <n-container>
          <n-aside class="w-64 bg-gray-500">侧边栏</n-aside>
          <n-container>
            <n-main class="bg-gray-400">内容</n-main>
            <n-footer class="bg-gray-600">底部</n-footer>
          </n-container>
        </n-container>
      </n-container>
    </div>
    <div class="m-auto pt-10" style="width: 600px;height: 400px;">
      <n-container>
        <n-header class="text-center bg-gray-600">
          布局容器二
        </n-header>
        <n-container>
          <n-aside class="w-64 bg-gray-500">侧边栏</n-aside>
          <n-container>
            <n-main class="bg-gray-400">内容</n-main>
          </n-container>
        </n-container>
      </n-container>
    </div>
    <div class="m-auto pt-10" style="width: 600px;height: 400px;">
      <n-container>
        <n-header class="text-center bg-gray-600">
          布局容器三
        </n-header>
        <n-container>
          <n-main class="bg-gray-400">内容</n-main>
          <n-footer class="bg-gray-600">底部</n-footer>
        </n-container>
      </n-container>
    </div>
    <div class="m-auto pt-10" style="width: 600px;height: 400px;">
      <n-container>
        <n-aside class="w-64 bg-gray-500">布局容器四</n-aside>
        <n-main class="bg-gray-400">内容</n-main>
      </n-container>
    </div>
    <div class="m-auto pt-10" style="width: 600px;height: 400px;">
      <n-container>
        <n-aside class="w-64 bg-gray-500">侧边栏</n-aside>
        <n-container>
          <n-header class="text-center bg-gray-600">
            布局容器五
          </n-header>
          <n-container>
            <n-main class="bg-gray-400">内容</n-main>
            <n-footer class="bg-gray-600">底部</n-footer>
          </n-container>
        </n-container>
      </n-container>
    </div> -->
    <div class="tc">
      <div class="m-auto" style="width: 400px">
        成功：
        <n-input
          class="m-auto"
          status="success"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div class="m-auto" style="width: 400px">
        警告：
        <n-input
          class="m-auto"
          status="warning"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div class="m-auto" style="width: 400px">
        失败：
        <n-input
          class="m-auto"
          status="error"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import NCheckbox from "~/components/NCheckbox";
// import NGrid from "~/components/NGrid";
// import NFlex from "~/components/NFlex";
// import NContainer from "~/components/NContainer";
// import NHeader from "~/components/NHeader";
// import NAside from "~/components/NAside";
// import NMain from "~/components/NMain";
// import NFooter from "~/components/NFooter";
import NInput from "~/components/NInput";

export default {
  components: {
    // NCheckbox
    // NGrid
    // NFlex
    // NContainer,
    // NHeader,
    // NAside,
    // NMain,
    // NFooter
    NInput
  },
  data() {
    return {
      inputValue: ""
    };
  },
  mounted() {},
  methods: {
    onChange(val) {
      console.log("获取到改变后的值:", val);
    },
    onInput(val) {
      console.log("获取正在输入的值:", val);
    }
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
