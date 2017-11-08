import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

vue.use(Vuex)

vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:3000/'
  baseURL: 'http://35.197.157.222:3000/'
})

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
      localStorage.clear()
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
    vue.prototype.$http.get('question/all')
    .then(({data}) => {
      console.log('this is data question' + JSON.stringify(data))
      commit('setGetData', data)
    })
  },
  getSingleQuestion ({commit}, payload) { // payload isi string id question
    vue.prototype.$http.get(`question/${payload}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('this is data single question' + JSON.stringify(data))
      commit('setSingleData', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getUserQuestion ({ commit }, payload) {
    vue.prototype.$http.get(`question/userData/${payload}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      commit('setUserQuestion', data)
    })
  },
  postData ({ commit }, payload) {
    console.log('enter post data ======')
    vue.prototype.$http.post(`question/`, {
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
      console.log('this is post data', data)
      commit('setPostData', data)
    })
    .catch(err => {
      console.log('THIS IS ERROR POST DATA >> ' + JSON.stringify(err))
    })
  },
  updateData ({ commit }, payload) {
    vue.prototype.$http.put(`question/`, {
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
        console.log('THIS IS ERROR UPDATE DATA >> ' + JSON.stringify(err))
      })
  },
  deleteData ({ commit }, payload) {
    vue.prototype.$http({
      method: 'delete',
      url: `question/`,
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
        console.log('THIS IS ERROR DELETE DATA >> ' + JSON.stringify(err))
      })
  },
  voteUpData ({ commit, dispatch }, payload) {
    vue.prototype.$http({
      method: 'post',
      url: `question/voteup`,
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
      console.log('THIS IS ERROR VOTE UP DATA >> ' + JSON.stringify(err))
    })
  },
  voteDownData ({ commit, dispatch }, payload) {
    vue.prototype.$http({
      method: 'post',
      url: `question/votedown`,
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
      console.log('THIS IS ERROR VOTE DOWN DATA >> ' + JSON.stringify(err))
    })
  },
  getAllAnswer ({ commit }, payload) {
    vue.prototype.$http.get(`answer/find/${payload}`)
    .then(({data}) => {
      console.log('this is delete answer', data)
      commit('setAnswerData', data)
    })
    .catch(err => {
      console.log('THIS IS ERROR GET ALL ANSWER BY ID QUESTION >> ' + JSON.stringify(err))
    })
  },
  postAnswer ({ dispatch, commit }, payload) {
    console.log('this is payload answer', JSON.stringify(payload))
    vue.prototype.$http.post(`answer/`, {
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
        dispatch('getAllAnswer', payload.questionId)
      }
    })
    .catch(err => {
      console.log('THIS IS ERROR POST ANSWER >> ' + JSON.stringify(err))
    })
  },
  deleteAnswer ({commit}, payload) {
    vue.prototype.$http({
      method: 'delete',
      url: `answer/${payload[1]}`,
      headers: { 'token': localStorage.getItem('token') },
      data: {
        id: payload[0],
        id_question: payload[2]
      }
    })
    .then(result => {
      swal('DELETED', 'your answer already deleted', 'success')
      console.log('this is delete answer', result.data)
    })
    .catch(err => {
      alert(err)
      console.log('THIS IS ERROR DELETE ANSWER>> ' + JSON.stringify(err))
    })
  },
  voteUpAnswer ({commit}, payload) {
    vue.prototype.$http({
      method: 'post',
      url: `answer/voteup/${payload.id_question}`,
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
      console.log('ERROR VOTE UP ANSWER ', JSON.stringify(err))
      alert('ERROR VOTE UP ANSWER ' + JSON.stringify(err))
    })
  },
  voteDownAnswer ({ commit }, payload) {
    vue.prototype.$http({
      method: 'post',
      url: `answer/votedown/${payload.id_question}`,
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
        console.log('ERROR VOTE UP ANSWER' + JSON.stringify(err))
        alert('ERROR VOTE UP ANSWER ' + JSON.stringify(err))
      })
  },
  login ({ commit }, payload) {
    vue.prototype.$http.post('users/login', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('this is login response  ', response.data.token)
      localStorage.setItem('token', response.data.token)
      vue.prototype.$http.get('users/info', {
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
        console.log('THIS IS ERROR LOGIN >> ' + JSON.stringify(err))
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  signup ({ commit }, payload) {
    vue.prototype.$http.post('users', {
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      if (response.data.errmsg) {
        swal('Duplicate !', 'Username and/or email already been used', 'error')
      }
      swal('Now, Please Sign In', 'Register success', 'success')
      commit('setSignup', response.data)
    })
    .catch(err => {
      console.log('THIS IS ERROR SIGN UP >> ' + JSON.stringify(err))
      alert('ERROR REGISTER' + err)
    })
  },
  checkLogin ({ commit }, payload) {
    // ambil token dari localstorage
    // verify kebelakang ke users/info, dapet data user, lempar ke state
    // if localStorage.token ada
    vue.prototype.$http.get('users/info', {
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
        console.log('THIS IS ERROR CHECK LOGIN >> ' + JSON.stringify(err))
      })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
