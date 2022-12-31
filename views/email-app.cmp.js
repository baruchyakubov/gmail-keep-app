import emailHeader from "../apps/mail/email-header.cmp.js"
import emailList from "../apps/mail/email-list.cmp.js"
import { gmailService } from "../services/email-service.js"
import emailFilter from "../apps/mail/email-filter.cmp.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="emails"  class="email-app email-container">
            <email-header></email-header>
            <input v-model="criteria.txt" @input="setCriteria" class="search-mail" type="search" placeholder="Search mail" />
            <email-filter :emails="emails" @setCriteriaByStatus="setCriteriaByStatus"></email-filter>
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
        gmailService.queryCriteria()
            .then(criteria => { this.criteria = criteria })
        eventBus.on('sendMessege', this.sendMessege)
        eventBus.on('setStatusToTrash', this.setStatusToTrash)
        eventBus.on('deleteEmail', this.deleteEmail)
    },
    methods: {
        setCriteria() {
            this.emailsToShow()
        },
        setCriteriaByStatus(status) {
            this.criteria.status = status
        },
        sendMessege(form) {
            gmailService.sendEmail(form.to, form.subject, form.body, form.noteInfo)
                .then(email => {
                    this.emails.unshift(email)
                })
        },
        setStatusToTrash(email) {
            gmailService.save(email)
                .then(updatedEmail => {
                    const idx = this.emails.findIndex(email => {
                        return email.id === updatedEmail.id
                    })
                    this.emails[idx].status = 'trash'
                })
        },
        deleteEmail(emailId) {
            gmailService.remove(emailId)
                .then(emailId => {
                    const idx = this.emails.findIndex(email => {
                        return email.id === emailId
                    })
                    this.emails.splice(idx, 1)
                })
        }
    },

    computed: {
        emailsToShow() {
            const regex = new RegExp(this.criteria.txt, 'i')
            var emails = this.emails.filter(email => regex.test(email.fullname)
                && email.status === this.criteria.status)
            return emails
        }
    },

}