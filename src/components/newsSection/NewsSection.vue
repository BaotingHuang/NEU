<template>
  <div class="news-section">
    <div class="nav">
      <div class="nav__country">
        {{ selectedCountryUppercase }}
      </div>
      <ul
        ref="categoryList"
        class="nav__list"
        :class="{ 'list-visible': hamburgerActive }"
      >
        <li
          class="nav__list__item"
          :class="generalClasses"
          @click="selectCategory('general') "
        >
          General
        </li>
        <li
          class="nav__list__item"
          :class="businessClasses"
          @click="selectCategory('business') "
        >
          Business
        </li>
        <li
          class="nav__list__item"
          :class="technologyClasses"
          @click="selectCategory('technology') "
        >
          Technology
        </li>
        <li
          class="nav__list__item"
          :class="entertainmentClasses"
          @click="selectCategory('entertainment') "
        >
          Entertainment
        </li>
        <li
          class="nav__list__item"
          :class="customClasses"
          @click="selectCategory('custom') "
        >
          Custom search
        </li>
      </ul>
      <div
        ref="hamburger"
        class="hamburger"
        @click="toggleHamburgerList"
      >
        <div
          class="hamburger__icon"
          :class="{ 'hamburger-selected': hamburgerActive }"
        />
      </div>
    </div>
    <div
      v-if="defaultVisible"
      class="default"
    >
      <transition
        name="default-info-fade"
        mode="out-in"
      >
        <div
          v-if="!selectedCategory && selectedCountry === 'State'"
          :key="1"
          class="default__info"
        >
          <p>Select a country</p>
          <p>and category</p>
        </div>
        <div
          v-if="!selectedCategory && selectedCountry !== 'State'"
          :key="2"
          class="default__info"
        >
          <p>Select a news category </p>
        </div>
        <div
          v-if="selectedCategory && selectedCountry === 'State'"
          :key="3"
          class="default__info"
        >
          <p>Select a country</p>
        </div>
      </transition>
    </div>
    <GeneralArticles
      v-if="selectedCategory === 'general' && selectedCountry !== 'State'"
      :key="selectedCountry"
    />
    <BusinessArticles
      v-if="selectedCategory === 'business' && selectedCountry !== 'State'"
      :key="selectedCountry"
    />
    <TechnologyArticles
      v-if="selectedCategory === 'technology' && selectedCountry !== 'State'"
      :key="selectedCountry"
    />
    <EntertainmentArticles
      v-if="selectedCategory === 'entertainment' && selectedCountry !== 'State'"
      :key="selectedCountry"
    />
    <CustomSearch
      v-if="selectedCategory === 'custom' && selectedCountry === 'State'"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import GeneralArticles from './categories/GeneralArticles.vue'
import BusinessArticles from './categories/BusinessArticles.vue'
import TechnologyArticles from './categories/TechnologyArticles.vue'
import EntertainmentArticles from './categories/EntertainmentArticles.vue'
import CustomSearch from './categories/CustomSearch.vue'

export default {
  components: {
    GeneralArticles,
    BusinessArticles,
    TechnologyArticles,
    EntertainmentArticles,
    CustomSearch,
  },
  data: () => ({
    hamburgerActive: false,
  }),
  computed: {
    ...mapState('appData', ['selectedCountry', 'selectedCategory']),
    selectedCountryUppercase () {
      if (this.selectedCountry === 'uk') {
        return 'UK'
      }

      return this.selectedCountry[0].toUpperCase() + this.selectedCountry.slice(1)
    },
    generalClasses () {
      return {
        activeCategory: (this.selectedCategory === 'general'),
        hasActiveHover: (this.selectedCategory !== 'general'),
      }
    },
    businessClasses () {
      return {
        activeCategory: (this.selectedCategory === 'business'),
        hasActiveHover: (this.selectedCategory !== 'business'),
      }
    },
    technologyClasses () {
      return {
        activeCategory: (this.selectedCategory === 'technology'),
        hasActiveHover: (this.selectedCategory !== 'technology'),
      }
    },
    entertainmentClasses () {
      return {
        activeCategory: (this.selectedCategory === 'entertainment'),
        hasActiveHover: (this.selectedCategory !== 'entertainment'),
      }
    },
    customClasses () {
      return {
        activeCategory: (this.selectedCategory === 'custom'),
        hasActiveHover: (this.selectedCategory !== 'custom'),
      }
    },
    defaultVisible () {
      const country = this.selectedCountry
      const category = this.selectedCategory

      return (!category && country === 'State') // no category, no country
      || (!category && country !== 'State') // no category, any country
      || (category !== 'custom' && country === 'State') // any category but custom, no country
    },
  },
  mounted () {
    this.$store.watch((state) => state.appData.selectedCategory, () => {
      this.searchForArticles()
    })
    this.$store.watch((state) => state.appData.selectedCountry, () => {
      this.searchForArticles()
    })
    window.addEventListener('click', this.closeHamburgerList)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.closeHamburgerList)
  },
  methods: {
    ...mapMutations('appData', ['changeSelectedCategory']),
    ...mapActions('newsQueries', ['searchForArticles']),
    selectCategory (category) {
      if (this.selectedCategory === category) {
        this.changeSelectedCategory('')
      } else {
        this.changeSelectedCategory(category)
      }

      if (this.hamburgerActive) {
        this.hamburgerActive = false
      }
    },
    toggleHamburgerList () {
      this.hamburgerActive = !this.hamburgerActive
    },
    closeHamburgerList (event) {
      const { hamburger } = this.$refs
      const clickedOnHamburger = event.target === hamburger || hamburger.contains(event.target)
      const hamburgerMenuVisible = this.hamburgerActive
      if (!clickedOnHamburger && hamburgerMenuVisible) {
        this.hamburgerActive = false
      }
    },
  },
}
</script>

<style lang="scss">
@import './NewsSection.styles.scss';
</style>
