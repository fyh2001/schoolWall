import { Ref, onBeforeUnmount, onMounted, onUnmounted } from "vue";

type GestureEventType = "start" | "move" | "end" | "cancel";
type GestureEventCallback = (x: number, y: number) => void;

function useGesture(eleRef: Ref<HTMLElement | null>) {
  /**
   * 回调函数集合
   */
  const callbacks = new Map<GestureEventType, GestureEventCallback[]>();

  /**
   * 生成回调函数设置器
   * @param name 回调函数名称
   */
  const callbackSetter =
    (name: GestureEventType) => (callback: GestureEventCallback) => {
      callbacks.set(name, [...(callbacks.get(name) || []), callback]);
    };

  /**
   * 根据回调函数类型调用所有回调函数
   * @param type 回调函数类型
   * @param x x坐标
   * @param y y坐标
   */
  function callAllCallbackByType(type: GestureEventType, x: number, y: number) {
    callbacks.get(type)?.forEach((callback) => callback(x, y));
  }

  function handleTouchStart(e: TouchEvent) {
    const { clientX, clientY } = e.touches[0];
    callAllCallbackByType("start", clientX, clientY);
  }
  function handleTouchMove(e: TouchEvent) {
    const { clientX, clientY } = e.touches[0];
    callAllCallbackByType("move", clientX, clientY);
  }
  function handleTouchEnd(e: TouchEvent) {
    const { clientX, clientY } = e.changedTouches[0];
    callAllCallbackByType("end", clientX, clientY);
  }
  function handleTouchCancel(e: TouchEvent) {
    const { clientX, clientY } = e.changedTouches[0];
    callAllCallbackByType("cancel", clientX, clientY);
  }

  const bindTouchEvents = () => {
    eleRef.value!.addEventListener("touchstart", handleTouchStart);
    eleRef.value!.addEventListener("touchmove", handleTouchMove);
    eleRef.value!.addEventListener("touchend", handleTouchEnd);
    eleRef.value!.addEventListener("touchcancel", handleTouchCancel);
  };

  const unbindTouchEvents = () => {
    eleRef.value!.removeEventListener("touchstart", handleTouchStart);
    eleRef.value!.removeEventListener("touchmove", handleTouchMove);
    eleRef.value!.removeEventListener("touchend", handleTouchEnd);
    eleRef.value!.removeEventListener("touchcancel", handleTouchCancel);
  };

  const bindMouseEvents = () => {
    const handlePointerMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      callAllCallbackByType("move", clientX, clientY);
    };

    const handlePointerUp = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      callAllCallbackByType("end", clientX, clientY);

      eleRef.value!.removeEventListener("mousemove", handlePointerMove);
      eleRef.value!.removeEventListener("mouseup", handlePointerUp);
    };

    eleRef.value!.addEventListener("mousedown", (e) => {
      const { clientX, clientY } = e;
      callAllCallbackByType("start", clientX, clientY);

      eleRef.value!.addEventListener("mousemove", handlePointerMove);
      eleRef.value!.addEventListener("mouseup", handlePointerUp);
    });
  };

  onMounted(() => {
    bindTouchEvents();
    // bindMouseEvents();
  });

  onBeforeUnmount(() => {
    unbindTouchEvents();
  });

  return {
    onStart: callbackSetter("start"),
    onMove: callbackSetter("move"),
    onEnd: callbackSetter("end"),
    onCancel: callbackSetter("cancel"),
  };
}

export default useGesture;