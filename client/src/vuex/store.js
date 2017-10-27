import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

vue.use(Vuex)

const state = {
  question: [],
  answerData: [],
  loginStatus: {
    status: false,
    token: null
  },
  userData: {
    id: null,
    username: null
  },
  formEdit: {
    title: null,
    content: null,
    userId: null,
    questionId: null,
    fromRouter: null,
    createdAt: null
  },
  allAnswer: [],
  formAnswer: {
    userId: null,
    answer: null,
    questionId: null
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
    alert('You post a Question')
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
    state.answerData = payload
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
      if (data.data.errors) {
        alert(JSON.stringify('Please fill all the fields'))
      } else if (data.data.name === 'JsonWebTokenError') {
        alert(JSON.stringify('PLEASE SIGN IN'))
      }
      console.log('ini data', data.data)
      commit('setPostData', data.data)
    })
    .catch(err => {
      console.log(err + ' ============')
    })
  },
  updateData ({ commit }, payload) {
    axios.put(`http://localhost:3000/question/`, {
      id: payload.userId,
      id_question: payload.questionId,
      title: payload.title,
      content: payload.content
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(result => {
        console.log(result.data)
        alert('Your Question Successfully updated')
        // commit('set', result.data)
      })
      .catch(err => {
        console.log('INI ERROR >> ' + err)
      })
  },
  deleteData ({ commit }, payload) {
    axios({
      method: 'delete',
      url: `http://localhost:3000/question/`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload[0],
        id_question: payload[1]
      }
    })
      .then(data => {
        alert('delete data >> ' + JSON.stringify(data))
        console.log('ini data', data.data)
      })
      .catch(err => {
        alert('Failed to remove data form database')
        console.log(err)
      })
  },
  getAllAnswer ({ commit }, payload) {
    console.log('payload allAnswer' + JSON.stringify(payload))
    axios.get(`http://localhost:3000/answer/find/${payload}`)
    .then(result => {
      console.log(result.data)
      commit('setAnswerData', result.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postAnswer ({ commit }, payload) {
    console.log('ini payload answer', JSON.stringify(payload))
    axios.post(`http://localhost:3000/answer/`, {
      id: payload.userId[0]._id,
      content: payload.answer,
      id_question: payload.questionId
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(dataAnswer => {
      alert(JSON.stringify(dataAnswer))
      console.log('ini dataAnswer', dataAnswer.data)
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
        if (result.data.id) {
          commit('setLogin', { objToken: {token: localStorage.token}, objUser: result.data })
        }
      })
      .catch(err => {
        alert('Error get user INFO')
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
