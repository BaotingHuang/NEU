import axios from 'axios'
import articleDataStructure from './articleDataStructure'

export default {
  state: {
    articles: articleDataStructure,
  },
  namespaced: true,
  mutations: {
    saveNewArticles: (state, payload) => {
      const { country, category, response } = payload
      if (category !== 'custom') {
        state.articles[country][category] = response.data.value
      } else {
        state.articles.customSearch = response.data.value
      }
    },
    resetCustomSearchResults: (state) => {
      state.articles.customSearch = []
    },
  },
  actions: {
    searchForArticles ({ dispatch }) {
      const country = this.state.appData.selectedCountry
      const category = this.state.appData.selectedCategory
      const { articles } = this.state.newsQueries

      if (country !== 'State' && category) {
        // country and category selected are by user -> send API call if no articles in store
        if (!articles[country][category][0]) {
          dispatch('queryBingNews', [country, category])
        }
      }
    },
    queryBingNews (context, [country, category]) {
      const endpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search'
      const key = 'API_KEY'
      let query = `${country} AND ${category}`
      if (category === 'general') {
        query = `${country}`
      }
      const config = {
        headers: { 'Ocp-Apim-Subscription-Key': key },
      }
      const url = `${endpoint}?cc=GB&q=${query}&count=20&originalImg=true`

      axios.get(url, config)
        .then((response) => {
          const payload = {
            country,
            category,
            response,
          }
          context.commit('saveNewArticles', payload)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    queryBingNewsCustomSearch (context, userInput) {
      context.commit('resetCustomSearchResults')
      const category = this.state.appData.selectedCategory
      const endpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search'
      const key = 'API_KEY'
      const config = {
        headers: { 'Ocp-Apim-Subscription-Key': key },
      }
      const inputText = userInput.split(' ')
      let query = inputText.join(' AND ')
      query = encodeURIComponent(query)
      const url = `${endpoint}?cc=GB&q=${query}&count=20&originalImg=true`

      axios.get(url, config)
        .then((response) => {
          const payload = {
            category,
            response,
          }
          context.commit('saveNewArticles', payload)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
