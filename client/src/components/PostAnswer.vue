<template>
  <div>
      <div class="row">
        <div class="">
            <form v-on:submit.prevent="answerPost()" class="form-horizontal">
              <fieldset>
                  <label class="pull-left" style="font-size:22px; padding-top:20px; text-decoration:underline"> Answer: </label><br>
                  <button 
                  type="submit"
                  class="btn btn-success pull-right"
                  >POST ANSWER
                  </button><br><br>
                  <label class="pull-left"> Description: </label>
                  <textarea v-model="formAns.answer" class="form-control" type="text" placeholder="Answer Description" value = "test value" style="color:teal;" required></textarea><br>
              </fieldset>
          </form>
        </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['id'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      loginStatus: 'loginStatus',
      userData: 'userData',
      formAns: 'formAnswer',
      answerData: 'answerData'
    })
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'postAnswer',
      'getAllAnswer'
    ]),
    answerPost () {
      this.formAns.userId = this.userData.id
      this.formAns.questionId = this.id // this.id === id_question
      this.formAns.username = this.userData.username
      this.postAnswer(this.formAns)
      // this.getAllAnswer(this.id)
      this.clear()
    },
    clear () {
      this.formAns.userId = null
      this.formAns.answer = null
      // this.formAns.questionId = null
    }
  },
  mounted: function () {
    if (localStorage.token) {
      this.checkLogin()
    }
  },
  watch: {
    answerData: function (cpetLulus) {
      this.getAllAnswer(this.id)
    }
  }
}

// const answerSchema = new Schema({
//   id_user: {type: Schema.ObjectId, ref: 'user'},
//   id_question: {type: Schema.ObjectId, ref: 'question'},
//   content: {type: String, required: true},
//   vote_up: [{type: Schema.ObjectId, ref: 'user'}],
//   vote_down: [{type: Schema.ObjectId, ref: 'user'}]
// },
// {timestamps:true})
</script>
<style scoped>
.row {
  margin-bottom:30px;
}
.transparent{    
    background-color: rgba(0,0,0,0.15);
}
</style>




