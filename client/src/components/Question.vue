<template>
<div>
  <div class="row">
    <legend class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
      <h1 class="title" style="color:teal">{{userData.username}} Question :</h1>
    </legend>
  </div>
  <!-- <p>{{userQuestion}}</p> -->
  <div class="row">
    <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
        <div v-for="(item,index) in userQuestion" :key="">
            <div class="panel panel-primary">
              <div class="panel panel-heading">
                <h1>{{item.title}}</h1>
              </div>
              <div class="panel-body">
                <legend>
                  <h2>Author:  {{item.id_user[0].username}}</h2>
                </legend>
                <p>{{item.content}}</p>
                <button class="btn btn-default fa fa-thumbs-up">
                {{item.vote_up.length}}</button>
                <button class="btn btn-default fa fa-thumbs-down">
                {{item.vote_down.length}}</button>
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
                  class="btn btn-primary fa fa-reply"
                  > ANSWER: {{item.answer.length}}
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
export default {
  data () {
    return {
      form: {
        title: '',
        question: ''
      }
    }
  },
  computed: {
    ...mapState({
      userQuestion: 'userQuestion',
      userData: 'userData',
      loginStatus: 'loginStatus',
      formEdit: 'formEdit'
    })
  },
  methods: {
    ...mapActions([
      'getUserQuestion',
      'postData',
      'checkLogin',
      'getSingleQuestion'
    ]),
    post () { // ga kepake
      this.postData(this.form)
    },
    updateQuestion (objQuestion, index, userId, questionId) {
      // alert('masuk update')
      this.getSingleQuestion(questionId)
      this.formEdit.title = objQuestion.title
      this.formEdit.content = objQuestion.content
      this.formEdit.userId = userId
      this.formEdit.questionId = questionId
      this.formEdit.fromRouter = `/${this.userData.username}`
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
</style>

