<!--
 * @Author: 黄叶
 * @Date: 2023-05-20 22:58:30
 * @LastEditTime: 2023-06-13 00:11:44
 * @FilePath: /schoolWall/src/views/updateLog/updateLog.vue
 * @Description: 
-->
<template>
  <div>
    <div>
      <n-data-table
        :columns="columns"
        :data="data.reverse()"
        :bordered="false"
        :row-props="showUpdateContent"
        align="center"
        striped
        max-height="calc(100vh - 103.2px)"
        table-layout="auto"
      />
      <!-- 详情弹窗 -->
      <DeMiddlePopUpBox
        :box-class="'w-90%'"
        :show="showUpdateContentBox"
        @close="showUpdateContentBox = false"
      >
        <div class="p-5">
          <div class="flex items-center justify-between mb-1">
            <!-- 更新标题 -->
            <div class="text-4.5 font-bold">
              黄叶小屋-{{ updateContent.version }}
            </div>
            <!-- 更新类型 -->
            <div class="flex">
              <n-tag
                class="mr-2"
                :type="getType(data)"
                v-for="(data, index) in updateContent.type"
                >{{ data }}</n-tag
              >
            </div>
          </div>
          <!-- 更新时间 -->
          <div class="text-sm text-gray-6 mb-4">
            {{ updateContent.time }}
          </div>
          <!-- 更新内容 -->
          <div
            class="text-sm text-gray-6 mb-3"
            v-for="(data, index) in updateContent.content"
          >
            ・ {{ data }}
          </div>
        </div>
      </DeMiddlePopUpBox>
    </div>
  </div>
</template>

<script setup>
import DeMiddlePopUpBox from "../../components/newUI/DeMiddlePopUpBox.vue";

const columns = [
  {
    title: "版本号",
    key: "version",
    align: "center",
  },
  {
    title: "更新时间",
    key: "time",
    align: "center",
    width: 110,
    ellipsis: true,
  },
  {
    title: "更新类型",
    key: "type",
    align: "center",
    width: 110,
    ellipsis: true,
    render(row) {
      const type = row.type.map((typeKey) => {
        const typeValue = getType(typeKey);
        return h(
          NTag,
          {
            style: {
              marginRight: "6px",
            },
            type: typeValue,
            bordered: false,
          },
          {
            default: () => typeKey,
          }
        );
      });
      return type;
    },
  },
];

const data = [
  {
    version: "0.0.1",
    time: "2023-06-07 11:18",
    content: ["0.0.1版本上线"],
    type: ["新增"], // 1: 新增 2: 优化 3: 修复
    align: "center",
  },
  {
    version: "0.0.2",
    time: "2023-06-07 13:38",
    content: ["修复头像显示异常的问题", "修复帖子图片显示异常的问题"],
    type: ["修复"], // 1: 新增 2: 优化 3: 修复
    align: "center",
  },
  {
    version: "0.0.3",
    time: "2023-06-07 20:42",
    content: [
      "修复个人主页帖子中显示异常的问题",
      "修复第一次注册后获取不到用户ID的问题",
      "修复帖子详情中图片未垂直居中的问题",
    ],
    type: ["修复"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.4",
    time: "2023-06-08 01:07",
    content: ["修复了回复帖子是无法立刻显示的问题"],
    type: ["修复"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.5",
    time: "2023-06-08 01:30",
    content: ["复了tabbar刷新后显示异常的问题"],
    type: ["修复"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.6",
    time: "2023-06-08 06:44",
    content: [" 新增修改个人主页背景图功能"],
    type: ["新增"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.7",
    time: "2023-06-08 16:28",
    content: ["修复了个人主页动态中图片预览的问题"],
    type: ["修复"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.8",
    time: "2023-06-10 00:26",
    content: ["新增修改个人性别功能"],
    type: ["新增"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.9",
    time: "2023-06-12 00:01",
    content: ["优化首页下滑时自动收起发布按钮，上滑时弹出按钮"],
    type: ["优化"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.10",
    time: "2023-06-12 01:22",
    content: ["新增退出账号功能"],
    type: ["新增"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.11",
    time: "2023-06-12 03:33",
    content: ["新增修改个人个性签名功能"],
    type: ["新增"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.12",
    time: "2023-06-12 04:50",
    content: ["新增[更新日志页面]"],
    type: ["新增"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.13",
    time: "2023-06-12 05:44",
    content: ["优化首页中帖子置顶的显示"],
    type: ["优化"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.14",
    time: "2023-06-12 06:29",
    content: ["优化更新日志样式"],
    type: ["优化"], // 1: 新增 2: 优化 3: 修复
  },
  {
    version: "0.0.15",
    time: "2023-06-13 00:11",
    content: ["新增更改账号绑定功能",'修复个人主页无动态时加载异常的问题','优化主页发布按钮动画逻辑'],
    type: ["新增",'修复','优化'], // 1: 新增 2: 优化 3: 修复
  },
];

/**
 * @description: 获取更新类型
 * @param {*} type 更新类型
 */
const getType = (type) => {
  switch (type) {
    case "新增":
      return "info";
    case "优化":
      return "success";
    case "修复":
      return "warning";
  }
};

// 是否显示更新详情弹窗
const showUpdateContentBox = ref(false);
// 更新详情弹窗内容
const updateContent = ref({});
/**
 * @description: 点击行显示更新详情
 * @param {*} row 行数据
 */
const showUpdateContent = (row) => {
  return {
    onClick: () => {
      console.log(row);
      showUpdateContentBox.value = true;
      updateContent.value = row;
    },
  };
};
</script>

<style></style>
