const getCursorPosition = (e, mapContainer) => {
  const cursorData = {
    mapWidth: mapContainer.offsetWidth,
    mapHeight: mapContainer.offsetHeight,
    cursorPositionX: e.pageX - mapContainer.offsetLeft,
    cursorPositionY: e.pageY - mapContainer.offsetTop,
  }

  const cursorAxisPosition = {
    X: (cursorData.cursorPositionX / cursorData.mapWidth).toFixed(1),
    Y: (cursorData.cursorPositionY / cursorData.mapHeight).toFixed(1),
  }

  return cursorAxisPosition
}

const getCursorCoordinatesOnSVG = (e, mapSVGElement) => {
  const point = mapSVGElement.createSVGPoint()
  point.x = e.clientX
  point.y = e.clientY

  const coords = point.matrixTransform(mapSVGElement.getScreenCTM().inverse())
  coords.x = Math.round(coords.x)
  coords.y = Math.round(coords.y)

  return coords
}

export { getCursorPosition, getCursorCoordinatesOnSVG }
