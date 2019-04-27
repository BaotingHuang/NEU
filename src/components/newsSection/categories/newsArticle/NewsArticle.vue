<template>
  <a
    :href="url"
    target="_blank"
  >
    <div class="article">
      <div
        class="img"
        :style="{ backgroundImage: imgURLstyle }"
      />
      <div class="title">
        {{ name }}
      </div>
      <div class="publish-info">
        <div class="date">
          {{ readableDate }}
        </div>
        <div class="source">
          {{ provider[0].name }}
        </div>
      </div>
      <div class="content">
        {{ description }}
      </div>
    </div>
  </a>
</template>

<script>
import monthNames from './monthNames'

export default {
  props: {
    datePublished: {
      type: String,
      default: 'Publish date unavailable',
    },
    description: {
      type: String,
      default: 'No description available',
    },
    image: {
      type: Object,
      default () {
        return {
          contentUrl: '',
        }
      },
    },
    name: {
      type: String,
      default: 'No title provided',
    },
    url: {
      type: String,
      default: '',
    },
    provider: {
      type: Array,
      default () {
        return [
          {
            name: 'No source provided',
          },
        ]
      },
    },
  },
  data: () => ({

  }),
  computed: {
    imgURLstyle () {
      if (this.image.contentUrl) {
        return `url(${this.image.contentUrl})`
      }

      return ''
    },
    readableDate () {
      const dateStringLength = 10
      const date = this.datePublished.slice(0, dateStringLength).split('-')
      const day = date[2]
      const month = monthNames[date[1]]
      const year = date[0]

      return `${day} ${month} ${year}`
    },
  },
}
</script>

<style lang="scss">
@import './NewsArticle.styles.scss';
</style>
