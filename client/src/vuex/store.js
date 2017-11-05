import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

vue.use(Vuex)

const state = {
  question: [],
  answerQuestion: [],
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
  // allAnswer: [],
  formAnswer: {
    userId: null,
    answer: null,
    questionId: null
  },
  userQuestion: null,
  signup: '',
  singleQuestion: {}
}

// MUTATIONS
const mutations = {
  setGetData (state, payload) {
    state.question = payload
  },
  setSingleData (state, payload) {
    state.singleQuestion = payload
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
    swal('You post a Question', '', 'success')
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
      alert('sampe sini')
      swal(`${payload.objToken}`, '', 'error')
    }
  },
  setSignup (state, payload) {
    state.signup = payload
  },
  setAnswerData (state, payload) {
    state.answerQuestion = payload
  }
}

// ACTIONS
const actions = {
  getData ({ commit }) {
    axios.get('http://localhost:3000/question/all')
    .then(({data}) => {
      console.log('ini data question' + JSON.stringify(data))
      commit('setGetData', data)
    })
  },
  getSingleQuestion ({commit}, payload) { // payload isi string id question
    axios.get(`http://localhost:3000/question/${payload}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('ini data single question' + JSON.stringify(data))
      commit('setSingleData', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getUserQuestion ({ commit }, payload) {
    axios.get(`http://localhost:3000/question/userData/${payload}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      commit('setUserQuestion', data)
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
    .then(({data}) => {
      if (data.errors) {
        swal('Please fill all the fields', '', 'warning')
      } else if (data.name === 'JsonWebTokenError') {
        swal('PLEASE SIGN IN', 'You have to sign in to post a question', 'warning')
      }
      console.log('ini data', data)
      commit('setPostData', data)
    })
    .catch(err => {
      console.log(err + ' ============')
    })
  },
  updateData ({ commit }, payload) {
    axios.put(`http://localhost:3000/question/`, {
      id: payload[0].id_user[0]._id,
      id_question: payload[0]._id,
      title: payload[0].title, // equal
      content: payload[0].content // equal
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(result => {
        console.log(result.data)
        swal('Updated', 'Your Question Successfully updated', 'success')
        // commit('set', result.data)
      })
      .catch(err => {
        console.log('THIS IS ERROR >> ' + JSON.stringify(err))
      })
  },
  deleteData ({ commit }, payload) {
    axios({
      method: 'delete',
      url: `http://localhost:3000/question/`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload.id_user,
        id_question: payload.id_question
      }
    })
      .then(({data}) => {
        console.log('ini data', data)
      })
      .catch(err => {
        swal('ERROR DELETE', 'Failed to remove data form database', 'error')
        console.log(err)
      })
  },
  voteUpData ({ commit, dispatch }, payload) {
    axios({
      method: 'post',
      url: `http://localhost:3000/question/voteup`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload.id_user,
        id_question: payload.id_question
      }
    })
    .then(result => {
      dispatch('getSingleQuestion', payload.id_question)
      dispatch('getUserQuestion', payload.id_user)
      commit('setGetData', result.data)
    })
    .catch(err => {
      alert(JSON.stringify(err))
      console.log(err)
    })
  },
  voteDownData ({ commit, dispatch }, payload) {
    axios({
      method: 'post',
      url: `http://localhost:3000/question/votedown`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload.id_user,
        id_question: payload.id_question
      }
    })
    .then(result => {
      dispatch('getSingleQuestion', payload.id_question)
      dispatch('getUserQuestion', payload.id_user)
      commit('setGetData', result.data)
    })
    .catch(err => {
      alert(JSON.stringify(err))
    })
  },
  getAllAnswer ({ commit }, payload) {
    axios.get(`http://localhost:3000/answer/find/${payload}`)
    .then(({data}) => {
      console.log(data)
      commit('setAnswerData', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postAnswer ({ dispatch, commit }, payload) {
    console.log('this is payload answer', JSON.stringify(payload))
    axios.post(`http://localhost:3000/answer/`, {
      id: payload.userId,
      content: payload.answer,
      id_question: payload.questionId
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(dataAnswer => {
      if (dataAnswer.data.name === 'JsonWebTokenError') {
        swal('Please Sign In', 'Sign in to Post Answer', 'warning')
      } else {
        axios.get(`http://localhost:3000/answer/find/${payload.questionId}`)
        .then(({ data }) => {
          commit('setAnswerData', data)
        })
      }
    })
  },
  deleteAnswer ({commit}, payload) {
    axios({
      method: 'delete',
      url: `http://localhost:3000/answer/${payload[1]}`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload[0]
      }
    })
    .then(result => {
      swal('DELETED', 'your answer already deleted', 'success')
      console.log('ini delete answer', result.data)
    })
    .catch(err => {
      alert(err)
      console.log(err)
    })
  },
  voteUpAnswer ({commit}, payload) {
    axios({
      method: 'post',
      url: `http://localhost:3000/answer/voteup/${payload.id_question}`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload.id_user,
        id_answer: payload.id_answer
      }
    })
    .then(result => {
      commit('setAnswerData', result.data)
    })
    .catch(err => {
      console.log('ERROR VOTE UP ANSWER ', err)
      alert('ERROR VOTE UP ANSWER ' + JSON.stringify(err))
    })
  },
  voteDownAnswer ({ commit }, payload) {
    axios({
      method: 'post',
      url: `http://localhost:3000/answer/votedown/${payload.id_question}`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload.id_user,
        id_answer: payload.id_answer
      }
    })
      .then(result => {
        commit('setAnswerData', result.data)
      })
      .catch(err => {
        console.log('ERROR VOTE UP ANSWER' + err)
        alert('ERROR VOTE UP ANSWER ' + JSON.stringify(err))
      })
  },
  login ({ commit }, payload) {
    axios.post('http://localhost:3000/users/login', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('this is login response  ', response.data.token)
      localStorage.setItem('token', response.data.token)
      axios.get('http://localhost:3000/users/info', {
        headers: {
          token: response.data.token
        }
      })
      .then(result => {
        if (result.data.username) {
          swal(`Welcome: ${result.data.username}`, '', 'success')
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
      if (response.data.errmsg) {
        swal('Duplicate !', 'Username and/or email already been used', 'error')
      }
      commit('setSignup', response.data)
    })
    .catch(err => {
      console.log(err)
      alert('ERROR REGISTER' + err)
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
        } else {
          swal('SIGN IN', 'Please Sign in again', 'error')
          localStorage.clear()
          this.$router.push('/')
        }
      })
      .catch(err => {
        alert('Error get user INFO')
        localStorage.clear()
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
