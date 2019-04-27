<template>
  <div class="container">
    <TheHeader />
    <TheMap />
    <NewsSection />
    <div class="footer">
      © 2019, Andrzej Walczak
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import TheMap from './components/TheMap'
import NewsSection from './components/newsSection'

export default {
  components: {
    TheHeader,
    TheMap,
    NewsSection,
  },
}
</script>

<style lang="scss">
@import './styles/layout.scss';
@import './styles/main.scss';
</style>
