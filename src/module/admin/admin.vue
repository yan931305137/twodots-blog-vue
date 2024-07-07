<template>
  <div>
    <admin_navigate></admin_navigate>
    <div class="ui attached pointing menu">
      <div class="ui container">
        <div class="right menu">
          <a href="/admin/blog" class="item">新增</a>
          <a href="/admin" class="active item">管理</a>
        </div>
      </div>
    </div>

    <!--主页-->
    <div class="index-footer-big">
      <div class="ui container">
        <div id="table-container">
          <table class="ui table">
            <thead>
            <tr>
              <th></th>
              <th>
                <input type="checkbox" v-model="selectAll" @change="selectAllBlogs">
              </th>
              <th>id</th>
              <th>标题</th>
              <th></th>
              <th>推荐</th>
              <th>状态</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="blog in blogs" :key="blog.blog_id">
              <th></th>
              <td>
                <input type="checkbox" v-model="selectedBlogs" :value="blog.blog_id">
              </td>
              <td>{{ blog.blog_id }}</td>
              <td style="width: 100px">{{ truncateText(blog.blog_title) }}</td>
              <td></td>
              <td v-if="blog.blog_release">推荐</td>
              <td v-else>未推荐</td>
              <td v-if="blog.blog_release">发布</td>
              <td v-else>保存</td>
              <td>{{ blog.blog_update_time }}</td>
              <td>
                <a :href="'/admin/blog?id=' + blog.blog_id" class="ui mini teal basic button">编辑</a>
                <a href="/admin" @click="delBlog(blog.blog_id)" class="ui mini red basic button">删除</a>
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <th colspan="9">
                <div v-if="selectedBlogs.length > 0" @click="batchDelete()" class="ui mini red basic button" style="margin:2.5px 0 0 0!important;">批量删除</div>
                <div class="ui mini right floated pagination menu">
                  <p v-if="page > 1" @click="previousPage()" class="item" >上一页</p>
                  <p v-if="page < totalPages" @click="nextPage()" class="item">下一页</p>
                </div>
              </th>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import admin_navigate from "../../components/admin_navigate";

export default {
  name: "admin",
  data() {
    return {
      blogs: [],
      page: 1,
      size: 0,
      selectedBlogs: [], // 存储选中的博客 id
      selectAll: false // 控制全选复选框状态
    }
  },
  components: {
    admin_navigate,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.size / 8); // 每页显示8条数据，计算总页数
    }
  },
  methods: {
    truncateText(text) {
      const maxLength = 8;
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) +"..";
      }
      return text;
    },
    getBlogs(index) {
      this.page = index || this.page;
      this.$http.get(this.$base_url + "/blogs/admin/page/" + this.page).then((res) => {
        this.blogs = res.data.data;
        this.size = res.data.other;
      });
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.selectedBlogs = []; // 清空选中的博客条目
        this.selectAll = false; // 清空全选复选框状态
        this.getBlogs(this.page);
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.selectedBlogs = []; // 清空选中的博客条目
        this.selectAll = false; // 清空全选复选框状态
        this.getBlogs(this.page);
      }
    },
    delBlog(delId) {
      if (confirm('确定要删除吗?') === true) {
        this.$http.delete(this.$base_url + "/blogs/admin/" + delId).then((res) => {
          if (res.data.code === 200) {
            this.$router.go(0);
          }
        });
      }
    },
    batchDelete() {
      if (confirm('确定要批量删除选中的博客吗?') === true) {
        this.selectedBlogs.forEach(blogId => {
          this.$http.delete(this.$base_url + "/blogs/admin/" + blogId).then((res) => {
            if (res.data.code === 200) {
              // 批量删除成功后刷新页面
              this.$router.go(0);
            }
          });
        });
      }
    },
    selectAllBlogs() {
      if (this.selectAll) {
        this.selectedBlogs = this.blogs.map(blog => blog.blog_id);
      } else {
        this.selectedBlogs = [];
      }
    }
  },
  watch: {
    // 监听 selectedBlogs 数组的变化，更新全选复选框状态
    selectedBlogs(newVal, oldVal) {
      if (newVal.length === this.blogs.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    }
  },
  created() {
    this.getBlogs();
  }
}
</script>

<style scoped>

</style>
