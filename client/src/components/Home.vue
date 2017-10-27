<template>
<div>
    <Navbar 
    @openLogin="allQuestion=false, loginForm=true, signUpForm=false, postQuestion= false, editForm=false"
    @openSignUp="allQuestion=false, signUpForm=true, loginForm=false, postQuestion= false, editForm=false" 
    @showHome="allQuestion=true, signUpForm=false, loginForm=false, postQuestion= true, editForm=false"
    @showUserQuestion="allQuestion=false, postQuestion= false, editForm=false"
    ></Navbar>
    <div class="row" v-if="userData.username && userData.username != 'undefined' ">
      <legend class="col-md-6 col-md-offset-3" style="color:black">
        <h1  class="hello"> Hello : {{userData.username}} !</h1>
      </legend>
    </div>
    <PostQuestion v-if="postQuestion"></PostQuestion>
    <Login v-if="loginForm" @closeLogin="allQuestion=true, loginForm=false, postQuestion= true"></Login>
    <SignUp v-if="signUpForm" @closeSignUp="allQuestion=true, signUpForm=false, postQuestion= true"></SignUp>
    <!-- <EditQuestion v-if="editForm"></EditQuestion> -->
    <router-view 
    v-if="!loginForm && !signUpForm"
    ></router-view>
</div>
</template>


<script>
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Navbar from '@/components/Navbar'
// import Question from '@/components/Question'
// import Allquestion from '@/components/Allquestion'
import EditQuestion from '@/components/EditQuestion'
import PostQuestion from '@/components/PostQuestion'
import QuestionDetail from '@/components/QuestionDetail'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      // allQuestion: true,
      loginForm: false,
      signUpForm: false,
      postQuestion: true,
      editForm: false
    }
  },
  components: {
    Navbar,
    QuestionDetail,
    // Allquestion,
    Login,
    SignUp,
    // Question,
    PostQuestion,
    EditQuestion
  },
  computed: {
    ...mapState({
      dataLogin: 'loginStatus',
      userData: 'userData'
    })
  },
  methods: {
    ...mapActions([
      'getData',
      'checkLogin'
    ])
  },
  mounted () {
    this.getData()
    if (localStorage.token) {
      this.checkLogin()
    }
    if (this.dataLogin.status === false) {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.hello {
  background-image: linear-gradient(to right, red, orange 20%, brown);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

