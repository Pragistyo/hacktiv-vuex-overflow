import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

vue.use(Vuex)

const state = {
  question: [],
  questionDetail: [],
  loginStatus: {
    status: false,
    token: null
  },
  userData: {
    id: null,
    username: null
  },
  userQuestion: null,
  signup: ''
}

// MUTATIONS
const mutations = {
  setGetData (state, payload) {
    state.question = payload
    console.log('ini mutasi question ===========' + JSON.stringify(payload))
  },
  setDetailQuestion (state, payload) {
    state.questionDetail = payload
  },
  setUserQuestion (state, payload) {
    state.userQuestion = payload
  },
  setPostData (state, payload) {
    payload.id_user = [{'_id': payload.id_user[0], 'username': state.userData.username}]
    state.question.push(payload)
  },
  setLogin (state, payload) {
    console.log('ini payload' + JSON.stringify(payload.objToken))
    if (typeof payload.objToken === 'object') {
      state.loginStatus = {
        status: true,
        token: payload.objToken.token
      }
      state.userData = {
        id: payload.objUser.id,
        username: payload.objUser.username
      }
    } else {
      alert(payload.objToken)
    }
  },
  setSignup (state, payload) {
    state.signup = payload
  },
  setAnswerData (state, payload) {
    state.questionDetail = payload
  }
}

// ACTIONS
const actions = {
  getData ({ commit }) {
    axios.get('http://localhost:3000/question/all')
    .then(data => {
      console.log('ini data question' + JSON.stringify(data.data))
      commit('setGetData', data.data)
    })
  },
  getUserQuestion ({ commit }, payload) {
    axios.get(`http://localhost:3000/question/userData/${payload}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(data => {
      commit('setUserQuestion', data.data)
    })
  },
  postData ({ commit }, payload) {
    console.log('masuk post data ======')
    axios.post(`http://localhost:3000/question/`, {
      title: payload.title,
      content: payload.content
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(data => {
      console.log('ini data', data.data)
      commit('setPostData', data.data)
    })
    .catch(err => {
      alert('Please Login')
      console.log(err)
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
      console.log('ini response login ', response.data.token)
      localStorage.setItem('token', response.data.token)
      axios.get('http://localhost:3000/users/info', {
        headers: {
          token: response.data.token
        }
      })
      .then(result => {
        if (result.data.username) {
          alert('Welcome: ' + result.data.username)
        }
        commit('setLogin', {objToken: response.data, objUser: result.data})
      })
      .catch(err => {
        alert('Error get user INFO')
        console.log(err)
      })
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
      commit('setSignup', response.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  checkLogin ({ commit }, payload) {
    // ambil token dari localstorage
    // verify kebelakang ke users/info, dapet data user, lempar ke state
    // if localStorage.token ada
    axios.get('http://localhost:3000/users/info', {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => { // hasilnya data user
        commit('setLogin', { objToken: {token: localStorage.token}, objUser: result.data })
      })
      .catch(err => {
        alert('Error get user INFO')
        console.log(err)
      })
  },
  updateData () {
  },
  deleteData ({commit}, payload) {
    alert('masuk delete data' + JSON.stringify(payload[0]))
    alert('masuk delete data2' + JSON.stringify(payload[1]))
    axios({
      method: 'delete',
      url: `http://localhost:3000/question/`,
      headers: {'token': localStorage.getItem('token')},
      data: {
        id: payload[0],
        id_question: payload[1]
      }
    })
    // axios.delete(`http://localhost:3000/question/`, {
    //   headers: {
    //     'token': localStorage.getItem('token')
    //   }
    // }, {
    //   id: payload[0],
    //   id_question: payload[1]
    // })
    .then(data => {
      alert('delete data >> ' + JSON.stringify(data))
      console.log('ini data', data.data)
    })
    .catch(err => {
      alert('Failed to remove data form database')
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

// id: 'blabla',
//   id_question: payload2
