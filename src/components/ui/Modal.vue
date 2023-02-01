<template>
  <Transition name="modal">
    <div v-if="show" class="modal__mask" @click.self="$emit('close')" >
      <div class="modal__container">
        <button @click="$emit('close')" class="modal__close" type="button">
          <IconX />
        </button>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
import IconX from '../icons/IconX.vue';

export default {
  components: { IconX },
  props: {
    show: Boolean
  },
}
</script>

<style>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal__container {
  width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>