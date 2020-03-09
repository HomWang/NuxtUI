<template>
  <div class="container">
    <div class="mb-20">
      <div class="mt-10">
        <div class="text-center">
          <p>基础列表</p>
        </div>
        <!-- data border show-header stripe height max-height @click-column @click-row @click-header-->
        <n-table
          :data="tableData"
          :border="true"
          :stripe="true"
          @click-column="onClickColumn"
          @click-row="onClickRow"
          @click-header="onClickHeader"
        >
          <n-table-column lable="第一列">
            <template slot-scope="scope">{{ scope.row.a }} </template>
          </n-table-column>
          <n-table-column lable="第二列" prop="b"></n-table-column>
          <n-table-column lable="第三列" prop="c"></n-table-column>
          <template slot="footer">
            footer
          </template>
        </n-table>
      </div>
    </div>
  </div>
</template>

<script>
import NButton from "~/components/NButton";
import NIcon from "~/components/NIcon";
import NTable from "~/components/NTable";
import NTableColumn from "~/components/NTableColumn";
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
    NButton,
    NTable,
    NTableColumn,
    NIcon
  },
  data() {
    return {
      tableData: [
        { a: 1, b: 2, c: 3 },
        { a: 2, b: 3, c: 4 },
        { a: 3, b: 4, c: 5 },
        { a: 2, b: 3, c: 4 },
        { a: 3, b: 4, c: 5 }
      ],
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
  },
  methods: {
    onClickRow(data) {
      console.log("row", data);
    },
    onClickHeader($event, data) {
      console.log("header", $event, data);
    },
    onClickColumn(data) {
      console.log("column", data);
    },
    testButton(data) {
      console.log("button", data);
    },
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
