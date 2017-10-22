<template>
  <div>
    <Navbar></Navbar>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2">
            <form v-on:submit.prevent="bla" class="form-horizontal">
              <fieldset>
                  <label class="pull-left" style="font-size:22px; padding-top:20px; text-decoration:underline"> Edit Question: </label><br>
                  <button 
                  type="submit"
                  class="btn btn-info pull-right"
                  @click="update()"
                  >EDIT
                  </button><br><br>
                  <label class="pull-left" for="titleQ" style="padding-top:10px;"> Title Question: </label>
                  <input v-model="formEdit.title" class="form-control" type="text" id="titleQ" placeholder="title" style="color:teal;" required></input><br>  
                  <label class="pull-left"> Description: </label>
                  <textarea  v-model="formEdit.content" class="form-control" type="text" placeholder="Question Description" value = "test value" style="color:teal;" required></textarea><br>
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
  data () {
    return {
      // formEdit: {
      //   title: null,
      //   content: null
      // }
    }
  },
  components: {
    Navbar
  },
  computed: {
    ...mapState({
      userData: 'userData',
      loginStatus: 'loginStatus',
      formEdit: 'formEdit'
    })
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'updateData'
    ]),
    update () {
      // alert('masuk edit')
      // alert(JSON.stringify(this.formEdit))
      this.updateData(this.formEdit)
      if (this.formEdit.fromRouter === '/') {
        this.$router.push('/')
      } else if (this.formEdit.fromRouter === `/${this.userData.username}`) {
        this.$router.push(`/${this.userData.username}`)
      }
      this.clear()
    },
    clear () {
      this.formEdit.title = null
      this.formEdit.content = null
      this.formEdit.userId = null
      this.formEdit.questionId = null
      this.formEdit.fromRouter = null
    }
  },
  mounted: function () {
    if (localStorage.token) {
      this.checkLogin()
    }
    if (this.loginStatus.status === false) {
      this.$router.push('/')
    }
  },
  watch: {
  }
}
</script>

