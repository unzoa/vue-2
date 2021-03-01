<template>
  <div class="v-echart">
    <p v-if="!Object.keys(options).length">无数据</p>

    <div
      :class="className"
      class="no-print"
      style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script type="text/javascript">
// eslint-disable-next-line
import world from 'echarts/map/js/world'
export default {
  name: 'VEchart',
  props: ['className', 'options', 'notClearBol'],
  data () {
    return {
      vEchart: {}
    }
  },
  watch: {
    options (op) {
      if (Object.keys(op).length) {
        this.draw(op)
      }
    }
  },
  methods: {
    draw (op) {
      // line等  图形移动加载，非重新渲染
      if (!this.notClearBol) {
        this.vEchart.clear()
      }

      this.vEchart.setOption(op)
      this.$emit('chart', this.vEchart)

      // if (this.$route.path === '/GeneHeatmap') {
      //   this.vEchart.resize() // 渲染时没有动画,所以暂时注释
      // }

      window.addEventListener(
        'resize',
        this.$utils.debounce(() => {
          this.vEchart.resize()
        }).bind(this)
      )
    }
  },
  mounted () {
    this.vEchart = this.$echarts.init(document.querySelector('.' + this.className))

    if (Object.keys(this.options).length) {
      this.draw(this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-echart {
    position: relative;
    height: 100%;
    width: 100%;
    p {
      position: absolute;

      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0;

      text-align: center;
      color: #C0C4CC;
      font-size: 30px;
    }
  }

  @media print {
    .no-print {
      display: none;
    }
  }
</style>
