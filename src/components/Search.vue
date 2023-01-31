<template>
  <div class="search">
    <IconSearch />
    <input v-model="searchValue" type="text" id="search" class="search__input" placeholder="Поиск" />
    <label class="search__label" for="search"></label>
    <button class="search__clear">
      <Transition>
        <IconX v-if="searchValue.length" @click="clearSearch" />
      </Transition>
    </button>
  </div>
</template>

<script>
  import IconSearch from './icons/IconSearch.vue';
  import IconX from './icons/IconX.vue';
  import { store } from './../store/store.js'

  export default {
    components: {IconSearch, IconX},
    props: {
      documents: {
        type: Array,
        required: false,
      },
      documentsCategories: {
        type: Array,
        required: false,
      },
    },
    data() {
      return {
        store,
        searchValue: '',
      }
    },
    methods: {
      clearSearch() {
        this.searchValue = '';
      }
    },
    watch: {
      searchValue() {
        let documentsFiltered = this.documents.filter(document => {
          if (document.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1) {
            return true
          }

          let flag = false
          
          this.documentsCategories.forEach(category => {
            if (document.categoryId === category.id && category.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1) {
              flag = true
            }
          })

          return flag
        })

        let documentsCategoriesFiltered = this.documentsCategories.filter(category => {
          if (category.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1) {
            return true
          }

          let flag = false
      
          documentsFiltered.forEach(document => {
            if (category.id === document.categoryId) {
              flag = true
            }
          })

          return flag
        })

        this.$emit('documentsFiltered', documentsFiltered)
        this.$emit('documentsCategoriesFiltered', documentsCategoriesFiltered)
      },
    }
  }
</script>

<style lang="scss">
  .search {
    display: flex;
    align-items: center;
    width: 560px;
    padding: 12px 0;
    position: relative;
  }
  .search__input {
    border: unset;
    width: 100%;
    margin: 0 12px;
    font-size: 15px;
    line-height: 108%;
    outline: none;

    &:hover + .search__label,
    &:focus-visible + .search__label {
      background-color: $color-navy-blue;
    } 

    &::placeholder {
      font-style: italic;
      color: $color-rock-blue;
    }
  }
  .search__label {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $color-periwinkle;
    transition: $trans-default;
  }
</style>