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
      <div class="m-auto pt-10" style="width: 600px">
        <n-select
          @change="newChange"
          :data="newData"
          :format="{ lable: 'lable1', value: 'value1' }"
          placeholder="请选择你的名字"
        />
        <n-menu @select="selectNemu" :unique-opened="false" class="bg-gray-500">
          <n-menu-item index="1" class="bg-gray-500">
            <n-icon class="n-icon-redact"></n-icon>
            处理中心1(menu-item)
          </n-menu-item>
          <n-submenu index="2" class="bg-gray-500">
            处理中心2(submenu)
            <n-submenu-item
              v-for="(item, index) in newData1"
              :key="index"
              :index="`2-${index}`"
              class="bg-gray-500"
            >
              <n-icon :class="index == 0 ? `n-icon-redact` : ''"></n-icon>
              {{ item.lable1 }}-{{ index }}(submenu-item)
            </n-submenu-item>
          </n-submenu>
          <n-menu-item index="3" class="bg-gray-500">
            <n-icon class="n-icon-redact"></n-icon>
            处理中心3
          </n-menu-item>
          <n-submenu index="4" class="bg-gray-500">
            处理中心4(submenu)
            <n-submenu-item
              v-for="(item, index) in newData1"
              :key="index"
              :index="`4-${index}`"
              class="bg-gray-500"
            >
              <!-- <n-menu-item class="bg-gray-500"> -->
              4-{{ index }}(submenu-item)
              <!-- </n-menu-item> -->
              <!-- <n-submenu-item class="bg-gray-500">
                22222222222222222222(submenu-item)内部
              </n-submenu-item> -->
              <n-submenu-item
                v-for="(item1, index1) in newData1"
                :key="index1"
                :index="`4-${index}-${index1}`"
                class="bg-gray-500"
              >
                4-{{ index }}-{{ index1 }}(submenu-item)内部
              </n-submenu-item>
            </n-submenu-item>
          </n-submenu>
        </n-menu>
        <!-- <section class="my-1">
          <n-button @click="play">播放</n-button>
          <n-button @click="refresh">刷新</n-button>
          <n-button @click="pause">暂停</n-button>
        </section>
        <n-flv-player
          class="w-full"
          ref="fp"
          :n-video="false"
          :controls="false"
          :autoplay="false"
          poster="http://nuxt-ui.com/img/jake.jpg"
          :mediaDataSource="{
            type: 'flv',
            url: 'http://127.0.0.1:7001/live/movie.flv',
            isLive: true
          }"
          :config="{
            // enableStashBuffer:false,
          }"
        /> -->
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
import NButton from "~/components/NButton";
import NIcon from "~/components/NIcon";
import NSelect from "~/components/NSelect";
import NMenu from "~/components/NMenu";
import NMenuItem from "~/components/NMenuItem";
import NSubmenu from "~/components/NSubmenu";
import NSubmenuItem from "~/components/NSubmenuItem";
import NFlvPlayer from "~/components/NFlvPlayer";
import Vue from "vue";
import plugin from "../index";

Vue.use(plugin);

/**

* 主题

*/

// class Subject {

//   constructor() {

//     this.observes = new Map(); //订阅者对象集合

//     this.messages = []; //推送的消息集合

//   }

//   // 订阅主题

//   add (observe) {

//     this.messages.forEach(message => {

//       observe.update(message);

//     })

//     this.observes.set(observe.id, observe);
//     console.log(this.messages)

//   }

//   //取消订阅

//   remove (observe) {

//     this.observes.has(observe.id) && this.observes.delete(observe.id);
//     console.log(this.messages)

//   }

//   //推送消息

//   notify (value) {

//     this.messages.push(value);

//     this.observes.forEach(observe => {

//       observe.update(value)

//     })

//     console.log(this.messages)
//   }

// }

// /**

// * 订阅者

// */

// class Observe {

//   constructor(id) {

//     this.id = id; // 实例对象唯一标识

//   }

//   update (message) {

//     console.log("id: %s, value: %s", this.id, message)

//   }

// }

// // 假设生成guid

// function Guid () {

//   function s4 () {

//     return Math.floor((1 + Math.random()) * 0x10000)

//       .toString(16)

//       .substring(1);

//   }

//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

// }

// const subject = new Subject();

// var o1 = new Observe(Guid()),

//   o2 = new Observe(Guid()),

//   o3 = new Observe(Guid()),

//   o4 = new Observe(Guid());

// setTimeout(() => {
//   subject.add(o1);
// }, 3000);

// setTimeout(() => {
//   subject.add(o2);
// }, 3000);

// setTimeout(() => {
//   subject.add(o3);
// }, 3000);

// setTimeout(() => {
//   subject.notify("推送1");
// }, 3000);

// setTimeout(() => {
//   subject.remove(o1);
// }, 3000);

// setTimeout(() => {
//   subject.notify("[删除o1]: 推送2");
// }, 3000);

// setTimeout(() => {
//   subject.remove(o2);
// }, 3000);

// setTimeout(() => {
//   subject.notify("[删除o1、02]: 推送3");
// }, 3000);

// setTimeout(() => {
//   subject.remove(o3);
// }, 3000);

// setTimeout(() => {
//   subject.notify("[删除o1、02、03]: 推送4");
// }, 3000);

// setTimeout(() => {
//   subject.add(o4); // 接收所有历史消息
// }, 3000);

//输出
// id: e7766edc-f47d-d726-7ec6-456acf87dbb4, value: 推送1
// id: 2d1c6763-8abf-e755-64ba-e87af7582f84, value: 推送1
// id: 99d33283-6889-73af-da80-0f8c22a49983, value: 推送1
// id: 2d1c6763-8abf-e755-64ba-e87af7582f84, value: [删除o1]: 推送2
// id: 99d33283-6889-73af-da80-0f8c22a49983, value: [删除o1]: 推送2
// id: 99d33283-6889-73af-da80-0f8c22a49983, value: [删除o1、02]: 推送3
// id: b67a8969-0051-41bc-8c76-08b400d80a9e, value: 推送1
// id: b67a8969-0051-41bc-8c76-08b400d80a9e, value: [删除o1]: 推送2
// id: b67a8969-0051-41bc-8c76-08b400d80a9e, value: [删除o1、02]: 推送3
// id: b67a8969-0051-41bc-8c76-08b400d80a9e, value: [删除o1、02、03]: 推送4

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
    NButton,
    NIcon,
    NSelect,
    NMenu,
    NMenuItem,
    NSubmenu,
    NSubmenuItem,
    NFlvPlayer
  },
  data() {
    return {
      newData1: [
        {
          id: 1,
          lable1: "选项1",
          value1: 1
        },
        {
          id: 1,
          lable1: "选项1",
          value1: 1
        },
        {
          id: 1,
          lable1: "选项1",
          value1: 1
        },
        {
          id: 2,
          lable1: "选项2",
          value1: 2
        },
        {
          id: 3,
          lable1: "选项3",
          value1: 3
        },
        {
          id: 4,
          lable1: "选项4",
          value1: 4
        }
      ],
      newData: [
        {
          id: 1,
          lable1: "郭芳",
          value1: 29
        },
        {
          id: 2,
          lable1: "王弘",
          value1: 28
        },
        {
          id: 3,
          lable1: "郭芳",
          value1: 29
        },
        {
          id: 4,
          lable1: "王弘",
          value1: 28
        },
        {
          id: 5,
          lable1: "郭芳",
          value1: 29
        },
        {
          id: 6,
          lable1: "王弘",
          value1: 28
        },
        {
          id: 7,
          lable1: "郭芳",
          value1: 29
        },
        {
          id: 8,
          lable1: "王弘",
          value1: 28
        },
        {
          id: 9,
          lable1: "郭芳",
          value1: 29
        },
        {
          id: 10,
          lable1: "王弘",
          value1: 28
        }
      ]
    };
  },
  mounted() {},
  methods: {
    selectNemu(valur, key, keyPath) {
      // this.$toast("点击弹出提示", { position: "middle" });
      this.$toast("你知道我在等你吗？", {
        position: "middle",
        closeButton: {
          text: "知道了",
          callback: () => {
            console.log("他说知道了");
          }
        }
      });
      // subject.add(o4);
      // console.log(valur, key, keyPath);
    },
    newChange(val) {
      console.log(val);
    },
    play() {
      this.$refs.fp.play();
    },
    refresh() {
      this.$refs.fp.refresh();
    },
    pause() {
      this.$refs.fp.pause();
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
