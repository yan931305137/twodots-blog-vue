<template>
  <div class="ui container full-height">
    <div class="ui middle aligned center aligned grid full-height">
      <div class="column">
        <h2 class="ui blue image header">
          <div class="content">
            TwoDots-Blog后台管理
          </div>
        </h2>
        <div class="ui large form" method="post" action="#">
          <div class="ui segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" v-model="name_password.user_name" placeholder="username">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" v-model="name_password.user_password" placeholder="Password">
              </div>
            </div>
            <button @click="login()" class="ui fluid large blue submit button">登 录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      name_password: {
        user_name: "",
        user_password: ""
      },
      error: {}
    };
  },
  methods: {
    login() {
      this.$http.post(this.$base_url + "/login", this.name_password).then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('token', res.data.data.token);
          this.$router.replace('/admin');
        } else {
          this.error.code = res.data.code;
          this.error.message = res.data.message;
          localStorage.removeItem('token');
          if (confirm(this.error.message) === true) {
            this.$router.go(0);
          }
        }
      });
    },
  },
  created() {}
};
</script>

<style scoped>
.full-height {
  height: 100vh;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>
