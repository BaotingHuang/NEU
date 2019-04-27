<template>
  <div class="general">
    <NewsArticle
      v-for="article in entertainmentArticles"
      :key="article.name"
      v-bind="article"
    />
    <div
      v-if="!articlesAvailable"
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
import { mapState } from 'vuex'
import NewsArticle from './newsArticle'

export default {
  components: {
    NewsArticle,
  },
  data: () => ({
    showAll: false,
  }),
  computed: {
    ...mapState('appData', ['selectedCountry', 'selectedCategory']),
    ...mapState('newsQueries', ['articles']),
    entertainmentArticles () {
      if (this.showAll) {
        return this.articles[this.selectedCountry][this.selectedCategory]
      }

      return this.articles[this.selectedCountry][this.selectedCategory].slice(0, 5)
    },
    articlesAvailable () {
      if (this.articles[this.selectedCountry][this.selectedCategory][0]) {
        return true
      }

      return false
    },
  },
}
</script>
