<template>
  <nav class="ui inverted grey attached segment index-navigation-mini">
    <div class="ui container">
      <div class="ui inverted grey secondary stackable menu">
        <h2 class="ui teal header item">TwoDots后台管理</h2>
        <a href="/admin" class="nav-item item index-mobile" ><i class="home icon"></i>文章</a>
        <a href="/admin/types" class="nav-item item index-mobile" ><i class="th icon"></i>分类</a>
        <a href="/admin/albums" class="m-item item index-mobile"><i class="camera retro icon"></i>相册</a>
        <div class="right nav-item index-mobile menu">
          <div class="ui dropdown item">
            <div class="text">
              <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.R8XzWNsrQ2FfQA_qFeJEuQHaHa?rs=1&pid=ImgDetMain" alt="" class="ui avatar image">
            </div>
            <a @click="signOut()" >注销</a>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
    export default {
      name: "admin_navigate",
      methods: {
        signOut() {
          if (confirm('确定要注销吗?') === true) {
            localStorage.removeItem('token')
            this.$router.go(0);
          }
        }
      },
      created() {

      }

    }
</script>

<style scoped>

</style>
