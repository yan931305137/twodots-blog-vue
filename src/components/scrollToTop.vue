<template>
  <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop">
    ⬆️ Top
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    handleScroll() {
      this.isVisible = window.scrollY > 0;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
