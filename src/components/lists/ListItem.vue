<template>
  <div v-if="modification" class="list-item" :class="[modification ? `list-item--${modification}` : '']">
    <Button @click="$emit('changeActive')" class="list-item__toggle">
      <IconArrow />
    </Button>
    <p class="list-item__name">{{ name }}</p>
    <ul v-if="statuses" class="list-item__statuses">
      <li v-for="status in statuses" class="list-item__status" :class="[status ? `list-item__status--${status}` : '']" :key="status"></li>
    </ul>
    <p v-if="warning" class="list-item__warning">{{ warning }}</p>
    <p v-if="description" class="list-item__description">{{ description }}</p>
    <ListItemControls />
  </div>
  <li v-else class="list-item">
    <p class="list-item__name">{{ name }}</p>
    <ul v-if="statuses" class="list-item__statuses">
      <li v-for="status in statuses" class="list-item__status" :class="[status ? `list-item__status--${status}` : '']" :key="status"></li>
    </ul>
    <p v-if="warning" class="list-item__warning">{{ warning }}</p>
    <p v-if="description" class="list-item__description">{{ description }}</p>
    <ListItemControls />
  </li>
</template>

<script>
import ListItemControls from './ListItemControls.vue';
import IconArrow from '../icons/IconArrow.vue';
import Button from '../ui/Button.vue';

export default {
  components: {ListItemControls, IconArrow, Button}, 
  props: {
    modification: {
    type: String,
    required: false,
    },
    name: {
      type: String,
      required: true,
      default: 'Элемент списка'
    },
    statuses: {
      type: Array,
      required: false
    },
    warning: {
      type: String,
      required: false,
    }, 
    description: {
      type: String,
      required: false,
    },
  }
}
</script>

<style lang="scss">
  .list-item {
    background: $color-default-white;
    border: 1px solid $color-solitude;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    line-height: 108%;

    &:not(:last-child) {
      border-bottom: unset;
    }

    &--category-header {
      &:not(:last-child) {
        border-bottom: 1px solid $color-solitude;
      }
    
      .list-item__name {
        font-weight: 500;
        font-size: 15px;
      }
    }
  }
  .list-item__toggle {
    padding: 0;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;

    .list-category--active & {
      transform: rotate(180deg);
    }
  }
  .list-item__name {
    font-size: 13px;
  }
  .list-item__statuses {
    @include reset-list;
    display: flex;
    align-items: center;
    margin: 0 -3px 0 13px;
  }
  .list-item__status {
    width: 8px;
    height: 8px;
    margin: 0 3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &--one {
      background-color: $color-deep-pink;
    }

    &--two {
      background-color: $color-selective-yellow;
    }

    &--three {
      background-color: $color-carrot-orange;
    }

    &--four {
      background-color: $color-deep-sky-blue;
    }

    &--five{
      background-color: $color-navy-blue;
    }

    &--six {
      background-color: $color-rock-blue;
    }
  }
  .list-item__warning {
    font-size: 11px;
    color: $color-deep-pink;
    margin-left: 16px;
  }
  .list-item__description {
    font-size: 11px;
    color: $color-rock-blue;
    margin-left: 16px;
  }
</style>