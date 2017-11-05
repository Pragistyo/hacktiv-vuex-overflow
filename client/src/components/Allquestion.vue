<template>
    <div class="row">
      <!-- {{getAllQuestion}} -->
      <HelloUser></HelloUser>
      <PostQuestion></PostQuestion>
        <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2" 
             v-for="(item,index) in getAllQuestion" :key="item._id" >
            <div class="panel panel-secondary panel-transparent">
              <div class="panel-heading ">
                <h3>{{item.title}}</h3>
                <p>by: {{item.id_user[0].username}}</p>
              </div>
              <div class="panel-body ">
                  <!-- <div>
                    <legend><h4>Author:  {{item.id_user[0].username}}</h4></legend>
                  </div> -->
                  <div class="col-sm-12">
                    <button 
                      class="btn btn-secondary fa fa-thumbs-up"
                      @click="voteUp({id_user:userData.id,id_question:item._id})">
                    {{item.vote_up.length}}
                    </button>
                    <button 
                      class="btn btn-secondary fa fa-thumbs-down"
                      @click="voteDown({id_user:userData.id,id_question:item._id})">
                    {{item.vote_down.length}}
                    </button>
                    <button 
                      v-if = "userData.id == item.id_user[0]._id"
                      class="btn btn-danger fa fa-trash-o"
                      @click="deleteQuestion(index,item.id_user[0]._id,item._id)">
                    DELETE
                    </button>
                    <router-link :to="{name:'AnswerParams', params:{id:item._id}}">
                      <button 
                        @click="answerQuestion(item,index)"
                        class="btn btn-outline-info fa fa-reply">
                      REPLY: {{item.answer.length}}
                      </button>
                    </router-link>
                    <!-- <button class="btn btn-success fa fa-list-alt"> SEE DETAIL</button> -->
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import swal from 'sweetalert'
import PostQuestion from '@/components/PostQuestion'
import HelloUser from '@/components/HelloUser'
export default {
  data () {
    return {
    }
  },
  components: {
    PostQuestion,
    HelloUser
  },
  computed: {
    ...mapState({
      getAllQuestion: 'question',
      userData: 'userData',
      formEdit: 'formEdit',
      formAns: 'formAnswer'
    })
  },
  methods: {
    ...mapActions([
      'getData',
      'getSingleQuestion',
      'deleteData',
      'voteUpData',
      'voteDownData'
    ]),
    deleteQuestion (index, userId, questionId) {
      this.deleteData({id_user: userId, id_question: questionId})
      this.getAllQuestion.splice(index, 1)
    },
    updateQuestion (objQuestion, index, userId, questionId) {
      this.getSingleQuestion(questionId)
      this.formEdit.fromRouter = '/'
    },
    answerQuestion (objQuestion, index) {
      this.getSingleQuestion(objQuestion._id)
      this.formAns.userId = objQuestion.id_user
      this.formAns.questionId = objQuestion._id
      this.formAns.fromRouter = '/'
    },
    voteUp (params) {
      if (params.id_user) { // ceknya pake headers token
        this.voteUpData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    },
    voteDown (params) {
      if (params.id_user) { // ceknya pake headers token
        this.voteDownData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    }
  },
  created: function () {
    this.getData()
  },
  watch: {
    userData: function (a) {
      this.getData()
    }
  }
}
</script>
<style scoped>
.panel-body {
  /* background-image: url('/static/gradient2.png'); */
  background-color: white
}
.panel-heading {
  padding: 1px 0px 0px 0px;
}
h3 {
  color: #19364C;
  /* font-family: Architects Daughter; */
  font-family: Gruppo;
}
h3, h4 {
  margin-top: 10px;
}
body {
        background:#c33;
}

.panel-transparent {
    background: none;
}

/* .panel-transparent .panel-heading{
    background: rgba(122, 130, 136, 0.2)!important;
} */

.panel-transparent .panel-heading {
    background: rgba(46, 51, 56, 0.2)!important;
}

.panel-transparent .panel-body {
    background: rgba(46, 51, 56, 0.2)!important;
}


</style>


