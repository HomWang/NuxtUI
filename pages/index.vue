<template>
  <!-- <div class="container"> -->
  <!-- class="w-screen h-screen" -->
  <div>
    <div class="tc">
      <!--       
      <div class="m-auto" style="width: 400px">
        成功：
        <n-input
          status="success"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div class="m-auto" style="width: 400px">
        警告：
        <n-input
          status="warning"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div class="m-auto" style="width: 400px">
        失败：
        <n-input
          status="error"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div class="m-auto" style="width: 400px">
        <n-input
          size="xs"
          :disabled="newDisabled"
          icon="n-icon-search"
          iconType="before"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
        <n-input
          size="sm"
          :disabled="newDisabled"
          icon="n-icon-search"
          iconType="before"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
        <n-input
          size="base"
          :disabled="newDisabled"
          icon="n-icon-search"
          iconType="before"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        /><n-input
          size="lg"
          :disabled="newDisabled"
          icon="n-icon-search"
          iconType="before"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
        <n-input
          size="xl"
          :disabled="newDisabled"
          icon="n-icon-clean"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
          clearable
        />
        <p @click="clearAAA">点击清空</p>
      </div> -->
      <!-- <n-flex class="mt-5 bg-gray-200">
        <n-flex
          flex="1"
          class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
        >
          <div>
            短内容
          </div>
        </n-flex>
        <n-flex
          flex="1"
          class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
        >
          中等内容
        </n-flex>
        <n-flex
          flex="1"
          class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
        >
          这是一个很长的内容
        </n-flex>
      </n-flex>

      <n-flex class="mt-5 bg-gray-200">
        <n-flex
          flex="1"
          class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
        >
          <div>
            短内容
          </div>
        </n-flex>
        <n-flex
          flex="none"
          class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
        >
          中等内容中等内容中等内容中等内容中等内容中等内容
        </n-flex>
        <n-flex
          flex="1"
          class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
        >
          这是一个很长的内容
        </n-flex>
      </n-flex> -->
      <n-flex class="mt-5 bg-gray-200">
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
      </n-flex>
    </div>
  </div>
</template>

<script>
// import NCheckbox from "~/components/NCheckbox";
// import NGrid from "~/components/NGrid";
import NFlex from "~/components/NFlex";
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
    NFlex,
    // NContainer,
    // NHeader,
    // NAside,
    // NMain,
    // NFooter
    NInput
  },
  data() {
    return {
      inputValue: "",
      newDisabled: false,
      newStatus: "" //error warning success
    };
  },
  mounted() {},
  methods: {
    clearAAA() {
      this.inputValue = "";
    },
    onChange(val) {
      console.log("获取到改变后的值:", val, this.inputValue);
    },
    onInput(val) {
      this.inputValue = val;
      console.log("传出来的值：", val, "监听到的值", this.inputValue);
      if (val == 1) {
        this.newStatus = "success";
      } else if (val == 2) {
        this.newStatus = "warning";
      } else if (val == 3) {
        this.newStatus = "error";
      } else {
        this.newStatus = "";
      }
      console.log("获取正在输入的值:", val);
    },
    clickInput(e) {
      // console.log(e);
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
