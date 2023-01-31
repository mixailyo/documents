<template>
  <draggable 
    v-if="modification" 
    tag="ul"
    class="list" 
    :class="[modification ? `list--${modification}` : '']"
    :list="list" 
    group="categories" 
    @start="drag=true" 
    @end="drag=false" 
    item-key="id"
    handle=".move-btn"
    >
    <template #item="{element}">
      <ListCategory :listWithCategory="{element}" />
    </template>
  </draggable>
  <draggable
    v-else
    tag="ul" 
    class="list"
    :list="list" 
    group="items" 
    @start="drag=true" 
    @end="drag=false" 
    item-key="id"
    handle=".move-btn"
    >
    <template #item="{element}">
      <ListItem :item="element" />
    </template>
  </draggable>
</template>

<script>
import ListCategory from './ListCategory.vue';
import ListItem from './ListItem.vue';
import draggable from 'vuedraggable'

export default {
  components: {ListItem, ListCategory, draggable},
  props: {
    list: {
      type: Array,
      required: false,
    },
    modification: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      drag: false,
    }
  },
}
</script>

<style lang="scss">
.list {
  @include reset-list;
}
.list__inner-list {
  padding-left: 16px;

  .list-item {
    &:first-child {
      border-top: unset;
    }

    &:last-child {
      border-bottom: unset;
    }
  }
}
</style>