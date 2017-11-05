<template>
<div>
  <div class="row">
      <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
        <div>
          <h1 class="helloAnswer">Answer</h1>
        </div>
        <!-- PANEL QUESTION -->
        <!-- <p>{{singleQuestion}}</p> -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <legend>
              <h2 style="margin-top:-10px">{{singleQuestion.title}}</h2>
            </legend>
            <h3 style="margin-top:-10px; color:teal">
              Author: {{singleQuestion.id_user[0].username}}
            </h3>
          </div>
          <div class="panel-body">
            <p>{{singleQuestion.content}}</p>
          </div>
          <div>
            <router-link :to="'/' +singleQuestion.id_user[0].username + '/edit/' + singleQuestion._id">
            <!-- <router-link :to="singleQuestion.id_user[0].username"> -->
              <button 
              v-if = "userData.id == singleQuestion.id_user[0]._id"
              @click= "updateQuestion(singleQuestion._id)"
              class="btn btn-info fa fa-pencil-square-o">
                EDIT
              </button>
            </router-link>
          </div><br>
        </div>
        <!-- FORM ANSWER -->
        <PostAnswer :id="id"></PostAnswer>
        <!-- PANEL ALL ANSWER -->
        <div class="panel panel-warning" v-for="(answer,index) in answerQuestion" :key="index"><!-- v-for answer di sini -->
          <div class="panel-heading"> <!-- HEADER -->
            <h3 style="margin-top:-7px">Answer Author: {{answer.id_user.username}}</h3> <!-- Isi sama author answer -->
          </div>
          <div class="panel-body"> <!-- BODY -->
              <p>{{answer.content}}</p>
              <!-- <p>answer ID: {{answer._id}}</p> -->
              <div>                                                                                                                               
                <button 
                class="btn btn-default fa fa-thumbs-up"
                @click="voteUp({id_user:userData.id,id_answer:answer._id,id_question:answer.id_question._id},index)">
                {{answer.vote_up.length}}</button>
                <button 
                class="btn btn-default fa fa-thumbs-down"
                @click="voteDown({id_user:userData.id,id_answer:answer._id,id_question:answer.id_question._id},index)">
                {{answer.vote_down.length}}</button>
                <button 
                class="btn btn-danger fa fa-trash"
                @click="deleteThisAnswer([userData.id,answer._id], index)"
                v-if="userData.id === answer.id_user._id">
                DELETE</button>
              </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import PostAnswer from '@/components/PostAnswer'
import {mapState, mapActions} from 'vuex'
import swal from 'sweetalert'
export default {
  props: ['id'],
  data () {
    return {
    }
  },
  mounted: function () {
    this.getSingleQuestion(this.id)
    this.getAllAnswer(this.id)
    if (localStorage.token) {
      this.checkLogin()
    }
  },
  components: {
    Navbar,
    PostAnswer
  },
  computed: {
    ...mapState({
      userData: 'userData',
      loginStatus: 'loginStatus',
      formEdit: 'formEdit',
      answerQuestion: 'answerQuestion',
      singleQuestion: 'singleQuestion'
    })
  },
  methods: {
    ...mapActions([
      'postAnswer',
      'checkLogin',
      'getAllAnswer',
      'getSingleQuestion',
      'deleteAnswer',
      'voteUpAnswer',
      'voteDownAnswer'
    ]),
    updateQuestion (questionId) {
      this.getSingleQuestion(questionId)
    },
    deleteThisAnswer (arrParams, index) {
      this.deleteAnswer(arrParams)
      this.answerQuestion.splice(index, 1)
    },
    voteUp (params, indexAnswer) {
      if (params.id_user) {
        this.voteUpAnswer(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    },
    voteDown (params, indexAnswer) {
      if (params.id_user) {
        this.voteDownAnswer(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    }
  },
  watch: {
    // id: function (semogaCepetLulus) {
    //   this.getAllAnswer(this.id)
    //   this.getSingleQuestion(this.id)
    // }
  }
}
</script>
<style scoped>
.helloAnswer {
   background-image: linear-gradient(to right, red, orange 20%, brown);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

