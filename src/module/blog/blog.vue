<template>
  <div>
    <navigate></navigate>
    <div class="blog-container index-footer-big index-text">
      <div class="ui container" style="width: 100%">
        <!-- 头部 -->
        <div class="ui top attached segment" style="width: 70%;margin-left: 390px">
          <div class="ui grid">
            <div class="eleven wide column">
              <div class="ui horizontal link list" style="text-align: center !important;">
                <div class="item">
                  <img src="@/assets/image/avator.jpg" alt="" class="ui avatar image">
                  <div class="content">wsscg</div>
                  <i class="calender icon"></i><span>{{ blog.blog_update_time }}</span>
                </div>
                <div class="item">
                  <i class="eye icon"></i><span>{{ blog.blog_views }}</span>
                </div>
              </div>
            </div>
            <div class="five wide column">
              <p target="_blank" v-for="tag in blog.types" class="ui blue basic label left">{{ tag.type_tag_name }}</p>
            </div>
          </div>
        </div>
        <div class="ui attached padded segment" style="width: 70%;margin-left: 390px">
          <div>
            <!-- 内容 -->
            <h2 class="ui center aligned header">{{ blog.blog_title }}</h2>
            <div class="markdown-content">
              <mavon-editor
                :value="blog.blog_content"
                defaultOpen="preview"
                :boxShadow="false"
                :editable="false"
                :subfield="false"
                :toolbarsFlag="false"
                :aligncenter="true"
              ></mavon-editor>
            </div>
          </div>
          <!-- 侧边目录 -->
          <div class="ui attached positive message">
            <tableOfContents :contents="contents"></tableOfContents>
          </div>
          <div class="ui bottom attached segment" >
            <!-- 留言 -->
            <div id="comment-container" class="ui blue comments" style="max-width: 100%">
              <div>
                <div class="ui threaded comments">
                  <h3 class="ui dividing header">留言</h3>
                  <div class="comment" v-for="comment in blog_comment" :key="comment.comment_id">
                    <a class="avatar">
                      <img src="@/assets/image/null_avator.jpg" v-if="!comment.comment_admin" alt="">
                      <img src="@/assets/image/avator.jpg" v-if="comment.comment_admin" alt="">
                    </a>
                    <div class="content">
                      <a class="author">
                      <span>{{ comment.comment_nickname }}
                        <div class="ui mini basic blue left pointing label" v-if="comment.comment_admin"
                             style="padding: 0.2em !important;">游客</div>
                      </span>
                      </a>
                      <div class="metadata">
                        <span class="date">{{ comment.comment_create_time }}</span>
                      </div>
                      <div class="text">{{ comment.comment_content }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="comment-form" class="ui form">
              <input type="hidden" name="blog.id">
              <input type="hidden" name="parentComment.id" value="-1">
              <div class="field">
                <textarea v-model="comment.comment_content" placeholder="请输入信息"></textarea>
              </div>
              <div class="fields">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="text" v-model="comment.comment_nickname" placeholder="请输入名称">
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="mail icon"></i>
                    <input type="text" v-model="comment.comment_email" placeholder="请输入邮箱">
                  </div>
                </div>
                <div class="field" style="margin-top: 5px">
                  <button type="button" @click="postComment" class="ui blue button"><i class="edit icon"></i> 提交
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigate from "../../components/navigate";
import tableOfContents from "../../components/tableOfContents.vue";

export default {
  name: "blog",
  components: {
    navigate,
    tableOfContents
  },
  data() {
    return {
      blog: {},
      blog_comment: [],
      comment: {
        comment_nickname: '',
        comment_email: '',
        comment_content: ''
      },
      contents: [] // 存储内容列表
    };
  },
  methods: {
    parseContent(content) {
      this.contents = []; // 清空旧内容
      const regex = /^#+\s+(.*)/gm;
      let match;
      let index = 0;
      while ((match = regex.exec(content)) !== null) {
        this.contents.push({
          title: match[1],
          id: `section-${index}`
        });
        index++;
      }
      return this.contents;
    },
    async findBlog() {
      try {
        const res = await this.$http.get(this.$base_url + "/blogs/" + this.$route.query.id);
        this.blog = res.data.data;
        this.parseContent(this.blog.blog_content);
        this.findComment();
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    },
    async findComment() {
      try {
        const res = await this.$http.get(this.$base_url + "/comment/" + this.$route.query.id);
        this.blog_comment = res.data.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async postComment() {
      this.comment.blog_id = this.$route.query.id;
      if (this.comment.comment_content.trim()) {
        if (!this.comment.comment_nickname) {
          this.comment.comment_nickname = "未知朋友";
        }
        try {
          await this.$http.post(this.$base_url + "/comment/", this.comment);
          this.$router.go(0);
        } catch (error) {
          console.error("Error posting comment:", error);
        }
      } else {
        alert('内容不能为空！！！');
      }
    }
  },
  created() {
    this.findBlog();
  }
};
</script>

<style scoped>

</style>
