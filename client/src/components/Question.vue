<template>
<div>
  <div class="row">
    <legend class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
      <h1 class="title" style="color:teal">{{userData.username}} Question :</h1>
    </legend>
  </div>
  <h1 v-if="userQuestion.length === 0">You don't have any question yet !</h1>
  <div class="row">
    <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
        <div v-for="(item,index) in userQuestion" :key="item._id">
            <div class="panel panel-secondary">
              <div class="panel-heading transparent">
                <legend><h3>{{item.title}}</h3></legend>
              </div>
              <div class="panel-body transparent">
                <p>{{item.content}}</p>
                <button 
                class="btn btn-secondary fa fa-thumbs-up"
                @click="voteUpQ({id_user:userData.id,id_question:item._id})">
                {{item.vote_up.length}}
                </button>
                <button 
                class="btn btn-secondary fa fa-thumbs-down"
                @click="voteDownQ({id_user:userData.id,id_question:item._id})">
                {{item.vote_down.length}}
                </button>
                <!-- <router-link :to="{name: 'EditParams', params:{id:item.id_user[0].username,answer:item._id}}"> -->
                <router-link :to="item.id_user[0].username + '/edit/' + item._id">
                <button 
                v-if = "userData.id == item.id_user[0]._id"
                class="btn btn-info fa fa-pencil-square-o"
                @click="updateQuestion(item,index,item.id_user[0]._id,item._id)">
                EDIT
                </button>
                </router-link>
                <button 
                v-if = "userData.id == item.id_user[0]._id"
                class="btn btn-danger fa fa-trash-o">
                DELETE
                </button>
                <router-link :to="{name: 'AnswerParams', params: {id:item._id}}">
                  <button 
                  class="btn btn-outline-primary fa fa-reply"
                  > REPLY: {{item.answer.length}}
                  </button>
                </router-link>
              </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import swal from 'sweetalert'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userQuestion: 'userQuestion',
      userData: 'userData',
      // formEdit: 'formEdit',
      loginStatus: 'loginStatus'
    })
  },
  methods: {
    ...mapActions([
      'getUserQuestion',
      'postData',
      'checkLogin',
      'getSingleQuestion',
      'voteUpData',
      'voteDownData'
    ]),
    updateQuestion (objQuestion, index, userId, questionId) {
      this.getSingleQuestion(questionId)
      // this.formEdit.title = objQuestion.title
      // this.formEdit.content = objQuestion.content
      // this.formEdit.userId = userId
      // this.formEdit.questionId = questionId
      this.formEdit.fromRouter = `/${this.userData.username}`
    },
    voteUpQ (params) {
      alert(JSON.stringify(params))
      if (params.id_user) { // ceknya pake headers token
        this.voteUpData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    },
    voteDownQ (params) {
      alert(JSON.stringify(params))
      if (params.id_user) { // ceknya pake headers token
        this.voteDownData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    }
  },
  created: function () {
    if (localStorage.token) {
      this.checkLogin()
    } else {
      this.$router.push('/')
    }
  },
  watch: {
    userData: function (blabla) {
      this.getUserQuestion(this.userData.id)
    }
  }
}
</script>
<style>
.transparent{    
    background-color: rgba(0,0,0,0.15);
}
.panel{
    background-color: transparent;
    border: 1px #222;
}
h3 {
  color: #19364C;
  /* font-family: Architects Daughter; */
  font-family: Gruppo;
}
</style>

