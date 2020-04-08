<script type="text/ecmascript-6">
/* eslint-disable */
import flvjs from 'flv.js'
import NFlvPlayerTheme from "../plugins/themes/default/NFlvPlayer";

const {
  baseClass,
} = NFlvPlayerTheme;

export default {
  name: "NFlvPlayer",
  props: {
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    mediaDataSource: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: {
        enableWorker: true,
        enableStashBuffer: false,
        stashInitialSize: 128,// 减少首桢显示等待时长
      },
      required: false
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      required: false
    },
    // 预览图（海报图片）
    poster: {
      type: String,
      required: false
    },
    // 是否使用原生控制属性
    controls: {
      type: Boolean,
      default: false,
      required: false
    },
    // 是否使用原生样式
    nVideo: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data() {
    return {
      hoverState: false,
      isSupported: true,
      flvPlayer: {},
      state: {
        load: false
      }
    }
  },

  computed: {
    /**
     * The default classes for the flex
     * 播放器的默认类
     * @return {Array}
     */
    currentClass() {
      let classes = [
        `${this.$options._componentTag}`,
        this.baseClass
      ];
      return classes
    }
  },

  // watch: {},

  // beforeCreate: function () {},
  created: function () {
    this.isSupported = flvjs.isSupported()
    this.flvPlayer = flvjs.createPlayer(this.mediaDataSource, this.config)
  },
  // beforeMount: function () {},

  mounted: function () {
    if(!this.nVideo){
      this.flvPlayer.attachMediaElement(this.$el)
    }else{
      this.flvPlayer.attachMediaElement(this.$el.firstElementChild)
    }
    if (this.autoplay) {
      this.play()
    }
  },

  // beforeUpdate: function () {},
  // updated: function () {},
  // beforeDestroy: function () {},
  // destroyed: function () {},

  methods: {
    constructor: function (mediaDataSource, config) {
      this.flvPlayer.constructor(mediaDataSource, config)
    },
    destroy: function () {
      this.flvPlayer.destroy()
    },
    on: function (event, listener) {
      this.flvPlayer.on(event, listener)
    },
    off: function (event, listener) {
      this.flvPlayer.off(event, listener)
    },
    load: function () {
      this.flvPlayer.load()
      this.state.load = true
      if (this.autoplay) {
        this.play()
      }
    },
    unload: function () {
      this.flvPlayer.unload()
      this.state.load = false
    },
    // 播放
    play: function () {
      this.state.load || this.load()
      this.flvPlayer.play()
    },
    // 暂停
    pause: function () {
      this.flvPlayer.pause()
    },
    // 刷新
    refresh: function () {
      this.pause()
      this.unload()
      this.play()
    },
    onMouseenter () {
      console.log("移入");
      this.hoverState = true;
    },
    onMouseleave () {
      console.log("移出");
      this.hoverState = false;
    },
    /**
     * Raster attribute
     * video属性
     * @return {Object}
     */
    getAttributes() {
      return {
        controls: this.controls && "controls",
        poster: this.poster,
        x5Playsinline: "",
        playsinline: true,
        webkitPlaysinline: true,
        xWebkitAirplay: true,
        x5VideoPlayerType: "h5",
        x5VideoPlayerFullscreen: "",
        x5VideoOrientation: "portraint"
      };
    },
    /**
     * The component to render according to the props
     * Video组件
     * @return {String}
     */
    videoRender () {
      return this.$createElement(
        "video",
      {
        attrs: this.getAttributes(),
        // class: this.currentClass,
        on: {
          mouseenter: this.onMouseenter,
          mouseleave: this.onMouseleave
        }
      },
      );
    },
    /**
     * The component to render according to the props
     * 控制组件组件
     * @return {String}
     */
    submenuTitleRender () {
      return this.$createElement(
        "div",
        {
          class: `absolute w-full h-full bg-black-rgba-700 bottom-0 left-0`,
          props: {},
          on: {
          }
        },
        // [newText, this.iconToRender()]
      );
    },
  },
  render: function(createElement) {
    return this.nVideo ? createElement(
      "div",
      {
        // attrs: this.getAttributes(),
        class: this.currentClass,
        // on: {
        //   mouseenter: this.onMouseenter,
        //   mouseleave: this.onMouseleave
        // }
      },
      [this.videoRender(), this.hoverState && this.submenuTitleRender()]
      // this.$slots.default
    ) : this.videoRender()
  }
}
</script>

<style scoped></style>
