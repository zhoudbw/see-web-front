<!--
-- 待办单项列表, 及操作区域
-->
<template>
    <div class="page lists-show" v-show="!todo.isDelete">
        <!-- 头部模块 -->
        <nav>
            <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标 -->
            <div class="form list-edit-form" v-show="isUpdate">
                <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
                <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
                <div class="nav-group right">
                    <a class="nav-item" @click="isUpdate = false">
                        <span class="icon-close"></span>
                    </a>
                </div>
            </div>
            <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
                <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 -->
                <a class="nav-item">
                    <span class="icon-list-unordered"></span>
                </a>
            </div>
            <!-- 显示标题和数字模块 -->
            <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
                <span class="title-wrapper">{{ todo.title }}</span>
                <span class="count-list">{{ todo.count || 0 }}</span>
            </h1>
            <!-- 右边显示删除图标和锁定图标的模块 -->
            <div class="nav-group right" v-show="!isUpdate">
                <div class="options-web">
                    <a class=" nav-item" @click="onLock">
                        <!-- icon-lock锁定的图标 icon-unlock：非锁定的图标 -->
                        <span class="icon-lock" v-if="todo.locked"></span>
                        <span class="icon-unlock" v-else></span>
                    </a>
                    <a class="nav-item">
                        <span class="icon-trash" @click="onDelete"></span>
                    </a>
                </div>
            </div>
            <!-- 用户新增代办事项的input模块 -->
            <div class=" form todo-new input-symbol">
                <!-- 绑定disabled值，当_todo.locked为绑定的时候，禁止input输入,双向绑定text,和监听input的回车事件@keyup.enter -->
                <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked"/>
                <span class="icon-add"></span>
            </div>
        </nav>
        <!-- 列表主体模块 -->
        <div class="content-scrollable list-items">
            <div v-for="(item,index) in items" :key="index">
                <AppItem :item="item" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></AppItem>
            </div>
        </div>
    </div>
</template>

<script>

import AppItem from './AppItem.vue';
import {addRecord, editTodo, getTodo} from '@/api/api';

export default {
    data() {
        return {
            todo: {
                id: "vue-todos",
                title: "vue-todos",
                count: 0,
                locked: true,
                isDelete: false
            },

            items: [],      // 代办单项列表
            text: '',       // 用户输入单项项绑定的输入
            isUpdate: false // 新增修改状态
        };
    },
    components: {
        AppItem
    },
    watch: {
        '$route.params.id'() {
            // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
            this.init();
        }
    },
    created() {
        console.log( "Oh, init the page named 'AppTodo'. " )
        this.init();
    },
    methods: {
        /**
         * 初始化数据InitData
         */
        init() {
            const ID = this.$route.params.id;
            if (!ID) {
                console.error('缺少ID参数');
                return;
            }

            getTodo({ id: ID }).then(res => {
                // 安全检查
                if (!res.data || !res.data.todo) {
                    console.error('API返回数据格式错误:', res);
                    return;
                }

                const todoData = res.data.todo;

                // 安全解构，提供默认值
                const {
                    id = '',
                    title = '未命名',
                    count = 0,
                    isDelete = false,
                    locked = false,
                    record = []  // 重要：record 默认空数组
                } = todoData;

                this.items = record;
                this.todo = {
                    id: id,
                    title: title,
                    count: count,
                    locked: locked,
                    isDelete: isDelete
                };
            }).catch(error => {
                console.error('获取todo数据失败:', error);
            });
        },
        // < -- -- -->
        onAdd() {
            const ID = this.$route.params.id;
            addRecord({id: ID, text: this.text}).then(res => {
                this.text = '';
                this.init();
                this.$store.dispatch('getTodo');
            });
        },
        updateTodo() {
            let _this = this;
            editTodo({
                todo: this.todo
            }).then(data => {
                _this.$store.dispatch('getTodo');
            });
        },
        updateTitle() {
            this.updateTodo();
            this.isUpdate = false;
        },
        onDelete() {
            this.todo.isDelete = true;
            this.updateTodo();
        },
        onLock() {
            this.todo.locked = !this.todo.locked;
            this.updateTodo();
        }
    }
};
</script>

<style lang="less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
