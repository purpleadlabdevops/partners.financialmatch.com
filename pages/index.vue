<template>
  <section class="quiz">
    <div class="quiz--inner">
      <div class="quiz--item">
        <h1>Financial Match Referral Partner Program</h1>
        <p>Contact us today to help qualified business owners get up to $26,000 per employee through the largest IRS Grant in history. The Employee Retention Credit program has helped business owners who were affected by global Pandemic.</p>
        <p>A representative from our team will be in touch to share more details on our program options.</p>
        <form class="quiz--form" @submit.prevent="submit">
          <div class="field">
            <input type="text" v-model="data.firstName" id="firstname" placeholder="First name" required />
          </div>
          <div class="field">
            <input type="text" v-model="data.lastName" id="lastname" placeholder="Last name" required />
          </div>
          <div class="field">
            <input type="email" v-model="data.email" id="email" placeholder="Email" required />
          </div>
          <FieldTel />
          <div class="field">
            <textarea type="email" v-model="data.notes" id="notes" placeholder="Notes" />
          </div>
          <div class="field">
            <input type="submit" value="Submit" :disabled="spinner || notValid" />
          </div>
        </form>
        <div class="spinner" v-if="spinner">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" />
          </svg>
        </div>
        <div class="quiz--thanks" v-if="thanks">Thank you! We will contact you shortly.</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      data: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        notes: null,
      },
      spinner: false,
      notValid: true,
      thanks: false,
    }
  },
  methods: {
    submit(e){
      e.preventDefault()
      this.spinner = true
      this.$axios.post(`${process.env.API}/db`, {
        headers: { 'Content-Type': 'application/json' },
        params: this.data
      })
        .then(dbResult => {
          console.log('dbResult----------')
          console.dir(dbResult)
          this.$axios.post(`${process.env.API}/email`, {
            headers: { 'Content-Type': 'application/json' },
            params: this.data
          })
        })
        .then(emailResult => {
          console.log('emailResult----------')
          console.dir(emailResult)
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(()=>{
          this.spinner = false
          this.thanks = true
          this.data.firstName = null
          this.data.lastName = null
          this.data.email = null
          this.data.phone = null
          this.data.notes = null
          setTimeout(()=> {
            this.thanks = false
          }, 5000)
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.quiz{
  padding-bottom: 100px;
  &--inner{
    max-width: 700px;
    background: var(--bg-white);
    box-shadow: 0 0 60px var(--bg-gray);
    border-radius: 12px;
    min-height: calc(100vh - 100px);
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 60px 30px;
  }
  h1{
    margin: 0 auto;
    font-weight: 600;
    font-size: 20px;
    line-height: 130%;
    text-align: center;
    color: var(--text-black);
    margin-bottom: 16px;
    @media(min-width:768px){
      font-size: 32px;
    }
  }
  &--thanks{
    margin: 0 auto;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: var(--text-black);
    margin-bottom: 16px;
    @media(min-width:768px){
      font-size: 22px;
    }
  }
  &--form{
    margin: 0 auto 40px;
    padding-top: 8px;
    @media(min-width:992px){
      width: 332px;
    }
  }
  p{
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: var(--text-black);
    margin-bottom: 15px;
    text-align: center;
  }
}

.spinner {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  svg {
    width: 50%;
    max-width: 10rem;
    animation: rotate 3.6s linear infinite;
  }
  circle {
    fill: none;
    stroke: #106b70;
    stroke-width: 8px;
    stroke-dasharray: 300;
    animation: outline 2s cubic-bezier(0.77, 0, 0.18, 1) infinite;
  }
}

@keyframes outline {
  0% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 300;
  }
  100% {
    stroke-dashoffset: 600;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(-1turn);
  }
}
</style>
