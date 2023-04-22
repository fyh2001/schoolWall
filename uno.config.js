/*
 * @Author: 黄叶
 * @Date: 2023-04-18 22:25:39
 * @LastEditTime: 2023-04-19 01:27:35
 * @FilePath: /schoolWall/uno.config.js
 * @Description:
 */
import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  presets: [presetAttributify(), presetUno()],
});
