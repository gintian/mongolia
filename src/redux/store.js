import { createStore } from 'redux';
import reducer from './reducers';

export function makeStore() {
    return createStore(reducer, {
        userData:{},//用户数据
        top_navigation_count:0,//模块选择的下标
        top_navigation_module:"",//模块组件名
    })
}