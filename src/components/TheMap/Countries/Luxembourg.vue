<template>
  <g>
    <path
      class="luxembourg"
      d="M702.849,1115.303c-2.267-6.35-1.169-15.54,1.944-19.319c1.14-1.387,1.768-3.521,4.132-3.019
      c3.1,0.66,4.062,10.829,5.427,13.563c1.09,2.172,2.285,3.37,4.773,3.511c-0.877-0.049-3.024,13.271-4.761,14.025
      C709.85,1126.027,704.098,1118.789,702.849,1115.303z"
    />
    <path
      class="luxembourg-hidden"
      :class="{ selectedCountry: thisCountrySelected }"
      d="M702.849,1115.303c-2.267-6.35-1.169-15.54,1.944-19.319c1.14-1.387,1.768-3.521,4.132-3.019
      c3.1,0.66,4.062,10.829,5.427,13.563c1.09,2.172,2.285,3.37,4.773,3.511c-0.877-0.049-3.024,13.271-4.761,14.025
      C709.85,1126.027,704.098,1118.789,702.849,1115.303z"
      @click="selectCountry"
    />
  </g>
</template>

<script>
import mapCountrySelection from './mapCountrySelection'

export default {
  mixins: [mapCountrySelection],
  data: () => ({
    countryName: 'luxembourg',
  }),
}
</script>

<style lang="scss">
.luxembourg-hidden {
  fill: url(#eu-blue-fill);
  cursor: pointer;
  transition: all .4s ease;
}

.luxembourg-hidden:hover {
  opacity: 0;
}

.luxembourg {
  fill: url(#luxembourg);
}
</style>
