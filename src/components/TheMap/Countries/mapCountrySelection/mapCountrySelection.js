import { mapMutations, mapState } from 'vuex'

export const mapCountrySelection = {
  computed: {
    ...mapState('appData', ['selectedCountry']),
    thisCountrySelected () {
      return this.selectedCountry === this.countryName
    },
  },
  methods: {
    ...mapMutations('appData', ['changeSelectedCountry']),
    selectCountry () {
      this.changeSelectedCountry(this.countryName)
    },
  },
}
