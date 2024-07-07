<template>
  <div id="side-bar" class="side-bar" ref="sideBar">
    <h2>文章目录</h2>
    <div class="ui" ref="ui">
      <ul>
        <li v-for="(section, index) in contents" :key="index">
          <a :href="'#section-' + index" :style="{ 'font-size': getTitleFontSize(section.level), 'margin-left': getIndentation(section.level) }">{{ truncate(section.title, 30) }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: Array // 接收文章内容生成的目录列表
  },

  methods: {
    getTitleFontSize(level) {
      const baseFontSize = 1.1; // 基础字体大小
      const fontSizeIncrement = 0.1; // 每级增加的字体大小
      return `${baseFontSize + (level - 1) * fontSizeIncrement}em`;
    },
    getIndentation(level) {
      const baseIndentation = 10; // 基础缩进像素
      const indentationIncrement = 10; // 每级增加的缩进像素
      return `${baseIndentation + (level - 1) * indentationIncrement}px`;
    },
    truncate(text, length) {
      if (text.length > length) {
        return text.slice(0, length) + '...';
      }
      return text;
    }
  }
};
</script>

<style scoped>
.side-bar {
  position: fixed;
  top: 155px;
  left: 110px;
  height: 83vh;
  width: 280px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ui {
  overflow-y: auto; /* 添加滚动条 */
  height: 77vh;
}

.side-bar h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
}

.ui ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.ui ul li {
  margin-bottom: 10px; /* Increase spacing between items */
}

.ui ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px; /* Add padding for better hover effect */
}

.ui ul li a:hover {
  color: #333; /* Change color on hover */
  background-color: rgba(0, 0, 0, 0.05); /* Add a subtle background color on hover */
}
</style>
