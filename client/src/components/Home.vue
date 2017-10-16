<template>
<div>
  <Navbar />
  <router-view></router-view>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import QuestionDetail from '@/components/QuestionDetail'
import { mapActions } from 'vuex'
export default {
  components: {
    Navbar,
    QuestionDetail
  },
  methods: {
    ...mapActions([
      'getData'
    ])
  },
  mounted () {
    this.getData()
  }
}
</script>
