<template>
  <div class="header">
    <div class="header__container">
      <div class="logo">
        NEU
      </div>
      <div class="divider" />
      <div class="name">
        the EU news aggregator
      </div>
      <div
        class="link"
        @click="goToPortfolio"
      >
        Back to portfolio
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToPortfolio () {
      window.location.href = 'https://andrzej-walczak.pl/'
    },
  },
}
</script>


<style lang="scss">
@import './TheHeader.styles.scss';
</style>
