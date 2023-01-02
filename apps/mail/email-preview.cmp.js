import { eventBus } from '../../services/event-bus.service.js'
import { gmailService } from '../../services/email-service.js'

export default {
    props: ['email'],
    template: `
        <section @mouseleave="isHover=false" @mouseover="isHover=true" @click="showDetails" :class="setColor" v-if="email" class="email-preview">
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/check_box_outline_blank_baseline_nv700_20dp.png" alt="" />
            <!-- <input @click.stop="checks" type="checkbox" /> -->
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png" alt="" />
            <p>{{ email.fullname }}</p>
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
            if (str.length > 50) str = str.substring(0, 120) + '...'
            return str
        }
    },
    methods: {
        showDetails() {
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