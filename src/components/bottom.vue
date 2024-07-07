<template>
  <div>
    <footer class="footer">
      <span>@XXXX</span>
      <span style="margin-left: 30px">by:XXXX</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}

.footer span {
  color: gray;
}
</style>
