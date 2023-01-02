import { gmailService } from "../../services/email-service.js"
import { eventBus } from "../../services/event-bus.service.js"

export default {
    template: `
        <section v-if="email" class="email-details">
            <img @click="goToList" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682455/crqlp593hiigl27cs3bv.png" alt="" />
            <h1>{{ email.subject }}</h1>
            <p>{{ setDate }}</p>
            <p>[{{ email.fullname }}] <span><{{ email.from }}></span> </p>
            <p>{{ email.body }}</p>
        </section>
    `,
    data(){
      return {
        email: null
      }  
    },
    created(){
        const id = this.$route.params.id
        gmailService.get(id)
            .then(email => {this.email = email
              if(this.email.note !== '') this.isNote = true
            })
    },
    computed:{
        setDate(){
          return new Date(this.email.sentAt).toLocaleDateString()
        }
    },
    methods:{
        goToList(){
            this.$router.push('/email-app')
        }
    },
    unmounted() {
        eventBus.emit('toggleEmailList')
    }
}