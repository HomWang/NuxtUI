<template>
  <div :class="{ notDragShow: !isDragShow }" class="box">
    <div
      class="hiddenContent"
      v-show="isShowImage || !isDragShow"
      :class="isShowImageAnimate ? 'contentShow' : ''"
    >
      <div class="imgContent">
        <img :src="bgImage" alt="" />
        <img
          class="imgs"
          :src="queryImage"
          :style="`left:${scrollWidth}px;top:${fy}px;`"
          alt=""
        />
        <p
          class="tips"
          :class="{
            marginBottom: isShowTips,
            tipsError: !isSuccess,
            tipsSuccesss: isSuccess
          }"
        >
          {{
            !isSuccess
              ? "请拖动滑块将悬浮图像正确拼合"
              : "验证成功！ 共耗时" + successTime + "s"
          }}
        </p>
      </div>
    </div>
    <div class="bottom_button">
      <p v-show="!isSuccess && !finishIdentity">向右滑动完成验证</p>
      <div class="go_bg" :style="`width:${scrollWidth}px`"></div>
      <div
        @mousedown="drag"
        @mouseover="showImage"
        @mouseleave="hiddenImage"
        class="button"
        v-if="!finishIdentity"
      >
        |||
      </div>
      <div v-else class="button">{{ isSuccess ? "√" : "×" }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isFinishHand: {
      type: Boolean,
      default: false //是否拖动显示 默认为true
    },
    isDragShow: {
      type: Boolean,
      default: true //是否拖动显示 默认为true
    }
  },
  data() {
    return {
      bgImage: "",
      queryImage: "",
      scrollWidth: 0,
      fx: 0,
      fy: 0,
      successTime: 0,
      isShowImage: false, //是否显示图片
      isShowImageAnimate: false, //动画
      finishIdentity: false, //是否完成验证
      isSuccess: false, //是否验证成功
      canDrag: true, //是否能够拖动
      canGetNewImage: true, //是否能够获取接口图片
      isShowTips: false, //是否显示提示语
      canClick: true //当前拖动是否已经完成
    };
  },
  watch: {
    isFinishHand(_new, _old) {
      setTimeout(() => {
        this.initData();
      }, 1500);
    }
  },
  mounted() {
    this.getNewImageInit();
  },
  methods: {
    initData() {
      this.successTime = 0;
      this.scrollWidth = 0;
      this.fx = 0;
      this.fy = 0;
      this.queryImage = "";
      this.bgImage = "";
      this.isShowImage = false; //是否显示图片
      this.isShowImageAnimate = false; //动画
      this.finishIdentity = false; //是否完成验证
      this.isSuccess = false; //是否验证成功
      this.canDrag = true; //是否能够拖动
      this.canGetNewImage = true; //是否能够获取接口图片
      this.isShowTips = false; //是否显示提示语
      this.canClick = true; //当前拖动是否已经完成
    },
    getNewImageInit() {
      this.$api.header.slide().then(res => {
        this.bgImage = res.data.data.shadowImage;
        this.queryImage = res.data.data.slideImage;
        this.fy = res.data.data.imageCoordinate.y;
        this.scrollWidth = 0;
        this.token = res.data.data.token;
        this.canDrag = false;
        this.canClick = false;
      });
    },
    getNewImage() {
      this.$api.header.slide().then(res => {
        this.bgImage = res.data.data.shadowImage;
        this.queryImage = res.data.data.slideImage;
        this.fy = res.data.data.imageCoordinate.y;
        this.scrollWidth = 0;
        this.token = res.data.data.token;
        this.canGetNewImage = false;
        this.canDrag = false;
        this.canClick = false;
      });
    },
    showImage() {
      if (!this.canGetNewImage) return;
      if (this.canClick) {
        this.getNewImage();
      }
      this.isShowImage = true;
      setTimeout(() => {
        this.isShowImageAnimate = true;
      }, 100);
    },
    hiddenImage() {
      if (!this.canDrag) {
        this.isShowImage = false;
        setTimeout(() => {
          this.isShowImageAnimate = false;
        }, 100);
        this.canGetNewImage = true;
        //this.canClick = false;
      }
    },
    flash() {
      this.isSuccess = false;
    },
    drag() {
      let first = {};
      let tx;
      let that = this;
      if (that.canClick) return;
      that.canDrag = true;
      document.onmousemove = function(e) {
        if (!that.canDrag) return;
        if (!first.x) {
          first = { x: e.clientX };
          that.successTime = new Date().getTime();
        } else {
          tx = e.clientX - first.x;
        }
        if (tx < 300 && tx >= 0) {
          that.scrollWidth = tx;
        } else if (tx > 300) {
          that.scrollWidth = 300;
        } else if (tx < 0) {
          that.scrollWidth = 0;
        }
      };
      document.onmouseup = function() {
        if (that.canDrag) {
          document.onmousemove = null;
          document.onmouseup = null;
          that.$api.header
            .slideSubmit({
              x: that.scrollWidth,
              token: that.token
            })
            .then(res => {
              that.finishIdentity = true;
              that.canGetNewImage = false;
              that.isShowTips = true;
              if (res.data.data) {
                that.$emit("hasIdentity", {
                  isIdentity: res.data.data,
                  scrollx: that.scrollWidth,
                  token: that.token
                });
                that.successTime = parseFloat(
                  (new Date().getTime() - that.successTime) / 1000
                ).toFixed(2);
                setTimeout(() => {
                  that.isShowImage = false;
                }, 1500);
              } else {
                setTimeout(() => {
                  that.isShowImage = false;
                  that.finishIdentity = false;
                  that.canGetNewImage = true;
                  that.scrollWidth = 0;
                }, 1500);
              }
              setTimeout(() => {
                that.isShowTips = false;
              }, 1500);
              that.isSuccess = res.data.data;
              that.canDrag = false;
              that.canClick = true;
            });
        }
      };
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.box {
  height: 36px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 10px #ccc;
  position: relative;
  margin-bottom: 16px;
  &.notDragShow {
    position: relative;
    overflow: hidden;
    height: auto;
    .hiddenContent {
      position: relative;
      top: 0px;
      background-color: #fff;
      opacity: 1;
      transition: all 0.3s;
    }
  }
  .hiddenContent {
    position: absolute;
    top: -140px;
    background-color: #fff;
    opacity: 0;
    transition: all 0.3s;
  }
  .contentShow {
    opacity: 1;
    top: -150px;
  }
  .box .img img {
    width: 100%;
    height: 140px;
    float: left;
  }
  .bottom_button {
    height: 36px;
    background-color: #f0f0f0;
    float: left;
    width: 350px;
    position: relative;
  }
  .bottom_button p {
    width: 100%;
    height: 100%;
    line-height: 36px;
    text-align: center;
    position: absolute;
    z-index: 1;
    top: 0;
    margin: 0;
    padding: 0;
    left: 0;
    user-select: none;
    color: #7f7f7f;
    cursor: pointer;
  }
  .bottom_button .go_bg {
    height: 36px;
    background-color: #9ee8b3;
    width: 0;
    float: left;
    position: relative;
    z-index: 2;
  }
  .bottom_button .button {
    width: 40px;
    height: 36px;
    float: left;
    background-color: #fff;
    text-align: center;
    line-height: 34px;
    font-size: 16px;
    color: #848484;
    cursor: pointer;
    user-select: none;
    position: relative;
    z-index: 2;
    border: solid 1px #b2b2b2;
    box-sizing: border-box;
  }
  .fragment {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
  }
  .bgopcity {
    background-size: contain;
    border-radius: 0;
  }
  .tiptitle {
    height: 42px;
    display: flex;
    width: 150px;
    align-items: center;
    float: left;
    box-sizing: border-box;
  }
  .tipButton {
    height: 42px;
    display: flex;
    align-items: center;
    float: left;
    box-sizing: border-box;
    width: 150px;
    justify-content: flex-end;
    padding-right: 10px;
  }
  .tipButton img {
    cursor: pointer;
  }
  .tiptitle .titles {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #545454;
    padding-left: 10px;
  }
  .tiptitle img {
    display: block;
    float: right;
  }
  .imgContent {
    position: relative;
    height: 140px;
    width: 350px;
    float: left;
    overflow: hidden;
  }
  .imgContent .bgImage {
    position: relative;
    height: 140px;
    width: 350px;
    margin: 0 auto;
  }
  .imgs {
    width: 50px;
    height: 40px;
    position: absolute;
  }
  .line {
    background: #d2d2d2;
    height: 1px;
    width: 100%;
    margin-bottom: 10px;
    float: left;
  }
  .tips {
    position: absolute;
    bottom: -30px;
    left: 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    width: 100%;
    margin: 0;
    padding: 0;
    color: #ffffff;
    transition: all 0.4s;
    margin-bottom: 0px;
    font-size: 12px;
  }
  .marginBottom {
    margin-bottom: 30px;
  }
  .tipsError {
    background-color: #e97450;
  }
  .tipsSuccesss {
    background-color: #49bf6a;
  }
}
</style>
