import emailHeader from "../apps/mail/email-header.cmp.js"
import emailList from "../apps/mail/email-list.cmp.js"
import { gmailService } from "../services/email-service.js"
import emailFilter from "../apps/mail/email-filter.cmp.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="emails && criteria"  class="email-app email-container">
            <email-header></email-header>
            <input v-model="criteria.txt" @input="setCriteria" class="search-mail" type="search" placeholder="Search mail" />
            <email-filter :criteria="criteria" :emails="emails" @setCriteriaByStatus="setCriteriaByStatus"></email-filter>
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
            criteria: null,
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
        eventBus.on('addMessege', this.addMessege)
        eventBus.on('setStatusToTrash', this.setStatusToTrash)
        eventBus.on('deleteEmail', this.deleteEmail)
        eventBus.on('editEmailStared', this.editEmailStared)
        eventBus.on('editEmailImportant', this.editEmailImportant)
        eventBus.on('editMessege', this.editMessege)
        eventBus.on('sendMessege', this.sendMessege)
    },
    methods: {
        setCriteria() {
            this.emailsToShow()
        },
        setCriteriaByStatus(status) {
            if (status === 'starred'){
                this.criteria.isStared = true
                this.criteria.isImportant = false
                gmailService.saveCriteria(this.criteria)
            } 
            else if (status === 'important'){
                this.criteria.isImportant = true
                this.criteria.isStared = false
                gmailService.saveCriteria(this.criteria)
            }
            else {
                this.criteria.status = status
                if (this.criteria.isStared) this.criteria.isStared = false
                else if (this.criteria.isImportant) this.criteria.isImportant = false
                gmailService.saveCriteria(this.criteria)
            }
        },
        addMessege(email) {
            this.emails.unshift(email)
        },
        editMessege(email) {
            const idx = this.emails.findIndex(e => e.id === email.id)
            this.emails.splice(idx, 1, email)
        },
        sendMessege(email) {
            const idx = this.emails.findIndex(e => e.id === email.id)
            this.emails[idx].status = 'sent'
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
        editEmailStared(email) {
            gmailService.save(email)
                .then(updatedEmail => {
                    const idx = this.emails.findIndex(email => {
                        return email.id === updatedEmail.id
                    })
                    this.emails[idx].isStared = email.isStared
                })
        },
        editEmailImportant(email) {
            gmailService.save(email)
                .then(updatedEmail => {
                    const idx = this.emails.findIndex(email => {
                        return email.id === updatedEmail.id
                    })
                    this.emails[idx].isImportant = email.isImportant
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
            if (this.criteria.isStared) var emails = this.emails.filter(email => (regex.test(email.fullname) || regex.test(email.subject) || regex.test(email.body)) && email.isStared === this.criteria.isStared)
            else if (this.criteria.isImportant) var emails = this.emails.filter(email => (regex.test(email.fullname) || regex.test(email.subject) || regex.test(email.body)) && email.isImportant === this.criteria.isImportant)
            else var emails = this.emails.filter(email => (regex.test(email.fullname) || regex.test(email.subject) || regex.test(email.body)) && email.status === this.criteria.status)
            return emails
        }
    },
    unmounted(){
        eventBus.on('addMessege', this.addMessege)()
        eventBus.on('setStatusToTrash', this.setStatusToTrash)()
        eventBus.on('deleteEmail', this.deleteEmail)()
        eventBus.on('editEmailStared', this.editEmailStared)()
        eventBus.on('editEmailImportant', this.editEmailImportant)()
        eventBus.on('editMessege', this.editMessege)()
        eventBus.on('sendMessege', this.sendMessege)()
    }

}