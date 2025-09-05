/**
 *
 */
import { createStore } from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

// 创建初始应用全局状态变量
const state = {
    todoList: [],
    menuOpen: true
}

/**
 * mutations 是唯一修改 state 的方式
 * 必须是同步函数
 */
const mutations = {
    // 改变todoList的值
    modifyTodoList(state, data) {
        state.todoList = data;
    },
    // 改变menuOpen的值
    modifyMenuOpen(state) {
        state.menuOpen = !state.menuOpen;
    }
};

// 创建 store 实例并且导出
export default createStore({
    actions,
    getters,
    mutations,
    state
});
