<template>
  <div class="quiz">
    <div class="quiz--inner">

      <button class="quiz--back" v-if="step !== 1 && step !== 'not'" @click="answer(false, 1)">
        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.15723 11.6572L1.91459 7.41459L0.500372 6.00037L1.91459 4.58616L6.15723 0.343518L7.57144 1.75773L4.17733 5.15184L10.3999 4.58616L10.3999 7.41459L4.17733 6.8489L7.57144 10.243L6.15723 11.6572Z" fill="#41A280"/></svg>
        Back
      </button>

      <svg @click="$store.commit('setQuiz', false)" class="quiz--close" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_31_2381)"><path d="M28.6663 19.333L19.333 28.6663M19.333 19.333L28.6664 28.6663" stroke="#0E0E11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><rect x="1" y="1" width="46" height="46" rx="23" stroke="#0E0E11" stroke-width="2"/><defs><clipPath id="clip0_31_2381"><rect width="16" height="16" fill="white" transform="translate(16 16)"/></clipPath></defs></svg>

      <div class="quiz--item" v-if="step === 'form'">
        <h3>Enter info below to get your results</h3>
        <form class="quiz--form" @submit.prevent="submit">
          <div class="field">
            <input type="text" v-model="data.firstname" id="firstname" placeholder="First name" required />
          </div>
          <div class="field">
            <input type="text" v-model="data.lastname" id="lastname" placeholder="Last name" required />
          </div>
          <div class="field">
            <input type="text" v-model="data.company" id="company" placeholder="Company" required />
          </div>
          <div class="field">
            <input type="email" v-model="data.email" id="email" placeholder="Email" required />
          </div>
          <!-- <div class="field">
            <input type="tel" v-model="data.phone" id="phone" placeholder="Phone" @input="phoneInput" minlength="8" maxlength="14" required />
          </div> -->
          <FieldTel />
          <div class="field">
            <input type="submit" value="Submit" :disabled="spinner || notValid" />
          </div>
          <input ref="leadid_token" id="leadid_token" name="universal_leadid" type="hidden" />
        </form>
        <p>By clicking “Submit,” I am providing my prior express written consent to be contacted at the above telephone number with offers and marketing communications from Financial Match [if applicable, “and affiliated tax professionals”] via automated telephone dialing and texting systems and artificial or pre-recorded voice (including SMS and MMS) and/or email, even if the telephone number above is on a corporate, state or national Do Not Call list. Consent is not required as a condition to purchase any goods or services.</p>
        <div class="spinner" v-if="spinner">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" />
          </svg>
        </div>
      </div>

      <div class="quiz--item" v-else-if="step === 'not'">
        <h3>You Do Not Qualify for ERC</h3>
        <p>Unfortunately, based on your answers it appears we can not help you at this time</p>
        <button class="link" @click="answer(false, 1)">
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.50098 11.6572L2.25834 7.41459L0.844122 6.00037L2.25834 4.58616L6.50098 0.343518L7.91519 1.75773L4.52108 5.15184L10.7436 4.58616L10.7436 7.41459L4.52108 6.8489L7.91519 10.243L6.50098 11.6572Z" fill="#41A280"/></svg>
          Back to the main page
        </button>
      </div>

      <div class="quiz--item" v-else>
        <h3>{{ items[step].question }}</h3>

        <div class="quiz--options quiz--number" v-if="items[step].options === 'number'">
          <p>number of employees</p>
          <input type="number" min="2" step="1" max="1000000" v-model="items[step].answer" >
          <button class="btn" @click.prevent="answer(items[step].answer, 3)">Next</button>
        </div>

        <div class="quiz--options" v-else>
          <p>Please Select One</p>
          <button class="btn btn-white" v-for="item in Object.keys(items[step].options)" @click="answer(item, items[step].options[item])">{{ item }}</button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      spinner: false,
      step: 1,
      notValid: true,
      data: {
        firstname: null,
        lastname: null,
        company: null,
        email: null,
        phone: null
      },
      items: {
        1: {
          question: 'I had W2 Employees in 2020 or 2021',
          options: {
            'Yes': 2, // this.step= 2
            'No': 'not', // this.step= 'not'
          },
          id: 'w2_employees',
          answer: null
        },
        2: {
          question: 'How Many W2 Employees Do You Have?', // then this.step= 3
          options: 'number',
          id: 'number_of_w2_employees',
          answer: 5
        },
        3: {
          question: 'Did You Experience a Supply Chain Disruption in 2020 or 2021?',
          options: {
            'Yes': 5, // if Yes this.step= 5
            'No': 4, // if No this.step= 4
          },
          id: 'supply_chain_disruption',
          answer: null
        },
        4: {
          question: 'Did You Receive PPP Money?',
          options: {
            'Yes': 'form', // if Yes this.step= 'form'
            'No': 'form', // if Yes this.step= 'form'
          },
          id: 'ppp_money',
          answer: null
        },
        5: {
          question: 'Did You Have a Decrease in Revenue in 2020 or 2021 compared to 2019?',
          options: {
            'Yes': 6, // if Yes this.step= 6
            'No': 'form', // if Yes this.step= 'form'
          },
          id: 'decreased_revenue',
          answer: null
        },
        6: {
          question: 'Are you the owner or decision maker for this business?',
          options: {
            'Yes': 4, // if Yes this.step= 4
            'No': 'not', // if Yes this.step='not'
          },
          id: 'owner_decision_maker',
          answer: null
        }
      }
    }
  },
  methods: {
    answer(a, s){
      if(a) this.items[this.step].answer = a
      this.step = s
    },
    hookAction(first_name, last_name, email, phone){
      const cookie = document.cookie.split('; ').reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
      }, {});
      const hookData = {
        name: first_name+' '+last_name,
        email: email,
        phone: phone,
        transaction_id: localStorage.c1 || false,
        fbp: cookie._fbp || false,
        fbc: cookie._fbc || false,
        gclid: localStorage.gclid || false,
      }
      this.$axios.post(process.env.API+'/hook', { params: hookData })
        .then(result => {
          console.log('hook sent');
          console.dir(result)
        })
    },
    submit(){
      this.spinner = true

      const employees = this.items[2].answer
      const phone = '1'+this.data.phone.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '')

      const data = {
        first_name: this.data.firstname,
        last_name: this.data.lastname,
        phone_home: phone,
        email_address: this.data.email,
        // company_name: this.company,
        ppp_money: this.items[4].answer,
        w2_employees: this.items[1].answer,
        number_of_w2_employees: this.items[2].answer,
        supply_chain_disruption: this.items[3].answer,
        decreased_revenue: this.items[5].answer,
        owner_decision_maker: this.items[6].answer,
        opt_in_url: window.location.href,
        data8: localStorage.utm_source || false,
        data9: localStorage.utm_medium || false,
        data10: localStorage.utm_campaign || false,
        jornaya_lead_id: this.$refs.leadid_token.value,
        aff_id: localStorage.affid || false,
        lp_offer_id: employees > 4 ? 1 : 2,
        lp_campaign_id: employees > 4 ? "63d422cfa5b22" : "63eea973c5f81",
      }

      this.$axios.post(process.env.API+'/lp', {
        headers: {'Content-Type': 'application/json'},
        params: data
      })
        .then(res => {
          if (res.data.status === 'error') {
            throw res.data.message
          } else {
            if(this.items[2].answer > 4) {
              this.hookAction(this.data.firstname, this.data.lastname, this.data.email, phone)
            }
            console.dir(res)
            this.$store.commit('setQuiz', false)
            this.$store.commit('setThanks', true)
          }
        })
        .catch(err => {
          console.dir(err)
          this.$swal(err)
        })
        .finally(() => {
          this.spinner = false
        })
    },
    phoneInput(e){
      let arr = e.target.value
        .replace(/[^\dA-Z]/g, '')
        .replace(/[\s]/g, '')
        .split('')
      this.data.phone = arr.toString().replace(/[,]/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.quiz{
  background: rgba(#0E0E11, .7);
  position: fixed;
  left: 0; top: 0;
  height: 100vh;
  width: 100%;
  z-index: 99;
  padding: 16px;
  overflow-y: auto;
  @media(min-width:992px){
    padding: 50px;
  }
  .btn-white{
    background: var(--bg-white);
  }
  .link{
    margin: 40px auto 0;
  }
  &--inner{
    background: var(--bg-white);
    border-radius: 12px;
    min-height: calc(100vh - 100px);
    max-width: 1340px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 85px 16px 32px;
  }
  h3{
    margin: 0 auto;
    font-weight: 600;
    font-size: 20px;
    line-height: 130%;
    text-align: center;
    color: var(--text-black);
    margin-bottom: 16px;
    max-width: 638px;
    @media(min-width:768px){
      font-size: 32px;
    }
  }
  &--options{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    p{
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      text-align: center;
      color: var(--text-black);
      margin-bottom: 32px;
      width: 100%;
      @media(min-width:768px){
        margin-bottom: 40px;
      }
    }
    input[type="number"]{
      display: block;
      border: none;
      background: none;
      width: 100%;
      border-bottom: 1px solid #797B87;
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      color: var(--text-black);
      margin-bottom: 22px;
    }
    button{
      &:not(:last-child){
        @media(max-width:991px){
          margin-bottom: 24px;
        }
        @media(min-width:992px){
          margin-right: 32px;
        }
      }
    }
  }
  &--close{
    position: absolute;
    top: 24px; right: 24px;
  }
  &--back{
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    color: var(--brand-green);
    position: absolute;
    top: 24px; left: 24px;
    background: none;
    border: none;
    padding: 0;
    svg{
      margin-right: 4px;
    }
  }
  &--number{
    max-width: 332px;
    margin: 0 auto;
    p{
      margin-bottom: 4px;
      text-align: left;
    }
    button{
      width: 100%;
    }
  }
  &--form{
    margin: 0 auto 40px;
    padding-top: 8px;
    @media(min-width:992px){
      width: 332px;
    }
    & + p{
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      color: var(--text-black);
      max-width: 332px;
      margin: 0 auto;
    }
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
