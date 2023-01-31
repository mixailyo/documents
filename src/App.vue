<template>
  <div class="page">
    <div class="container">
      <AppHeader />
      <section class="documents">
        <Search class="documents__search" :documents="documents" :documentsCategories="documentsCategories" @documentsFiltered="updateDocumentsFiltered" @documentsCategoriesFiltered="updateDocumentsCategoriesFiltered" />
        <List class="documents__main-list" :list="documentsWithCategories" :modification="`main`" />
        <List class="documents__list" :list="documentsWithoutCategories" />
      </section>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Search from './components/Search.vue';
import List from './components/lists/List.vue';

export default {
  components: {AppHeader, Search, List},
  data() {
    return {
      documents: [
        {
          id: 1,
          name: "Паспорт",
          statuses: ["four"],
          warning: "Обязательный",
          description: "Для всех",
          categoryId: 1 
        },
        {
          id: 2,
          name: "ИНН",
          statuses: [],
          warning: "Обязательный",
          description: "Для всех",
          categoryId: 1 
        },
        {
          id: 3,
          name: "Тестовое задание кандидата",
          statuses: [],
          warning: "",
          description: "Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха",
          categoryId: null 
        },
        {
          id: 4,
          name: "Трудовой договор",
          statuses: ["five", "six"],
          warning: "",
          description: "",
          categoryId: null 
        },
        {
          id: 5,
          name: "Мед. книжка",
          statuses: [],
          warning: "",
          description: "",
          categoryId: null 
        },
      ],
      documentsCategories: [
        {
          id: 1,
          name: "Обязательные для всех",
          statuses: ["one", "two", "three"],
          warning: "",
          description: "Документы, обязательные для всех сотрудников без исключения",
        },
        {
          id: 2,
          name: "Обязательные для трудоустройства",
          statuses: [],
          warning: "",
          description: "Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж",
        },
        {
          id: 3,
          name: "Специальные",
          statuses: [],
          warning: "",
          description: "",
        },
      ],
      documentsFiltered: [],
      documentsCategoriesFiltered: [],
      documentsWithCategories: [],
      documentsWithoutCategories: [],
    }
  },
  methods: {
    updateDocumentsFiltered(data) {
      this.documentsFiltered = data
    },
    updateDocumentsCategoriesFiltered(data) {
      this.documentsCategoriesFiltered = data
    },
    updateLists() {
      let array = [];

      this.documentsCategoriesFiltered.forEach(documentsCategory => {
        let list = {};
        list.category = documentsCategory;
        list.documents = [];

        this.documentsFiltered.forEach(document => {
          if (document.categoryId === documentsCategory.id) {
            list.documents.push(document)
          }
        })

        array.push(list)
      })

      this.documentsWithCategories = array;

      this.documentsWithoutCategories = this.documentsFiltered.filter(document => !document.categoryId)
    }
  },
  watch: {
    documentsFiltered: {
      handler() {
        this.updateLists()
      },
      deep: true
    },
    documentsCategoriesFiltered: {
      handler() {
        this.updateLists()
      },
      deep: true
    },
    documentsWithCategories: {
      handler() {
        this.documentsWithCategories.forEach(item => {
          item.documents.forEach(document => {
            if (!document.categoryId || document.categoryId !== item.category.id) {
              this.documents.forEach(startDocument => {
                if (startDocument.id === document.id) {
                  startDocument.categoryId = item.category.id;
                }
              })
            }
          })
        })
      },
      deep: true
    },
    documentsWithoutCategories: {
      handler() {
        this.documentsWithoutCategories.forEach(item => {
          if (item.categoryId) {
            this.documents.forEach(document => {
              if (document.id === item.id) {
                document.categoryId = null
              }
            })
          }
        })
      },
      deep: true
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
