import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Question from '@/components/Question'
import newQuestion from '@/components/NewQuestion'
import DetailQuestion from '@/components/myquestion/DetailQuestion'
import SummaryQuestion from '@/components/myquestion/SummaryQuestion'
import HighlighQuestions from '@/components/home/HighlightQuestions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: HighlighQuestions
        },
        {
          path: ':id',
          component: DetailQuestion,
          props: true
        }
      ]
    },
    {
      path: '/myquestion',
      component: Question,
      children: [
        {
          path: '',
          component: SummaryQuestion
        },
        {
          path: ':id',
          component: DetailQuestion,
          props: true
        }
      ]
    },
    {
      path: '/create-question',
      component: newQuestion
    }
  ]
})
