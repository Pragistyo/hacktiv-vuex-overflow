<template>
    <div class="row">
      <!-- {{getAllQuestion}} -->
      <HelloUser></HelloUser>
      <PostQuestion></PostQuestion>
        <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2" 
             v-for="(item,index) in getAllQuestion" :key="item._id" >
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3>{{item.title}}</h3>
              </div>
              <div class="panel-body">
                  <div>
                    <legend><h4>Author:  {{item.id_user[0].username}}</h4></legend>
                  </div>
                  <!-- <div> -->
                    <!-- <p>{{item.content}}</p> -->
                  <!-- </div> -->
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
                    <!-- {{item.id_user[0].username}} -->
                    <!-- <router-link :to="{name: 'EditParams', params:{id:item.id_user[0].username, question:item._id}}"> -->
                    <!-- <router-link :to="item.id_user[0].username + '/edit/' + item._id">
                      <button 
                      v-if = "userData.id == item.id_user[0]._id"
                      class="btn btn-info fa fa-pencil-square-o"
                      @click="updateQuestion(item,index,item.id_user[0]._id,item._id)">
                      EDIT
                      </button>
                    </router-link> -->
                    <button 
                    v-if = "userData.id == item.id_user[0]._id"
                    class="btn btn-danger fa fa-trash-o"
                    @click="deleteQuestion(index,item.id_user[0]._id,item._id)">
                    DELETE
                    </button>
                    <router-link :to="{name:'AnswerParams', params:{id:item._id}}">
                    <!-- <router-link to="/answer/"> -->
                      <button 
                      @click="answerQuestion(item,index)"
                      class="btn btn btn-outline-info fa fa-reply">
                      ANSWER: {{item.answer.length}}
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
      this.deleteData([userId, questionId])
      this.getAllQuestion.splice(index, 1)
    },
    updateQuestion (objQuestion, index, userId, questionId) {
      this.getSingleQuestion(questionId)
      this.formEdit.fromRouter = '/'
    },
    answerQuestion (objQuestion, index) {
      // this.$swal(JSON.stringify(objQuestion))
      // alert(JSON.stringify(objQuestion))
      this.getSingleQuestion(objQuestion._id)
      this.formAns.userId = objQuestion.id_user
      this.formAns.questionId = objQuestion._id
      this.formAns.fromRouter = '/'
    },
    voteUp (params) {
      alert(JSON.stringify(params))// ceknya pake headers token
      if (params.id_user) {
        this.voteUpData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    },
    voteDown (params) {
      alert(JSON.stringify(params))// ceknya pake headers token
      if (params.id_user) {
        this.voteDownData(params)
      } else {
        swal('Please Login', 'You must login to vote answer', 'warning')
      }
    }
  },
  created: function () {
    this.getData()
  },
  watch: { // not a solution yet
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
</style>


