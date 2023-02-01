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
      :options="[
        {value: 'one', label: 'Пометка #1'},
        {value: 'two', label: 'Пометка #2'},
        {value: 'three', label: 'Пометка #3'},
        {value: 'four', label: 'Пометка #4'},
        {value: 'five', label: 'Пометка #5'},
        {value: 'six', label: 'Пометка #6'},
        ]"
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
  },
  data() {
    return {
      store,
      categories: [],
    }
  },
  methods: {
    submit(data) {
      this.$emit('submited')

      switch (this.editedItem.type) {
        case "document": 
          let currentDocument = {
            id: this.editedItem.id || Number(new Date()),
            type: this.editedItem.type,
            name: data.name,
            statuses: data.statuses,
            required: data.required,
            description: data.description || "",
            categoryId: data.categoryId || null
          }

          let editedDocumentIndex = this.store.documents.findIndex(document => document.id === currentDocument.id)

          if (editedDocumentIndex > -1) {
            this.store.documents[editedDocumentIndex] = currentDocument
          } else {
            this.store.documents.push(currentDocument)
          }

          break

        case "category":
          let currentCategory = {
            id: this.editedItem.id || Number(new Date()),
            type: this.editedItem.type,
            name: data.name,
            statuses: data.statuses,
            required: data.required,
            description: data.description || "",
          }

          let editedCategoryIndex = this.store.documentsCategories.findIndex(category => category.id === currentCategory.id)

          if (editedCategoryIndex > -1) {
            this.store.documentsCategories[editedCategoryIndex] = currentCategory
          } else {
            this.store.documentsCategories.push(currentCategory)
          }
      }
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
    }
  }
}
</script>