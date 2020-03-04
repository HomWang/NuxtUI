<template>
  <div class="container">
    <div class="mb-20">
      <div class="mt-10">
        <div class="text-center">
          <p>基本按钮组</p>
          <p>basic buttons</p>
        </div>
        <div class="mt-2">
          <n-button
            class="ml-10"
            size="xs"
          >button text</n-button>
          <n-button
            class="ml-10"
            variant="primary"
            size="sm"
          >button text</n-button>
          <n-button
            class="ml-2"
            variant="secondary"
            size="sm"
          >次要按钮</n-button>
          <n-button
            class="ml-2"
            variant="tertiary"
            size="sm"
          >第三按钮</n-button>
          <n-button
            class="ml-10"
            variant="success"
            size="base"
          >button text</n-button>
          <n-button
            class="ml-10"
            variant="warning"
            size="lg"
          >button text</n-button>
          <n-button
            class="ml-10"
            variant="danger"
            size="xl"
          >button text</n-button>
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>禁用按钮组</p>
          <p>Disabled buttons</p>
        </div>
        <div class="mt-2">
          <n-button
            class="ml-10"
            disabled
            size="xs"
          >button text</n-button>
          <n-button
            class="ml-10"
            variant="primary"
            disabled
            size="sm"
          >button text</n-button>
          <n-button
            class="ml-2"
            variant="secondary"
            disabled
            size="sm"
          >次要按钮</n-button>
          <n-button
            class="ml-2"
            variant="tertiary"
            disabled
            size="sm"
          >第三按钮</n-button>
          <n-button
            class="ml-10"
            variant="success"
            disabled
            size="base"
          >button text</n-button>
          <n-button
            class="ml-10"
            variant="warning"
            disabled
            size="lg"
          >button text</n-button>
          <n-button
            class="ml-10"
            variant="danger"
            disabled
            size="xl"
          >button text</n-button>
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>图标按钮组</p>
          <p>Disabled buttons</p>
        </div>
        <div class="mt-2">
          <n-button
            icon="icon-iconjiazai"
            iconType="before"
            class="ml-10"
            disabled
            size="xs"
          >button text</n-button>
          <n-button
            class="ml-10"
            icon="icon-coinCity_heading_ite"
            variant="primary"
            size="sm"
          >button text</n-button>
          <n-button
            class="ml-2"
            icon="icon-otc_body_icon_sele"
            variant="secondary"
            size="sm"
          >次要按钮</n-button>
          <n-button
            class="ml-2"
            icon="icon-coinCity_location"
            iconType="before"
            variant="tertiary"
            size="sm"
          >第三按钮</n-button>
          <n-button
            class="ml-10"
            icon="icon-otc_body_icon_sele"
            variant="success"
            size="base"
          >button text</n-button>
          <n-button
            class="ml-10"
            icon="icon-Exchange_trading_switch"
            variant="warning"
            size="lg"
          >button text</n-button>
          <n-button
            class="ml-10"
            :loading="true"
            icon="iconsuanli_icon_kline"
            iconType="before"
            variant="danger"
            size="xl"
          >button text</n-button>
        </div>
      </div>
      <div class="mt-10">
        <div class="text-center">
          <p>图标</p>
        </div>
        <n-icon
          class="iconjiazaizhong"
          :loading="true"
          size="xl"
        ></n-icon>
      </div>
    </div>
  </div>
</template>

<script>
import NButton from "~/components/NButton";
import NIcon from "~/components/NIcon";
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
    NButton,
    NIcon
  },
  data () {
    return {
      text: {
        value: null,
        disabled: null,
        id: "text-field",
        name: "text-field"
      }
    };
  },
  mounted () {
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
