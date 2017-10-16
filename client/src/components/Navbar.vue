<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
            <span class="sr-only">Toggle navigation</span>
          </button>
          <a class="navbar-brand" href="#">Home</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
          <ul class="nav navbar-nav navbar-right">
            <li><a class="user" data-toggle="modal" data-target="#myModalSignin">Sign In</a></li>
            <li><a class="user" data-toggle="modal" data-target="#myModalSignout">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <Login id="myModalSignin" class="modal fade" role="dialog"></login>
    <Signup id="myModalSignout"  class="modal fade" role="dialog"></Signup>
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
a:hover{
  cursor:pointer;
}
</style>
