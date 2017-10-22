<template>
    <div>
      <!-- {{getAllQuestion}} -->
        <div v-for="(item,index) in getAllQuestion" :key="item._id">
            <div class="panel panel-warning">
                <h1>{{item.title}}</h1>
                <legend><h2>Author:  {{item.id_user[0].username}}</h2></legend>
                <p>{{item.content}}</p>
                <button 
                v-if = "userData.id == item.id_user[0]._id"
                class="btn btn-info">
                EDIT
                </button>
                {{item.id_user[0]._id}}<br>
                {{item._id}}
                <button 
                v-if = "userData.id == item.id_user[0]._id"
                class="btn btn-danger"
                @click="deleteQuestion(index,item.id_user[0]._id,item._id)">
                DELETE
                </button>
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
      userData: 'userData'
    })
  },
  methods: {
    ...mapActions([
      'getData',
      'updateData',
      'deleteData'
    ]),
    deleteQuestion (index, userId, questionId) {
      // alert('========= ' + userId)
      this.deleteData([userId, questionId])
      this.getAllQuestion.splice(index, 1)
    }
  },
  mounted: function () {
    this.getData()
  }
}
</script>
<style>

</style>


