<template>
  <div
    ref="mapContainer"
    class="map-container"
  >
    <svg
      id="map-svg-element"
      ref="mapSVGElement"
      :class="{ draggable: isMapBeingGrabbed }"
      version="1.1"
      :transform="currentMapTransformData"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100%"
      height="100%"
      viewBox="0 0 1839.184 1872.252"
      enable-background="new 0 0 1839.184 1872.252"
      xml:space="preserve"
    >
      <Patterns />
      <g id="map-vector">
        <CountriesNonEU />
        <Germany />
        <Romania />
        <Bulgaria />
        <Portugal />
        <Hungary />
        <Austria />
        <Czechia />
        <Slovakia />
        <Slovenia />
        <France />
        <Netherlands />
        <Belgium />
        <Ireland />
        <Spain />
        <Cyprus />
        <Croatia />
        <Lithuania />
        <Latvia />
        <Estonia />
        <Luxembourg />
        <Sweden />
        <Finland />
        <UK />
        <Poland />
        <Italy />
        <Greece />
        <Denmark />
      </g>
    </svg>
  </div>
</template>

<script>
import Patterns from './Patterns.vue'
import Poland from './Countries/Poland.vue'
import Germany from './Countries/Germany.vue'
import France from './Countries/France.vue'
import Spain from './Countries/Spain.vue'
import Portugal from './Countries/Portugal.vue'
import Italy from './Countries/Italy.vue'
import Sweden from './Countries/Sweden.vue'
import Finland from './Countries/Finland.vue'
import Denmark from './Countries/Denmark.vue'
import Belgium from './Countries/Belgium.vue'
import Netherlands from './Countries/Netherlands.vue'
import Luxembourg from './Countries/Luxembourg.vue'
import Ireland from './Countries/Ireland.vue'
import UK from './Countries/UK.vue'
import Czechia from './Countries/Czechia.vue'
import Austria from './Countries/Austria.vue'
import Lithuania from './Countries/Lithuania.vue'
import Latvia from './Countries/Latvia.vue'
import Estonia from './Countries/Estonia.vue'
import Slovakia from './Countries/Slovakia.vue'
import Slovenia from './Countries/Slovenia.vue'
import Cyprus from './Countries/Cyprus.vue'
import Hungary from './Countries/Hungary.vue'
import Romania from './Countries/Romania.vue'
import Bulgaria from './Countries/Bulgaria.vue'
import Greece from './Countries/Greece.vue'
import Croatia from './Countries/Croatia.vue'
import CountriesNonEU from './Countries/CountriesNonEU.vue'
import mapControls from './mapInterfaceControls'

export default {
  components: {
    Patterns,
    Poland,
    Germany,
    France,
    Spain,
    Portugal,
    Italy,
    Sweden,
    Finland,
    Denmark,
    Belgium,
    Netherlands,
    Luxembourg,
    Ireland,
    UK,
    Czechia,
    Austria,
    Lithuania,
    Latvia,
    Estonia,
    Slovakia,
    Cyprus,
    Hungary,
    Romania,
    Bulgaria,
    Greece,
    Croatia,
    Slovenia,
    CountriesNonEU,
  },
  mixins: [mapControls],
}
</script>

<style lang="scss">
@import './TheMap.styles.scss';
</style>
