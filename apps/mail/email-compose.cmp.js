import { gmailService } from "../../services/email-service.js"
import { eventBus } from "../../services/event-bus.service.js"

export default{
    template:`
    <form class="composed-form flex">
        <header class="form-header">
            <router-link to="/email-App"><button>X</button></router-link>
        </header>
        <input class="to" v-model="to" type="text" placeholder="To" />
        <input class="subject" v-model="subject" type="text" placeholder="Subject" />
        <textarea  v-model="body" name="" id="" cols="30" rows="10"></textarea>
        <div class="note-info">{{ noteInfo }}</div>
        <button class="send" @click.prevent="sendMessage">send</button>
    </form>
    `,
    data(){
        return {
            username:'',
            to: '',
            subject:'',
            body:'',
            noteInfo:''
        }
    },
    created(){
        gmailService.getUser()
            .then(username => {
                this.username = username
            })
            eventBus.on('mailNote' , this.sendNote)
    },
    methods:{  
        sendMessage(){
            if(this.to === '') return
            eventBus.emit('sendMessege' , {to: this.to , subject: this.subject , body: this.body , noteInfo: this.noteInfo})
            this.$router.push('/email-App')
        },
        sendNote(note){
            this.noteInfo = note.info.txt
        }  
    },
}