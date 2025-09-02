<template>
  <div class="list-item">
    <label class="checkbox">
      <input
          type="checkbox"
          :checked="localItem.checked"
          @change="updateChecked"
      >
      <span class="checkbox-custom"></span>
    </label>
    <input
        type="text"
        :value="localItem.text"
        @input="updateText"
        placeholder='写点什么。。。'
    >
    <a class="delete-item" @click="$emit('delete-item')">
      <span class="icon-trash"></span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['item'],

  data() {
    return {
      localItem: {...this.item} // 创建本地副本
    }
  },

  methods: {
    updateChecked(event) {
      this.localItem.checked = event.target.checked;
      this.$emit('update-item', this.localItem);
    },

    updateText(event) {
      this.localItem.text = event.target.value;
      this.$emit('update-item', this.localItem);
    }
  }
};
</script>

<style lang="less">
@import '../common/style/list-items.less';
</style>