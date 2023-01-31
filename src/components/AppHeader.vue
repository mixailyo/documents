<template>
  <header class="header">
    <h1 class="header__title">Документы</h1>
    <ul class="header__controls">
      <li class="header__control">
        <Button>
          <IconFavorite />
        </Button>
      </li>
      <li class="header__control">
        <Button>
          <IconPlus />
          <span class="header__control-text">Новый тип</span>
        </Button>
      </li>
      <li class="header__control">
        <Button>
          <IconPlus />
          <span class="header__control-text">Новый документ</span>
        </Button>
      </li>
    </ul>
  </header>
</template>

<script>
import IconFavorite from './icons/IconFavorite.vue';
import IconPlus from './icons/IconPlus.vue';
import Button from './ui/Button.vue';

export default {
  components: {IconFavorite, IconPlus, Button},
}
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
}
.header__title {
  font-weight: 500;
  font-size: 22px;
  line-height: 108%;
}
.header__controls {
  @include reset-list;
  display: flex;
  align-items: center;
  margin: 0 -5px;
}
.header__control {
  margin: 0 5px;
}
.header__control-text {
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 108%;
}
</style>