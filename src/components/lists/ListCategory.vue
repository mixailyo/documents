<template>
  <li class="list-category" :class="[isActive ? 'list-category--active' : '']">
    <ListItem :modification="`category-header`" :name="listWithCategory.element.category.name" :statuses="listWithCategory.element.category.statuses" :warning="listWithCategory.element.category.warning" :description="listWithCategory.element.category.description" @changeActive="changeActiveCategory" />
    <Transition name="slide-fade">
      <draggable
        v-if="isActive" 
        tag="ul"
        class="list__inner-list list" 
        :list="listWithCategory.element.documents" 
        group="items" 
        @start="drag=true" 
        @end="drag=false" 
        item-key="id"
        handle=".move-btn"
        >
        <template #item="{element}">
          <ListItem :name="element.name" :statuses="element.statuses" :warning="element.warning" :description="element.description" />
        </template>
      </draggable>
    </Transition>
  </li>
</template>

<script>
import ListItem from './ListItem.vue';
import draggable from 'vuedraggable'

export default {
  components: {ListItem, draggable},
  props: {
    listWithCategory: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isActive: true,
      drag: false,
    }
  },
  methods: {
    changeActiveCategory() {
      this.isActive = !this.isActive;
    },
  },
}
</script>

<style lang="scss">
.list-category {
  &:last-child {
    .list__inner-list {
      .list-item {
        &:last-child {
          border-bottom: 1px solid $color-solitude;
        }
      }
    }
  }
}
</style>