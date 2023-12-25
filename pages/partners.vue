<template>
  <section class="partners">
    <div class="container">
      <div class="partners__list" v-if="list">
        <div class="partners__item" v-for="item in list.slice().reverse()">
          <h3>{{ item.referrerName }}</h3>
          <p>Referrer Phone: <span>{{ item.referrerPhone }}</span></p>
          <p>Referrer Email: <span>{{ item.referrerEmail }}</span></p>
          <p>Referral Company Name: <span>{{ item.referralCompanyName }}</span></p>
          <p>Referral Email: <span>{{ item.referralEmail }}</span></p>
          <p>Referral Phone: <span>{{ item.referralPhone }}</span></p>
          <button @click="remove(item.ID)">×</button>
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
  methods: {
    remove(id){
      this.$axios.post(`${process.env.API}/db-remove`, {
        headers: { 'Content-Type': 'application/json' },
        params: {id: id}
      })
        .then(dbResult => {
          console.dir(dbResult);
          window.location.reload(true)
        })
    }
  },
  mounted(){
    this.$axios.get(`${process.env.API}/db`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(dbResult => {
        this.list = dbResult.data
      })
  },
  beforeCreate(){
    if(this.$route.query.password !== 'partners!#$%@'){
      // this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.partners{
  padding-top: 60px;
  padding-bottom: 60px;
  &__item{
    max-width: 400px;
    background: var(--bg-white);
    box-shadow: 0 0 16px var(--bg-gray);
    border-radius: 12px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding: 20px 15px;
    margin-bottom: 30px;
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
    span{
      font-weight: 600;
      font-size: 16px;
    }
  }
  button{
    background: var(--brand-red);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: var(--text-white);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
  }
}
</style>
