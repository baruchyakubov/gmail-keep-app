import { eventBus } from "../../services/event-bus.service.js"

export default {
    props: ['emails'],
    template: `
    <div @click="isOpen = false" class="opacity-wrapper" v-if="isOpen"></div>
        <section :class="{opened:isOpen}" class="email-filter">
            <div @click="openCompose" class="compose-btn">
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682448/d5vus6gap72yle7qpafz.png" alt="" />
                <p>Compose</p>
            </div>
            <div :class="{active: activeBtn === 'inbox' }" @click="setCriteria('inbox')">
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682431/y8iec5liadlfgm4cnaky.png" alt="" />
                <p>Inbox</p>
                <p v-if="unreadCount" class="unread-count">{{ unreadCount }}</p>
            </div>
            <div :class="{active: activeBtn === 'starred' }" @click="setCriteria('starred')">
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682460/nmt9iion3qid7pfxd3c8.png" alt="" />
                <p>Starred</p>
            </div>
            <div :class="{active: activeBtn === 'important' }" @click="setCriteria('important')">
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674917594/qqmglmwdt5hqpd7mna9e.png" alt="" />
                <p>Important</p>
            </div>
            <div :class="{active: activeBtn === 'trash' }" @click="setCriteria('trash')">
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682443/pndv8blj1ovmewptmwox.png" alt="" />
                <p>Trash</p>
            </div>
            <div :class="{active: activeBtn === 'sent' }" @click="setCriteria('sent')"> 
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682471/e3xkgzlhgbkoufcccqho.png" alt="" />
                <p>Sent</p>
            </div>
            <div :class="{active: activeBtn === 'draft' }" @click="setCriteria('draft')">
                <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682437/ybnoxsvfaa2lclwxbmki.png" alt="" />
                <p>Drafts</p>
            </div>
        </section>
    `,
    data() {
        return {
            activeBtn: null,
            isOpen: false
        }
    },
    created() {
        this.activeBtn = 'inbox'
        eventBus.on('toggleFilter' , () => this.isOpen = !this.isOpen)
    },
    methods: {
        setCriteria(status) {
            this.isOpen = false
            this.activeBtn = status
            this.$emit('setCriteriaByStatus', status)
        },
        openCompose() {
            this.isOpen = false
            this.$router.push('/email-app/compose')
        }
    },
    computed: {
        unreadCount() {
            let counter = 0
            this.emails.forEach(email => {
                if (email.isRead === false) counter++
            })
            return counter-1
        }
    }
}