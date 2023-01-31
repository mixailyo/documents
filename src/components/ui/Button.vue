<template>
  <button class="btn" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss">
.btn {
  background: $color-default-white;
  border: 1px solid $color-hawkes-blue;
  border-radius: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $trans-default;

  &:hover {
    background-color: $color-hawkes-blue;
  }
}
</style>