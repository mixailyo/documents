<template>
  <div class="page">
    <div class="container">
      <AppHeader @addNewDocument="addNewDocument" @addNewCategory="addNewCategory" />
      <section class="documents">
        <Search class="documents__search" :documents="store.documents" :documentsCategories="store.documentsCategories" @documentsFiltered="updateDocumentsFiltered" @documentsCategoriesFiltered="updateDocumentsCategoriesFiltered"  />
        <List class="documents__main-list" :list="store.documentsWithCategories" :modification="`main`" />
        <List class="documents__list" :list="store.documentsWithoutCategories" />
        <Teleport to="body">
          <modal :show="store.showEditorModal" @close="store.showEditorModal = false">
            <Editor :editedItem="store.editedItem" @submited="store.showEditorModal = false" />
          </modal>
        </Teleport>
      </section>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Search from './components/Search.vue';
import Modal from './components/ui/Modal.vue'
import List from './components/lists/List.vue';
import Editor from './components/Editor.vue';
import { store } from './store/store.js'

export default {
  components: {AppHeader, Search, Modal, List, Editor},
  data() {
    return {
      store,
      typeEditor: 'document'
    }
  },
  methods: {
    updateDocumentsFiltered(data) {
      this.store.documentsFiltered = data
    },
    updateDocumentsCategoriesFiltered(data) {
      this.store.documentsCategoriesFiltered = data
    },
    addNewDocument() {
      this.store.showEditorModal = true
      this.store.editedItem = {type: 'document'}
    },
    addNewCategory() {
      this.store.showEditorModal = true
      this.store.editedItem = {type: 'category'}
    },
  }
}
</script>

<style lang="scss">
.documents {
  max-width: 1190px;
}
.documents__search {
  margin-bottom: 20px;
}
.documents__list {
  margin-top: 16px;
}
.form-title {
  margin-bottom: 20px;
}
</style>
