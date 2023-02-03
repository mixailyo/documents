<template>
  <FormKit type="form" @submit="submit" submit-label="Сохранить">
    <h2 class="form-title">{{editedItem.type === "document" ? "Документ" : "Тип"}}</h2>
    <FormKit
      v-if="editedItem.type === 'document'"
      type="select"
      label="Тип"
      name="categoryId"
      :options="categories"
      :value="editedItem.categoryId"
    />
    <FormKit
      type="text"
      name="name"
      id="name"
      validation="required"
      :validation-messages="{required: 'Напишите название'}"
      label="Название"
      :value="editedItem.name"
    />
    <FormKit
      type="checkbox"
      name="statuses"
      label="Пометки"
      :options="statuses"
      :value="editedItem.statuses"
    />
    <FormKit
      type="checkbox"
      label="Обязательный"
      name="required"
      :value="editedItem.required"
    />
    <FormKit
      type="text"
      name="description"
      id="description"
      label="Описание"
      :value="editedItem.description"
    />
  </FormKit>
</template>

<script>
import { store } from './../store/store.js'

export default {
  props: {
    editedItem: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.updateCategories()
    this.updateStatuses()
  },
  data() {
    return {
      store,
      categories: [],
      statuses: [],
    }
  },
  methods: {
    submit(data) {
      data.id = this.editedItem.id || Number(new Date());
      data.type = this.editedItem.type;
      this.store.editItem(data);

      this.$emit('submited');
    },
    updateCategories() {
      let result = [];

      let withoutCategory = {
        label: "Без типа",
        value: null
      }

      result.push(withoutCategory)

      this.store.documentsCategories.forEach(category => {
        let object = {};

        object.label = category.name
        object.value = category.id

        result.push(object)
      })

      this.categories = result
    },
    updateStatuses() {
      this.statuses = Object.values(this.store.getStatuses())
    }
  }
}
</script>