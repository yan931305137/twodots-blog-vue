<template>
  <div>
    <navigate></navigate>
    <div class="blog-container index-footer-big">
      <div class="ui container">
        <div class="ui stackable grid">
          <!--左列表-->
          <div class="wide column">
            <div id="ps">
              <ul>
                <li class="photoLi" v-for="(photo, index) in photos"
                    :key="index">
                  <img :src="service_url + '/photoImg/' + photo.photo_save_name" :alt="photo.photo_introduction" style="height: 100%;"/>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="ui bottom attached segment">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <p v-if="page > 1" @click="previousPage()" class="ui mini blue basic button">上一页</p>
            </div>
            <div class="right aligned column">
              <p v-if="page < size/25" @click="nextPage()" class="ui mini blue basic button">下一页</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navigate from "../../components/navigate";

  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';

  export default {
    name: "photos",
    components:{
      navigate,
    },
    data() {
      return {
        photos: [],
        page: 1,
        size: 0,
        service_url: this.$base_url

      };
    },
    methods: {
      getPhotos(index) {
        this.page = index || this.page
        this.$http.get(this.$base_url + "/albums/" + this.$route.query.id + "/page/" + this.page).then((res)=>{
          this.photos = res.data.data;
          this.size = res.data.other;
          this.$nextTick(() => {
            this.ViewerShow();
          });
        });


      },

      nextPage() {
        this.page++;
        this.getPhotos(this.page)
      },

      previousPage() {
        this.page--;
        this.getPhotos(this.page)
      },

      ViewerShow() {
        const ViewerDom = document.getElementById('ps');
        const viewer = new Viewer(ViewerDom, {
          // 配置
          show: function (){
            viewer.update();
          },

        });
      }
    },

    created() {
      this.getPhotos();
    },
  };

</script>

<style scoped>
  ul {
    list-style:none;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin:auto;
  }
  .photoLi {
    height: 190px;
    margin: 2px;
  }

</style>
