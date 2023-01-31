<template>
  <div class="page">
    <div class="container">
      <AppHeader />
      <section class="documents">
        <Search class="documents__search" :documents="store.documents" :documentsCategories="store.documentsCategories" @documentsFiltered="updateDocumentsFiltered" @documentsCategoriesFiltered="updateDocumentsCategoriesFiltered"  />
        <List class="documents__main-list" :list="store.documentsWithCategories" :modification="`main`" />
        <List class="documents__list" :list="store.documentsWithoutCategories" />
      </section>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Search from './components/Search.vue';
import List from './components/lists/List.vue';
import { store } from './store/store.js'

export default {
  components: {AppHeader, Search, List},
  data() {
    return {
      store,
    }
  },
  methods: {
    updateDocumentsFiltered(data) {
      this.store.documentsFiltered = data
    },
    updateDocumentsCategoriesFiltered(data) {
      this.store.documentsCategoriesFiltered = data
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
</style>
