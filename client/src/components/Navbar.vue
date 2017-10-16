<template>
  <div>
    <div class="ui large menu">
  <a class="active item">
    Home
  </a>
  <a class="item">
    Messages
  </a>
  <div class="right menu">
    <div class="item">
        <div class="ui primary button">Sign In</div>
    </div>
    <div class="item">
        <div class="ui primary button">Sign Up</div>
    </div>
    </div>
  </div>
      <Login />
      <Signup />
  </div>
</template>

<script>
import Login from '@/components/Login'
import Signup from '@/components/Signup'
export default {
  components: {
    Login,
    Signup
  }
}
</script>

<style>
</style>
