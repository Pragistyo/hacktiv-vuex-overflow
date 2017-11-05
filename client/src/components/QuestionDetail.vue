<template>
  <div class="panel panel-secondary">
          <div class="panel-heading transparent">
            <legend>
              <!-- <P>{{singleQuestion}}</P> -->
              <h3 style="margin-top:-10px">{{singleQuestion.title}}</h3>
              <h3 style="margin-top:-10px; color:teal">
                Author: {{singleQuestion.id_user[0].username}}
              </h3>
            </legend>
          </div>
          <div class="panel-body transparent">
            <p>{{singleQuestion.content}}</p>
            <div>
              <button 
                class="btn btn-secondary fa fa-thumbs-up"
                @click="voteUpQ({id_user:userData.id,id_question:singleQuestion._id})">
              {{singleQuestion.vote_up.length}}
              </button>
              <button 
                class="btn btn-secondary fa fa-thumbs-down"
                @click="voteDownQ({id_user:userData.id,id_question:singleQuestion._id})">
              {{singleQuestion.vote_down.length}}
              </button>
              <!-- <router-link :to="singleQuestion.id_user[0].username">BLABLA</router-link> -->
              <router-link :to="'/' +singleQuestion.id_user[0].username + '/edit/' + singleQuestion._id">
                <button 
                v-if = "userData.id == singleQuestion.id_user[0]._id"
                @click= "updateQuestion(singleQuestion._id)"
                class="btn btn-info fa fa-pencil-square-o">
                  EDIT
                </button>
              </router-link>
            </div>
          </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import swal from 'sweetalert'
export default {
  props: ['id'],
  data () {
    return {
    }
  },
  mounted () {
    this.getSingleQuestion(this.id)
    if (localStorage.token) {
      this.checkLogin()
    }
  },
  computed: {
    ...mapState({
      userData: 'userData',
      singleQuestion: 'singleQuestion'
    })
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'getSingleQuestion',
      'voteUpData',
      'voteDownData'
    ]),
    updateQuestion (questionId) {
      this.getSingleQuestion(questionId)
    },
    voteUpQ (params) {
      if (params.id_user) { // ceknya pake headers token
        this.voteUpData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    },
    voteDownQ (params) {
      if (params.id_user) { // ceknya pake headers token
        this.voteDownData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    }
  }
}
</script>

<style>
</style>
