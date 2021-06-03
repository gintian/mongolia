import { createStore } from "redux";
import reducer from "./reducers";

export function makeStore() {
  return createStore(reducer, {
    top_navigation_count: 0, //模块选择的下标
    top_navigation_module: "resourceMapping", //模块组件名
  });
}
