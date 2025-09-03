<!--
待办单项

主要修复：
    ✅ 禁止直接修改 props - 使用本地副本
    ✅ 规范 props 定义 - 添加类型和验证
    ✅ 分离业务逻辑 - 拆解复杂表达式
    ✅ 添加错误处理 - 提高健壮性
    ✅ 添加组件名 - 便于调试
-->

<template>
    <transition name="slide-fade">
        <div class="list-item  editingClass editing " :class="{checked: localItem.checked}" v-show="!item.isDelete">
            <label class="checkbox">
                <input
                    type="checkbox"
                    :checked="localItem.checked"
                    @change="handleCheckChange"
                    :disabled="locked"
                >
                <span class="checkbox-custom"></span>
            </label>
            <input
                type="text"
                :value="localItem.text"
                @input="updateText($event.target.value)"
                placeholder='写点什么。。。'
                :disabled="localItem.checked || locked"
                @keyup.enter="onChange"
            >
            <a
                class="delete-item"
                v-if="localItem.checked && !locked"
                @click="handleDelete"
            >
                <span class="icon-trash"></span>
            </a>
        </div>
    </transition>
</template>

<script>
import {editRecord} from '@/api/api';

export default {
    name: 'TodoItem',

    props: {
        item: {
            type: Object,
            required: true,
            default: () => ({
                checked: false,
                text: '你好,世界',
                isDelete: false
            })
        },
        index: {
            type: Number,
            default: -1
        },
        id: {
            type: [String, Number],
            required: true
        },
        init: {
            type: Function,
            required: true
        },
        locked: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            localItem: {...this.item},  // 创建本地副本
        };
    },

    watch: {
        // 监听props变化，更新本地数据
        item: {
            handler(newVal) {
                this.localItem = {...newVal};
            },
            deep: true
        }
    },

    methods: {
        handleCheckChange(event) {
            this.localItem.checked = event.target.checked;
            this.onChange();
        },

        updateText(value) {
            this.localItem.text = value;
        },

        handleDelete() {
            this.localItem.isDelete = true;
            this.onChange();
        },

        onChange() {
            editRecord({
                id: this.id,
                record: {...this.localItem},  // 传递副本，不是原始props
                index: this.index
            }).then(data => {
                this.init();
                // this.$store.dispatch('getTodo');
            }).catch(error => {
                console.error('更新失败:', error);
                // 可以恢复状态或显示错误提示
            });
        }
    }
};
</script>

<style lang="less">
@import '../common/style/list-items.less';

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
}
</style>