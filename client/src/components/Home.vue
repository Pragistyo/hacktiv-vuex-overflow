<template>
<div>
    <Navbar 
    @openLogin="allQuestion=false, loginForm=true, signUpForm=false, postQuestion= false"
    @openSignUp="allQuestion=false, signUpForm=true, loginForm=false, postQuestion= false" 
    @showHome="allQuestion=true, signUpForm=false, loginForm=false, postQuestion= true"
    @showUserQuestion="allQuestion=false, postQuestion= false"
    ></Navbar>
    <h1 v-if="userData.username && userData.username != 'undefined' " class="hello"> Hello {{userData.username}}</h1>
    <PostQuestion v-if="postQuestion"></PostQuestion>
    <Allquestion v-if="allQuestion"></Allquestion>
    <Login v-if="loginForm" @closeLogin="allQuestion=true, loginForm=false, postQuestion= true"></Login>
    <SignUp v-if="signUpForm" @closeSignUp="allQuestion=true, signUpForm=false, postQuestion= true"></SignUp>
    <!-- <button @click="allQuestion=false, loginForm=true">test</button> -->
    <!-- <button @click="allQuestion=true, loginForm=false">balikin</button> -->
    <!-- <router-link :to="userData.id"></router-link> -->
    <router-view></router-view>
    <!-- <SignUp></SignUp> -->
</div>
</template>


<script>
import Question from '@/components/Question'
import PostQuestion from '@/components/PostQuestion'
import SignUp from '@/components/Signup'
import Navbar from '@/components/Navbar'
import Login from '@/components/Login'
import Allquestion from '@/components/Allquestion'
import QuestionDetail from '@/components/QuestionDetail'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      allQuestion: true,
      loginForm: false,
      signUpForm: false,
      postQuestion: true
    }
  },
  components: {
    Navbar,
    QuestionDetail,
    Allquestion,
    Login,
    SignUp,
    Question,
    PostQuestion
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
  }
}
</script>
<style>
.hello {
  background-image: linear-gradient(to right, red, orange 50%, brown);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

