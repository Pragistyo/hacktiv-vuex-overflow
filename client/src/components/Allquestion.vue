<template>
    <div class="row">
      <!-- {{getAllQuestion}} -->
        <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2" 
             v-for="(item,index) in getAllQuestion" :key="item._id" >
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h2>{{item.title}}</h2>
              </div>
              <div class="panel-body">
                  <div>
                    <legend><h3>Author:  {{item.id_user[0].username}}</h3></legend>
                  </div>
                  <div>
                    <p>{{item.content}}</p>
                  </div>
                  <div class="col-sm-12">
                    <button class="btn btn-default fa fa-thumbs-up">
                    {{item.vote_up.length}}</button>
                    <button class="btn btn-default fa fa-thumbs-down">
                    {{item.vote_down.length}}</button>
                    <router-link to="/edit">
                      <button 
                      v-if = "userData.id == item.id_user[0]._id"
                      class="btn btn-info fa fa-pencil-square-o"
                      @click="updateQuestion(item,index,item.id_user[0]._id,item._id)">
                      EDIT
                      </button>
                    </router-link>
                    <button 
                    v-if = "userData.id == item.id_user[0]._id"
                    class="btn btn-danger fa fa-trash-o"
                    @click="deleteQuestion(index,item.id_user[0]._id,item._id)">
                    DELETE
                    </button>
                    <router-link to="/answer">
                      <button 
                      @click="answerQuestion(item,index)"
                      class="btn btn-primary fa fa-reply">
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
export default {
  data () {
    return {
    }
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
      // 'updateData',
      'deleteData'
    ]),
    deleteQuestion (index, userId, questionId) {
      this.deleteData([userId, questionId])
      this.getAllQuestion.splice(index, 1)
    },
    updateQuestion (objQuestion, index, userId, questionId) {
      alert('masuk update')
      this.formEdit.title = objQuestion.title
      this.formEdit.content = objQuestion.content
      this.formEdit.userId = userId
      this.formEdit.questionId = questionId
      this.formEdit.fromRouter = '/'
    },
    answerQuestion (objQuestion, index) {
      // this.$swal(JSON.stringify(objQuestion))
      alert(JSON.stringify(objQuestion))
      this.formEdit.title = objQuestion.title
      this.formEdit.content = objQuestion.content
      this.formEdit.userId = objQuestion.id_user
      this.formEdit.questionId = objQuestion._id
      this.formAns.userId = objQuestion.id_user
      this.formAns.questionId = objQuestion._id
      this.formAns.fromRouter = '/'
      alert(JSON.stringify(this.formAns))
    }
  },
  mounted: function () {
    this.getData()
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
h2, h3 {
  margin-top: 10px;
}
</style>


