import { eventBus } from '../../services/event-bus.service.js'
import { gmailService } from '../../services/email-service.js'

export default {
    props: ['email'],
    template: `
        <section @mouseleave="isHover=false" @mouseover="isHover=true" @click="showDetails" :class="setColor" v-if="email" class="email-preview">
            <img v-if="!email.isImportant" @click.stop="toggleIsImportant"  class="important" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674917594/qqmglmwdt5hqpd7mna9e.png" alt="" />
            <img v-else @click.stop="toggleIsImportant" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674917962/nzjivqs9vrx9v6akwlpz.png" alt="" />
            <img class="stared" @click.stop="toggleIsStared" v-if="!email.isStared" src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png" alt="" />
            <img @click.stop="toggleIsStared" v-else src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png" alt="" />
            <p v-if="email.status === 'draft'" class="draft-preview">Draft</p>
            <p v-else class="fullname">{{ email.fullname }}</p>
            <p class="body-preview">{{ limitChar }}</p>
            <p v-if="!isHover" class="date-preview">{{ setDate }}</p>
            <div class="action-btn" v-else>
                <img @click.stop="setStatusToTrash" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682443/pndv8blj1ovmewptmwox.png" alt="" />
            </div>
        </section>
    `,
    data() {
        return {
            isHover: false
        }
    },
    computed: {
        setColor() {
            return { grey: this.email.isRead }
        },
        setDate() {
            const date = new Date(this.email.sentAt)
            const dateFormat = new Date(Date.UTC(date.getMonth(), date.getDate(), 0, 0))
            const options = {
                month: "short",
                day: "numeric",
            }
            return dateFormat.toLocaleDateString("en-US", options)
        },
        limitChar() {
            var str = this.email.subject + '-' + this.email.body
            return str
        }
    },
    methods: {
        toggleIsStared(){
            const email = this.email
            email.isStared = !email.isStared
            eventBus.emit('editEmailStared', this.email)
        },
        toggleIsImportant(){
            const email = this.email
            email.isImportant = !email.isImportant
            eventBus.emit('editEmailImportant', this.email)
        },
        showDetails() {
            if(this.email.status === 'draft'){
                this.$router.push(`/email-app/compose/${this.email.id}`)
                return
            }
            this.email.isRead = true
            gmailService.save(this.email)
            eventBus.emit('toggleEmailList')
            this.$router.push(`/email-app/${this.email.id}`)
        },
        setStatusToTrash() {
            if (this.email.status === 'trash') {
                this.deleteEmail()
                return
            }
            this.email.status = 'trash'
            eventBus.emit('setStatusToTrash', this.email)
        },
        deleteEmail() {
            eventBus.emit('deleteEmail', this.email.id)
        }
    }
}