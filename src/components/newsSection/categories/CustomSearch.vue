<template>
  <div class="custom">
    <div
      class="search"
      :class="{ 'search--big': !sentFirstQuery && !articlesAvailable }"
    >
      <input
        ref="customSearchField"
        v-model="customSearchInput"
        class="search__input"
        type="text"
        placeholder="What are you looking for?"
        @keydown="listenForEnter"
      >
      <svg
        version="1.1"
        class="magnifying-glass"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 40.373 40.373"
        xml:space="preserve"
        @click="searchForQuery"
      >
        <g>
          <path
            style="fill:#163198;"
            d="M36.13,34.803l-12.02-12.02c2.09-2.2,3.36-5.17,3.36-8.44c0-6.8-5.53-12.33-12.34-12.33
            c-6.8,0-12.33,5.53-12.33,12.33s5.53,12.33,12.33,12.33c2.46,0,4.75-0.72,6.67-1.96l12.21,
            12.21c0.29,0.29,0.68,0.44,1.06,0.44
            c0.39,0,0.77-0.15,1.06-0.44C36.72,36.343,36.72,35.393,36.13,34.803z M5.8,14.343c0-5.149,
            4.19-9.33,9.33-9.33c5.15,0,9.34,4.181,9.34,9.33c0,2.9-1.33,5.49-3.4,7.2c-1.62,1.33-3.69,2.13-5.94,
            2.13C9.99,23.673,5.8,19.493,5.8,14.343z"
          />
        </g>
      </svg>
    </div>
    <NewsArticle
      v-for="article in customArticles"
      :key="article.name"
      v-bind="article"
    />
    <div
      v-if="!articlesAvailable && sentFirstQuery"
      class="loader"
    >
      <div class="loader-dot" />
      <div class="loader-dot" />
      <div class="loader-dot" />
    </div>
    <button
      v-if="!showAll && articlesAvailable"
      class="show-more"
      @click="showAll = true"
    >
      Show more
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NewsArticle from './newsArticle'

export default {
  components: {
    NewsArticle,
  },
  data: () => ({
    showAll: false,
    customSearchInput: '',
    sentFirstQuery: false,
  }),
  computed: {
    ...mapState('appData', ['selectedCategory']),
    ...mapState('newsQueries', ['articles']),
    customArticles () {
      if (this.showAll) {
        return this.articles.customSearch
      }

      return this.articles.customSearch.slice(0, 5)
    },
    articlesAvailable () {
      if (this.articles.customSearch.length > 0) {
        return true
      }

      return false
    },
  },
  methods: {
    ...mapActions('newsQueries', ['queryBingNewsCustomSearch']),
    listenForEnter (e) {
      const enterKey = 13
      if (e.keyCode === enterKey) {
        this.queryBingNewsCustomSearch(this.customSearchInput)
        this.$refs.customSearchField.blur()
        this.sentFirstQuery = true
      }
    },
    searchForQuery () {
      this.queryBingNewsCustomSearch(this.customSearchInput)
      this.$refs.customSearchField.blur()
      this.sentFirstQuery = true
    },
  },
}
</script>

<style lang="scss">
@import './CustomSearch.styles.scss';
</style>
