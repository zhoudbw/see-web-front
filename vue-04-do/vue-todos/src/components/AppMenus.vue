<!--
 --
-->
<template>
    <div class="list-todos">
        <!-- 
          -- 修改当前选中的id
          -- 并修改高亮状态
         -->
        <a @click="changeCurChooseId(item.id)" class="list-todo list activeListClass" :class="{'active': item.id === todoId}"
           v-for="( item,index ) in todoList" :key="index">
            <span class="icon-lock" v-if="item.locked"></span>
            <span class="count-list" v-if="item.count > 0">{{ item.count }}</span>
            {{ item.title }}
        </a>
        <a class=" link-list-new" @click="addTodoList">
            <span class="icon-plus"></span>
            新增
        </a>
    </div>
</template>

<script>
import {addTodo} from '@/api/api';  // 引入封装好的两个接口函数
export default {
    data() {
        return {
            todoId: '', // 默认选中id,
        };
    },
    computed: {
        todoList() {
            return this.$store.getters.getTodoList;
        }
    },
    watch: {
        /**
         * 监听todoList,newList和oldList对比 [ 删除待办标题阶段 ]
         * 此时,将当前选中的todoId变化为存在列表的第一个
         */
        todoList: {
            handler(newList, oldList) {
                // 更完善的安全检查
                if (!Array.isArray(newList) || !Array.isArray(oldList)) return;
                if (newList.length === 0) return;

                // 只有当列表减少且新列表不为空时才触发
                if (newList.length < oldList.length) {
                    const firstItem = newList[0];
                    if (firstItem?.id) {
                        this.changeCurChooseId(firstItem.id);
                    }
                }
            },
        },

        /**
         * 选中的id发生变化,请求待办单项列表数据
         * 渲染AppTodo,放置在AppLayout的<router-view/>处
         */
        todoId: {
            handler(id) {
                if (!id) return;

                // 避免不必要的路由跳转（防止循环）
                if (this.$route.params.id !== id) {
                    this.$router.push({
                        name: 'todo',
                        params: { id: id }
                    }).catch(err => {
                        // 避免重复导航的错误
                        if (err.name !== 'NavigationDuplicated') {
                            console.error('路由跳转失败:', err);
                        }
                    });
                }
            },
        }
    },

    // 调用请求菜单列表数据的接口
    created() {
        console.log( "Oh, init the page named 'AppMenus'. " )

        this.$store.dispatch( 'getTodo' ).then(() => {
            this.$nextTick( () => {
                // 确保 todoList 存在且有数据
                if ( this.todoList && this.todoList.length > 0 ) {
                    this.changeCurChooseId( this.todoList[ 0 ].id );
                }
            } );
        } ).catch( error => {
            console.error('Oh, Load todo_list failed:', error );
        } );
    },

    methods: {
        // 修改当前选中的todoId
        changeCurChooseId(id) {
            this.todoId = id;
        },

        addTodoList() {
            addTodo( {} ).then( data => {
                this.$store.dispatch( 'getTodo' ).then(() => {
                    this.$nextTick( () => {
                        /**
                         * 新增待办标题时,将todoId变为新加入的项
                         */
                        if ( this.todoList && this.todoList.length > 0 ) {
                            this.changeCurChooseId( this.todoList[ this.todoList.length - 1 ].id );
                        }
                    } );
                } );
            } ).catch( error => {
                console.error( 'Oh,increase new todo failed:', error );
            } );
        }
    }
};
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>

