// map scrolling and zooming logic require many instances of numerical values
/* eslint-disable no-magic-numbers, no-floating-decimal */

import { getCursorPosition, getCursorCoordinatesOnSVG } from './cursorHelpers'

export const mapControls = {
  data: () => ({
    selectedElement: false,
    startingCursorPosition: false,
    isMapBeingGrabbed: false,
    currentMapTransformData: 'matrix(1 0 0 1 0 0)',
  }),
  methods: {
    zoomEventListener (e) {
      // get the current map matrix attribute
      let matrix = this.currentMapTransformData
      // get an array of only matrix values - by default it comes as a string like this: 'matrix(a, b, c, d, e, f)'
      matrix = /\(([^)]+)\)/.exec(matrix)[1].split(' ')

      // zoom in (add .1 to scale) or zoom out depending on wheel rotation
      let modifier = 0
      if (e.deltaY < 0 && matrix[0] < 2) { // skip first 15 faulty zoom levels
        modifier = 1.2
      } else if (e.deltaY < 0 && matrix[0] < 4) {
        modifier = 0.1
      } else if (e.deltaY > 0 && matrix[0] < 2.3) { // skip first 15 faulty zoom levels
        modifier = -(matrix[0] - 1)
      } else if (e.deltaY > 0 && matrix[0] > 1) {
        modifier = -0.1
      }

      if (modifier) {
        matrix[0] = (Number(matrix[0]) + modifier).toFixed(2)
        matrix[3] = (Number(matrix[3]) + modifier).toFixed(2)
      }

      // get cursor position for panning in a specific direction along with zooming in
      const cursorAxisPosition = getCursorPosition(e, this.$refs.mapContainer)

      // translate depending on the cursor position or center when zooming out
      const translateAxis = (event, axis, matrixPosition) => {
        if (event.deltaY < 0 && matrix[0] < 4) {
          // zooming in
          // axis: translationModifier
          const translationMap = {
            0: 40,
            0.1: 30,
            0.2: 20,
            0.3: 10,
            0.4: 5,
            0.5: 0,
            0.6: -5,
            0.7: -10,
            0.8: -20,
            0.9: -30,
            1: -40,
          }
          const translationModifier = translationMap[axis]
          matrix[matrixPosition] = (Number(matrix[matrixPosition]) + translationModifier).toFixed(2)
        } else if (event.deltaY > 0) {
          // get zoomLevel (0-30 range)
          const zoomLevel = Math.round((matrix[0] - 1) * 10)
          // reset matrix if max zoom out or get evenly closer to centering matrix with each scroll
          if (zoomLevel === 0) {
            matrix[4] = 0
            matrix[5] = 0
          } else {
            matrix[4] = Math.round(Number(matrix[4])) - (Math.round(Number(matrix[4]) / zoomLevel))
            matrix[5] = Math.round(Number(matrix[5])) - (Math.round(Number(matrix[5]) / zoomLevel))
          }
        }
      }

      translateAxis(e, cursorAxisPosition.X, 4)
      translateAxis(e, cursorAxisPosition.Y, 5)

      // set the new matrix attributes for the map
      this.currentMapTransformData = `matrix(${matrix.join(' ')})`
    },
    startDragging (e) {
      e.preventDefault()
      this.selectedElement = e.target
      this.isMapBeingGrabbed = true
      this.startingCursorPosition = getCursorCoordinatesOnSVG(e, this.$refs.mapSVGElement)
    },
    drag (e) {
      if (this.selectedElement && this.currentMapTransformData[7] > 1) {
        let matrix = this.currentMapTransformData
        matrix = /\(([^)]+)\)/.exec(matrix)[1].split(' ')

        const currentCursorPosition = getCursorCoordinatesOnSVG(e, this.$refs.mapSVGElement)
        const axisDifferenceX = Math.round(this.startingCursorPosition.x - currentCursorPosition.x)
        const axisDifferenceY = Math.round(this.startingCursorPosition.y - currentCursorPosition.y)

        matrix[4] = Math.round(Number(matrix[4]) - axisDifferenceX)
        matrix[5] = Math.round(Number(matrix[5]) - axisDifferenceY)

        this.currentMapTransformData = `matrix(${matrix.join(' ')})`
      }
    },
    endDragging () {
      this.selectedElement = false
      this.startingCursorPosition = false
      this.isMapBeingGrabbed = false
    },
  },
  mounted () {
    const { mapContainer, mapSVGElement } = this.$refs

    // disable site scrolling when cursor is over the map
    mapContainer.onwheel = () => false

    // zoom in and out when cursor is over the map
    mapContainer.addEventListener('wheel', this.zoomEventListener)

    mapSVGElement.addEventListener('mousedown', this.startDragging)
    window.addEventListener('mousemove', this.drag)
    mapSVGElement.addEventListener('mouseup', this.endDragging)
    mapSVGElement.addEventListener('mouseleave', this.endDragging)
  },
  beforeDestroy () {
    const { mapContainer, mapSVGElement } = this.$refs
    mapContainer.removeEventListener('wheel', this.zoomEventListener)
    mapSVGElement.addEventListener('mousedown', this.startDragging)
    window.addEventListener('mousemove', this.drag)
    mapSVGElement.addEventListener('mouseup', this.endDragging)
    mapSVGElement.addEventListener('mouseleave', this.endDragging)
  },
}
