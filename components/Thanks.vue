<template>
  <div class="thanks">
    <div class="thanks--inner">
      <svg @click="$store.commit('setThanks', false)" class="thanks--close" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_31_2381)"><path d="M28.6663 19.333L19.333 28.6663M19.333 19.333L28.6664 28.6663" stroke="#0E0E11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><rect x="1" y="1" width="46" height="46" rx="23" stroke="#0E0E11" stroke-width="2"/><defs><clipPath id="clip0_31_2381"><rect width="16" height="16" fill="white" transform="translate(16 16)"/></clipPath></defs></svg>
      <div class="thanks--box">

        <svg v-if="winWidth > 991" class="thanks--bg" width="1276" height="502" viewBox="0 0 1276 502" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1276 92.9508V247.616C1276 252.801 1273.36 257.343 1269.54 258.704L641.218 500.76C639.091 501.58 636.846 502 634.567 502C623.506 502 589.482 502 588.833 502H8.75793C3.92333 502 0 496.85 0 490.504V11.4962C0 5.15 3.92333 0 8.75793 0H762.262L957 502H1135.05V81.5055L1267.24 81.4546C1272.07 81.4546 1275.99 86.6046 1275.99 92.9508H1276Z" fill="#41A280"/></svg>
        <svg v-else class="thanks--bg" width="311" height="360" viewBox="0 0 311 360" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M311 66.6579V177.573C311 181.292 310.356 184.548 309.427 185.524L209.94 357.511C209.049 359.051 207.412 360 205.632 360C193.091 360 143.681 360 143.516 360H2.13457C0.956236 360 0 356.307 0 351.756V8.24428C0 3.69323 0.956236 0 2.13457 0H204.462L247.984 360H272.918V58.4136H308.864C310.042 58.4136 310.999 62.1069 310.999 66.6579H311Z" fill="#41A280"/></svg>

        <h2>Thanks</h2>
        <h4>We have received your message</h4>
        <button @click="$store.commit('setThanks', false)" class="link link-white">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.65674 11.6562L1.4141 7.41361L-0.000115871 5.9994L1.4141 4.58518L5.65674 0.342542L7.07095 1.75676L3.67684 5.15087L9.89938 4.58518L9.89938 7.41361L3.67684 6.84792L7.07095 10.242L5.65674 11.6562Z" fill="#FAFAFA"/></svg>
          Back to the main page
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      winWidth: 1440
    }
  },
  mounted(){
    this.winWidth = window.innerWidth
    window.addEventListener('resize', e => this.winWidth = window.innerWidth)
  }
}
</script>

<style lang="scss" scoped>
.thanks{
  background: rgba(#0E0E11, .7);
  position: fixed;
  left: 0; top: 0;
  height: 100vh;
  width: 100%;
  z-index: 999;
  padding: 16px;
  @media(min-width:992px){
    padding: 50px;
  }
  &--inner{
    background: var(--bg-white);
    border-radius: 12px;
    max-width: 1340px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 112px 16px 163px;
    @media(min-width:992px){
      padding: 74px 32px;
    }
  }
  &--close{
    position: absolute;
    top: 24px; right: 24px;
  }
  &--box{
    position: relative;
    width: 100%;
  }
  &--bg{
    display: block;
    width: 100%;
    height: auto;
  }
  h2{
    font-weight: 600;
    font-size: 32px;
    line-height: 115%;
    text-align: center;
    color: var(--text-white);
    position: absolute;
    left: 16px; top: 16px;
    @media(min-width:992px){
      font-size: 84px;
      left: 24px; top: 24px;
    }
  }
  h4{
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: var(--text-white);
    position: absolute;
    bottom: 16px; left: 16px;
    width: 135px;
    text-align: left;
    @media(min-width:992px){
      bottom: 24px; left: 24px;
      width: auto;
    }
  }
  .link{
    position: absolute;
    left: 0;
    @media(max-width:991px){
      color: var(--brand-green);
      top: calc(100% + 32px);
      svg{
        path{
          fill: var(--brand-green);
        }
      }
    }
    @media(min-width:992px){
      bottom: 24px;
      left: 35.5%;
    }
  }
}
</style>