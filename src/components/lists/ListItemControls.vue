<template>
  <ul class="list-item__controls">
    <li class="list-item__control">
      <button @click="$emit('editItem')" class="list-item__control-btn" type="button">
        <IconEdit />
      </button>
    </li>
    <li class="list-item__control">
      <button @click="$emit('deleteItem')" class="list-item__control-btn" type="button">
        <IconDelete />
      </button>
    </li>
    <li class="list-item__control">
      <button class="list-item__control-btn move-btn" type="button">
        <IconMove />
      </button>
    </li>
  </ul>
</template>

<script>
import IconEdit from '../icons/IconEdit.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconMove from '../icons/IconMove.vue';

export default {
  components: {IconEdit, IconDelete, IconMove},
}
</script>

<style lang="scss">
  .list-item__controls {
    @include reset-list;
    display: flex;
    align-items: center;
    margin: 0 -10px 0 auto;
  }
  .list-item__control {
    margin: 0 10px;
  }
  .list-item__control-btn {
    &.move-btn {
      cursor: move;
    }
  }
</style>