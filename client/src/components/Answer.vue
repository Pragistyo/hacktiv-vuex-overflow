<template>
<div>
  <div class="row">
      <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
        <div>
          <h1 class="helloAnswer">Discussion</h1>
        </div>
        <!-- PANEL QUESTION -->
        <question-detail :id='id'></question-detail>
        <!-- FORM ANSWER -->
        <PostAnswer :id="id"></PostAnswer>
        <!-- PANEL ALL ANSWER -->
        <div class="panel panel-warning" v-for="(answer,index) in answerQuestion" :key="index"><!-- v-for answer di sini -->
          <div class="panel-heading transparent"> <!-- HEADER -->
            <h3 
            style="margin-top:-7px;margin-bottom:-7px;color:teal">
            Answer By: {{answer.id_user.username}}
            </h3> <!-- Isi sama author answer -->
            <!-- <p>{{answer._id}}</p> -->
          </div>
          <div class="panel-body transparent"> <!-- BODY -->
              <p>{{answer.content}}</p>
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
                @click="deleteThisAnswer([userData.id,answer._id,id], index)"
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
import PostAnswer from '@/components/PostAnswer'
import QuestionDetail from '@/components/QuestionDetail'
import {mapState, mapActions} from 'vuex'
import swal from 'sweetalert'
export default {
  props: ['id'], // id question
  data () {
    return {
    }
  },
  mounted: function () {
    // this.getSingleQuestion(this.id)
    this.getAllAnswer(this.id)
    if (localStorage.token) {
      this.checkLogin()
    }
  },
  components: {
    QuestionDetail,
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
      'checkLogin',
      'getAllAnswer',
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
.transparent{    
    background-color: rgba(0,0,0,0.15);
}
.panel{
    background-color: transparent;
    border: 1px #222;
}
</style>

