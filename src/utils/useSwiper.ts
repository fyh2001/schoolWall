import { Ref, computed, onMounted, reactive, ref, watch } from "vue";
import useGesture from "./useGesture"

interface SwiperOptions {
  containerRef: Ref<HTMLElement | null>;
  dataLength: number;
  currentIndex: Ref<number>;
  calculateFutureIndex?: (
    distance: number,
    containerWidth: number,
    currentIndex: number,
    prevIndex: number,
    nextIndex: number
  ) => number;
  calculatePrevPosition?: (
    currentPosition: number,
    containerWidth: number,
    container: HTMLElement
  ) => number;
  calculateNextPosition?: (
    currentPosition: number,
    containerWidth: number,
    container: HTMLElement
  ) => number;
}
/**
 * 默认的计算即将居中的元素的索引的函数
 * @param distance 拖拽距离
 * @param currentIndex 当前居中的元素的索引
 * @param prevIndex 上一个元素的索引
 * @param nextIndex 下一个元素的索引
 * @returns 即将居中的元素的索引
 */
const defaultCalculateFutureIndex = (
  distance: number,
  containerWidth: number,
  currentIndex: number,
  prevIndex: number,
  nextIndex: number
) => {
  const minDistance = containerWidth / 3;
  if (distance > minDistance) return prevIndex;
  if (distance < -minDistance) return nextIndex;
  return currentIndex;
};

/**
 * 默认的计算上一个元素的位置的函数
 * @param currentPosition 当前居中的元素的位置
 * @param containerWidth 容器宽度
 * @param container 容器元素
 * @returns 上一个元素的位置
 */
const defaultCalculatePrevPosition = (
  currentPosition: number,
  containerWidth: number
) => currentPosition - containerWidth;

/**
 * 默认的计算下一个元素的位置的函数
 * @param currentPosition 当前居中的元素的位置
 * @param containerWidth 容器宽度
 * @param container 容器元素
 * @returns 下一个元素的位置
 */
const defaultCalculateNextPosition = (
  currentPosition: number,
  containerWidth: number
) => currentPosition + containerWidth;

// 拖拽数据
const dragData = reactive({
  dragging: false,
  startX: 0,
  moveX: 0,
  endX: 0,
});
const currentAnimationPosition = ref(0);

// 动画中断的钩子
type AnimationInterruptHook = (distance: number) => void;
const animationInterruptHooks: AnimationInterruptHook[] = [];
const onAnimateInterrupt = (hook: AnimationInterruptHook) =>
  animationInterruptHooks.push(hook);

type AnimationEndHook = (distance: number) => void;
const animationEndHooks: AnimationEndHook[] = [];
const onAnimateEnd = (hook: AnimationEndHook) => animationEndHooks.push(hook);

const animationRestorePosition = () =>
  requestAnimationFrame(() => {
    if (dragData.dragging) {
      animationInterruptHooks.forEach((hook) =>
        hook(currentAnimationPosition.value)
      );
      return;
    }

    const distance = currentAnimationPosition.value;
    if (Math.abs(distance) < 3) {
      currentAnimationPosition.value = 0;
      animationEndHooks.forEach((hook) => hook(distance));
      return;
    }

    currentAnimationPosition.value = distance * 0.9;
    animationRestorePosition();
  });

function useSwiper(options: SwiperOptions) {
  // 初始化参数
  const containerWidth = ref(0);
  onMounted(() => {
    containerWidth.value = options.containerRef.value!.offsetWidth;
  });
  const calculateFutureIndex =
    options.calculateFutureIndex || defaultCalculateFutureIndex;
  const calculatePrevPosition =
    options.calculatePrevPosition || defaultCalculatePrevPosition;
  const calculateNextPosition =
    options.calculateNextPosition || defaultCalculateNextPosition;

  const currentIndex = options.currentIndex;
  const prevIndex = computed(() => {
    return currentIndex.value === 0
      ? options.dataLength - 1
      : currentIndex.value - 1;
  });
  const nextIndex = computed(() => {
    return currentIndex.value === options.dataLength - 1
      ? 0
      : currentIndex.value + 1;
  });

  const currentPosition = computed(() => {
    if (dragData.dragging) return dragData.moveX - dragData.startX;
    return currentAnimationPosition.value;
  });
  const prevPosition = computed(() =>
    calculatePrevPosition(
      currentPosition.value,
      containerWidth.value,
      options.containerRef.value!
    )
  );
  const nextPosition = computed(() =>
    calculateNextPosition(
      currentPosition.value,
      containerWidth.value,
      options.containerRef.value!
    )
  );

  // 初始化监听器
  const { onStart, onMove, onEnd } = useGesture(options.containerRef);

  // 索引改变的钩子
  type IndexChangedHook = (newIndex: number, oldIndex: number) => void;
  const indexChengedHooks: IndexChangedHook[] = [];
  const onIndexChanged = (hook: IndexChangedHook) =>
    indexChengedHooks.push(hook);

  // 百分比改变的钩子
  type PercentageHook = (percentage: number, direction: number) => void;
  const percentageHooks: PercentageHook[] = [];
  const onPercentageChanged = (hook: PercentageHook) =>
    percentageHooks.push(hook);

  const percentage = computed(() => {
    const tem = currentPosition.value / containerWidth.value;
    return tem > 0 ? tem : tem + 1;
  });
  watch(percentage, (newValue) => {
    const direction = dragData.moveX - dragData.startX > 0 ? 1 : -1;
    const newPercentage = direction > 0 ? newValue : 1 - newValue;
    percentageHooks.forEach((hook) => hook(newPercentage, direction));
  });

  onStart((x) => {
    dragData.dragging = true;
    dragData.startX = x - currentAnimationPosition.value;
    dragData.moveX = x;
  });

  onMove((x) => {
    dragData.moveX = x;
  });

  onEnd((x) => {
    dragData.dragging = false;
    dragData.endX = x;

    const distance = dragData.endX - dragData.startX;

    const oldIndex = currentIndex.value;
    const newIndex = calculateFutureIndex(
      distance,
      containerWidth.value,
      currentIndex.value,
      prevIndex.value,
      nextIndex.value
    );
    currentIndex.value = newIndex;
    // 触发索引改变的钩子
    indexChengedHooks.forEach((hook) => hook(newIndex, oldIndex));

    let offset = 0;
    if (newIndex !== oldIndex)
      offset = distance > 0 ? -containerWidth.value : containerWidth.value;
    currentAnimationPosition.value = currentPosition.value + offset + distance;

    animationRestorePosition();
  });

  return {
    currentIndex,
    prevIndex,
    nextIndex,
    currentPosition,
    prevPosition,
    nextPosition,
    onStart,
    onMove,
    onEnd,
    onIndexChanged,
    onPercentageChanged,
    onAnimateInterrupt,
    onAnimateEnd,
  };
}

export default useSwiper;