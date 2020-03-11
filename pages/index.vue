<template>
  <!-- <div class="container"> -->
  <!-- class="w-screen h-screen" -->
  <div>
    <div class="tc">
      <!-- <div
        class="m-auto"
        style="width: 400px"
      >
        成功：
        <n-input
          status="success"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div
        class="m-auto"
        style="width: 400px"
      >
        警告：
        <n-input
          status="warning"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div
        class="m-auto"
        style="width: 400px"
      >
        失败：
        <n-input
          status="error"
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
        />
      </div>
      <div
        class="m-auto"
        style="width: 400px"
      >
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
        />
        <n-input
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
          v-model="inputValue"
          @change="onChange"
          @input="onInput"
          clearable
        />
        <p @click="clearAAA">点击清空</p>
      </div> -->
      <div
        class="m-auto pt-10"
        style="width: 400px"
      >
        <!-- :format="['lable', 'value']" -->
        <n-select
          @change="newChange"
          :data="newData"
          :format="{lable: 'lable1', value: 'value1'}"
          placeholder="请选择你的名字"
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
// import NInput from "~/components/NInput";
import NSelect from "~/components/NSelect";

export default {
  components: {
    // NCheckbox
    // NGrid,
    // NFlex,
    // NContainer,
    // NHeader,
    // NAside,
    // NMain,
    // NFooter
    // NInput
    NSelect
  },
  data () {
    return {
      newData: [
        {
          id: 1,
          lable1: "郭芳",
          value1: 29,
        },
        {
          id: 2,
          lable1: "王弘",
          value1: 28,
        },
        {
          id: 3,
          lable1: "郭芳",
          value1: 29,
        },
        {
          id: 4,
          lable1: "王弘",
          value1: 28,
        },
        {
          id: 5,
          lable1: "郭芳",
          value1: 29,
        },
        {
          id: 6,
          lable1: "王弘",
          value1: 28,
        },
        {
          id: 7,
          lable1: "郭芳",
          value1: 29,
        },
        {
          id: 8,
          lable1: "王弘",
          value1: 28,
        },
        {
          id: 9,
          lable1: "郭芳",
          value1: 29,
        },
        {
          id: 10,
          lable1: "王弘",
          value1: 28,
        }
      ]
    };
  },
  mounted () { },
  methods: {
    newChange (val) {
      console.log(val)
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
