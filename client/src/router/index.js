import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Answer from '@/components/Answer'
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Question from '@/components/Question'
import Allquestion from '@/components/Allquestion'
// import PostQuestion from '@/components/PostQuestion'
import EditQuestion from '@/components/EditQuestion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/edit',
      name: 'Edit',
      component: EditQuestion
    },
    {
      path: '/answer',
      name: 'Answer',
      component: Answer
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Allquestion',
          component: Allquestion
        },
        {
          path: ':id/edit/:questionRouter', // myquestion
          name: 'EditParams',
          component: EditQuestion,
          props: true
        },
        {
          path: 'answer/:id', // myquestion
          name: 'AnswerParams',
          component: Answer,
          props: true
        },
        {
          path: ':id/', // myquestion
          name: 'QuestionUser',
          component: Question,
          props: true
        }
      ]
    }
  ]
})

// / --> Home
// /edit --> question denny
// /denny/edit --> edit questionnya denny
