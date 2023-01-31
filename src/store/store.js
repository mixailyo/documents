import { reactive, watch } from 'vue'

export const store = reactive({
  documents: [
    {
      id: 1,
      type: "document",
      name: "Паспорт",
      statuses: ["four"],
      warning: "Обязательный",
      description: "Для всех",
      categoryId: 1 
    },
    {
      id: 2,
      type: "document",
      name: "ИНН",
      statuses: [],
      warning: "Обязательный",
      description: "Для всех",
      categoryId: 1 
    },
    {
      id: 3,
      type: "document",
      name: "Тестовое задание кандидата",
      statuses: [],
      warning: "",
      description: "Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха",
      categoryId: null 
    },
    {
      id: 4,
      type: "document",
      name: "Трудовой договор",
      statuses: ["five", "six"],
      warning: "",
      description: "",
      categoryId: null 
    },
    {
      id: 5,
      type: "document",
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
      type: "category",
      name: "Обязательные для всех",
      statuses: ["one", "two", "three"],
      warning: "",
      description: "Документы, обязательные для всех сотрудников без исключения",
    },
    {
      id: 2,
      type: "category",
      name: "Обязательные для трудоустройства",
      statuses: [],
      warning: "",
      description: "Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж",
    },
    {
      id: 3,
      type: "category",
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
  },
  updateCategoryId() {
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
  deleteCategoryId() {
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
  deleteItem(type, id) {
    switch(type) {
      case "document":  
        this.documents = this.documents.filter(document => document.id !== id)
        break
      case "category":
        this.documentsCategories = this.documentsCategories.filter(category => category.id !== id)
        this.documents.forEach(document => {if (document.categoryId === id) document.categoryId = null})  
        break
    }
  }
})

watch([() => store.documents, () => store.documentsCategories, () => store.documentsFiltered, () => store.documentsCategoriesFiltered], () => {store.updateLists()}, {deep: true})
watch([() => store.documentsWithCategories], () => {store.updateCategoryId()}, {deep: true})
watch([() => store.documentsWithoutCategories], () => {store.deleteCategoryId()}, {deep: true})

store.documentsFiltered = store.documents
store.documentsCategoriesFiltered = store.documentsCategories