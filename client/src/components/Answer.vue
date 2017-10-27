<template>
<div>
  <Navbar></Navbar>
  <div class="row">
      <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
        <div>
          <h1 class="helloAnswer">Answer</h1>
        </div>
        <!-- PANEL QUESTION -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <legend>
              <h2 style="margin-top:-10px">{{formEdit.title}}</h2>
            </legend>
            <h3 style="margin-top:-10px; color:teal">
              Author: {{formEdit.userId[0].username}}
            </h3>
          </div>
          <div class="panel-body">
            <p>{{formEdit.content}}</p>
          </div>
        </div>
        <button @click="test(formEdit.questionId)">TEST</button>
        <!-- FORM ANSWER -->
        <PostAnswer></PostAnswer>
        <!-- PANEL ALL ANSWER -->
        <div class="panel panel-warning" v-for="(answer,index) in answerData"><!-- v-for answer di sini -->
          <div class="panel-heading"> <!-- HEADER -->
            <h3 style="margin-top:-7px">Answer Author: {{answer.id_user.username}}</h3> <!-- Isi sama author answer -->
          </div>
          <div class="panel-body"> <!-- BODY -->
              <p>{{answer.content}}</p>
              <!-- <p>{{answer}}</p> -->
              <div>
                <button class="btn btn-default fa fa-thumbs-up">
                {{answer.vote_up.length}}</button>
                <button class="btn btn-default fa fa-thumbs-down">
                {{answer.vote_down.length}}</button>
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
export default {
  data () {
    return {
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
      answerData: 'answerData'
    })
  },
  methods: {
    ...mapActions([
      'postAnswer',
      'checkLogin',
      'getAllAnswer'
    ]),
    test (bla) {
      this.getAllAnswer(bla)
    }
  },
  mounted: function () {
    if (localStorage.token) {
      this.checkLogin()
    }
    if (this.loginStatus.status === false) {
      this.$router.push('/')
    }
    this.getAllAnswer(this.formEdit.questionId)
  },
  watch: {
    // answerData: function () {
    //   this.getAllAnswer(this.formEdit.questionId)
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

