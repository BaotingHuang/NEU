export default {
  state: {
    selectedCountry: 'State',
    selectedCategory: '',
  },
  namespaced: true,
  getters: {
  },
  mutations: {
    changeSelectedCountry: (state, newCountrySelection) => {
      if (state.selectedCountry !== newCountrySelection) {
        state.selectedCountry = newCountrySelection
      } else {
        state.selectedCountry = 'State'
      }

      // reset selected custom search category on country selection
      if (state.selectedCategory === 'custom') {
        state.selectedCategory = ''
      }
    },
    changeSelectedCategory: (state, newCategorySelection) => {
      if (state.selectedCategory !== newCategorySelection) {
        state.selectedCategory = newCategorySelection
      } else {
        state.selectedCategory = ''
      }

      // reset selected country on custom search category selection
      if (state.selectedCategory === 'custom') {
        state.selectedCountry = 'State'
      }
    },
  },
}
