<template>
  <section class="partners">
    <div class="container">
      <div class="partners__list">
        <div class="partners__item" v-for="item in list">
          <h3>{{ item.firstName }} {{ item.lastName }}</h3>
          <p>email: <span>{{ item.email }}</span></p>
          <p>phone: <span>{{ item.phone }}</span></p>
          <p>notes: <span>{{ item.notes }}</span></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      list: null,
    }
  },
  mounted(){
    this.$axios.get(`${process.env.API}/db`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(dbResult => {
        this.list = dbResult.data
      })
  }
}
</script>

<style lang="scss" scoped>
.partners{
  padding-bottom: 100px;
  &--inner{
    max-width: 700px;
    background: var(--bg-white);
    box-shadow: 0 0 16px var(--bg-gray);
    border-radius: 12px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding: 20px 15px;
  }
  h3{
    font-weight: 600;
    font-size: 18px;
    line-height: 1.3;
    color: var(--text-black);
    margin-bottom: 10px;
  }
  p{
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: var(--text-black);
    margin-bottom: 5px;
  }
}
</style>
