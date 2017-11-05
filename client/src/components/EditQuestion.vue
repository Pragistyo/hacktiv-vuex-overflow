<template>
  <div id="editQ" >
    <div class="row">
      <!-- <p>{{ singleQuestion._id }}</p> -->
        <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 transparent">
            <form v-on:submit.prevent="update" class="form-horizontal">
              <fieldset>
                  <label class="pull-left" style="font-size:22px; padding-top:20px; text-decoration:underline"> Edit Question: </label><br>
                  <button 
                  type="submit"
                  class="btn btn-info pull-right"
                  @click=""
                  >EDIT
                  </button><br><br>
                  <label class="pull-left" for="titleQ" style="padding-top:10px;"> Title Question: </label>
                  <input v-model="singleQuestion.title" class="form-control" type="text" id="titleQ" placeholder="title" style="color:teal;" required></input><br>  
                  <label class="pull-left"> Description: </label>
                  <textarea  v-model="singleQuestion.content" class="form-control" type="text" placeholder="Question Description" value = "test value" style="color:teal;" required></textarea><br>
              </fieldset>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import {mapState, mapActions} from 'vuex'
export default {
  props: ['questionRouter'],
  data () {
    return {
    }
  },
  components: {
    Navbar
  },
  computed: {
    ...mapState({
      userData: 'userData',
      loginStatus: 'loginStatus',
      formEdit: 'formEdit',
      singleQuestion: 'singleQuestion'
    })
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'updateData',
      'getSingleQuestion'
    ]),
    update () {
      this.updateData([this.singleQuestion, this.formEdit.fromRouter])

      if (this.formEdit.fromRouter === `/${this.userData.username}`) {
        this.$router.push(`/${this.userData.username}`)
      } else {
        this.$router.push(`/answer/${this.singleQuestion._id}`)
      }
      this.clear()
    },
    clear () {
      this.formEdit.fromRouter = null
      this.singleQuestion = {}
    }
  },
  mounted: function () {
    if (localStorage.token) {
      this.checkLogin()
    } else {
      this.$router.push('/')
    }
  },
  watch: {
    userData: function (pengenCepetLulus) {
      this.getSingleQuestion(this.questionRouter)
    }
  }
}
</script>
<style scoped>
.transparent{    
    background-color: rgba(0,0,0,0.15);
}
</style>


