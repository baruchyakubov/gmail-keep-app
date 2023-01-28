import { gmailService } from "../../services/email-service.js"
import { eventBus } from "../../services/event-bus.service.js"
import { utilService } from "../../services/util.service.js"

export default {
    template: `
    <form class="composed-form flex">
        <header class="form-header">
            <p>New Message</p>
            <img @click="$router.push('/email-app')" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_16px_1x.png" alt="" />
        </header>
        <input @input="addToDrafts" class="to" v-model="email.to" type="text" placeholder="To" />
        <input @input="addToDrafts" class="subject" v-model="email.subject" type="text" placeholder="Subject" />
        <textarea @input="addToDrafts" v-model="email.body" name="" id="" cols="30" rows="10"></textarea>
        <!-- <div class="note-info">{{ noteInfo }}</div> -->
        <button class="send" @click.prevent="sendMessage">send</button>
    </form>
    `,
    data() {
        return {
            email: gmailService.getEmptyEmail(),
            timeOut: null
        }
    },
    created() {
        const id = this.$route.params.id
        if (id) this.insertEmail(id)
        gmailService.getUser()
            .then(username => {
                this.username = username
            })
    },
    mounted(){
        // this.addToDrafts = utilService.debounce(this.addToDrafts)
    },
    methods: {
        insertEmail(id) {
            gmailService.get(id)
                .then(email => {
                    this.email = email
                })
        },
        addToDrafts() {
            gmailService.save({...this.email})
                .then(email => {
                    if (!this.email.id){
                        this.email = email
                        eventBus.emit('addMessege', {...this.email})
                    } else{
                        eventBus.emit('editMessege', {...this.email})
                    }
                })
        },
        sendMessage() {
            if (this.to === '') return
            this.email.status = 'sent'
            gmailService.save({...this.email})
                .then(email => {
                    eventBus.emit('sendMessege', {...this.email})
                    this.$router.push('/email-App')
                })
        },
        sendNote(note) {
            this.noteInfo = note.info.txt
        }
    },
}