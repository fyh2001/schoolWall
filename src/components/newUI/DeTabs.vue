<!--
 * @Author: 黄叶
 * @Date: 2023-06-07 01:41:11
 * @LastEditTime: 2023-06-07 03:32:16
 * @FilePath: /schoolWall/src/components/newUI/DeTabs.vue
 * @Description: 
-->
<template>
  <div class="relative">
    <div ref="tabRef" class="flex justify-between py-3.5 bg-white" :class="tabClass">
      <div
      
        v-for="(item, index) in props.list"
        :key="index"
        @click="emit('changeIndex', index)"
      >
        <div
          class="text-4 text-gray-5"
          :class="{
            'scale-115 text-green-6  font-bold transition duration-200 ease-in-out ':
              selectedIndex == index,
          }"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 指示条 -->
    <div ref="selectedBarRef" class="absolute bottom-1.5 w-2.5 h-0.8 rounded bg-green-7 transition duration-200 " :style="selectedBar"/>
  </div>
</template>

<script setup>
const emit = defineEmits(["changeIndex"]);

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
  tabClass: {
    type: String,
    default: "",
  },
});

const tabRef = ref(null);
const selectedBarRef = ref(null)

const selectedBarLeft = ref(0) // 指示条的left值
const selectedBarDistance = ref(0) // 指示条之间的距离

const selectedBar = computed(() => {
  return {
    transform:`translateX(${selectedBarLeft.value + (props.selectedIndex) * selectedBarDistance.value + "px"})`,
  };
});


onMounted(() => {
  selectedBarLeft.value = tabRef.value.children[0].offsetWidth / 2 - selectedBarRef.value.offsetWidth / 2 + tabRef.value.children[0].offsetLeft
  selectedBarDistance.value = tabRef.value.children[1].offsetLeft - tabRef.value.children[0].offsetLeft
});
</script>

<style>

</style>