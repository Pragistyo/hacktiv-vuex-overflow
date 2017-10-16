import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

vue.use(Vuex)

const state = {
  question: '',
  questionDetail: [],
  loginStatus: '',
  signup: ''
}

const mutations = {
  setGetData (state, payload) {
    state.question = payload
    console.log('ini mutasi question ===========' + JSON.stringify(payload))
  },
  setDetailQuestion (state, payload) {
    state.questionDetail = payload
  },
  setPostData (state, payload) {
    state.question.push(payload)
  },
  setLogin (state, payload) {
    // alert('ini payload' + JSON.stringify(payload))
    state.loginStatus = payload
  },
  setSignup (state, payload) {
    state.signup = payload
  },
  setAnswerData (state, payload) {
    state.questionDetail = payload
  }
}
const actions = {
  getData ({ commit }) {
    axios.get('http://localhost:3000/question/all')
    .then(data => {
      console.log('ini data question' + JSON.stringify(data.data))
      commit('setGetData', data.data)
    })
  },
  getDetails ({ commit }, payload) {
    axios.patch(`http://localhost:3000/question/${payload}`)
    .then(data => {
      commit('setDetailQuestion', data.data)
    })
  },
  postData ({ commit }, payload) {
    axios.post('http://localhost:3000/question', {
      title: payload.title,
      question: payload.question
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(data => {
      console.log('ini data', data.data)
      commit('setPostData', data.data)
    })
  },
  postAnswer ({ commit }, payload) {
    console.log('ini payload', JSON.stringify(payload.answer.answer))
    axios.post(`http://localhost:3000/question/answer/${payload.id}`, {
      answer: payload.answer.answer
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(dataAnswer => {
      console.log('ini dataAnswer', dataAnswer.data)
      commit('setAnswerData', dataAnswer.data)
    })
  },
  login ({ commit }, payload) {
    axios.post('http://localhost:3000/users/login', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      commit('setLogin', response.data)
      alert('setLogin' + JSON.stringify(response.data))
      console.log('ini response ', response.data.token)
      localStorage.setItem('token', response.data.token)
    })
    .catch(err => {
      console.log(err)
    })
  },
  signup ({ commit }, payload) {
    axios.post('http://localhost:3000/users', {
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      alert('blabla' + JSON.stringify(response.data))
      commit('setSignup', response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
