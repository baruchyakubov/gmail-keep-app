import { eventBus } from "../../services/event-bus.service.js";
import emailPreview from "./email-preview.cmp.js";

export default {
    props:['emails'],
	template: `
        <section v-if="emails" class="email-list">
            <ul v-if="isListShown">
                <li v-for="email in emails" :key="email.id">
                    <email-preview :email="email"></email-preview>
                </li>
            </ul>
            <router-view></router-view>
        </section>
    `,
    data(){
        return {
            isListShown: true
        }
    },
    created(){
        eventBus.on('toggleEmailList' , this.toggleEmailList)
    },
    methods:{
        toggleEmailList(){
            this.isListShown = !this.isListShown
        }
    },
    components:{
        emailPreview
    }
}