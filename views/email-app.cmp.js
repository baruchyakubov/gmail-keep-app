import emailHeader from "../apps/mail/email-header.cmp.js"
import emailList from "../apps/mail/email-list.cmp.js"
import { gmailService } from "../services/email-service.js"
import emailFilter from "../apps/mail/email-filter.cmp.js"

export default {
    template: `
        <section v-if="emails"  class="email-app email-container">
            <email-header></email-header>
            <input class="search-mail" type="search" placeholder="Search mail" />
            <email-filter></email-filter>
            <email-list v-if="emails" :emails="emailsToShow"></email-list>
        </section>
    `,
    components: {
        emailHeader,
        emailList,
        emailFilter
    },

    data() {
        return {
            emails: null,
            criteria: {},
            isSelectedEmail: false
        }

    },
    created() {
        gmailService.query()
            .then(list => {
                this.emails = list
            })
    },

    computed: {
        emailsToShow() {
            return this.emails
        }
    },

}