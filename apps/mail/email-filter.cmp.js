export default {
    props: ['emails'],
    template: `
        <section class="email-filter">
            <div @click="openCompose" class="compose-btn">
                <img src="../assets/img/compose.png" alt="" />
                <p>Compose</p>
            </div>
            <div :class="{active: activeBtn === 'inbox' }" @click="setCriteria('inbox')">
                <img src="../assets/img/inbox.png" alt="" />
                <p>Inbox</p>
                <p v-if="unreadCount" class="unread-count">{{ unreadCount }}</p>
            </div>
            <div :class="{active: activeBtn === 'starred' }" @click="setCriteria('starred')">
                <img src="../assets/img/starred.png" alt="" />
                <p>Starred</p>
            </div>
            <div :class="{active: activeBtn === 'trash' }" @click="setCriteria('trash')">
                <img src="../assets/img/delete.png" alt="" />
                <p>Trash</p>
            </div>
            <div :class="{active: activeBtn === 'sent' }" @click="setCriteria('sent')"> 
                <img src="../assets/img/sent.png" alt="" />
                <p>Sent</p>
            </div>
            <div :class="{active: activeBtn === 'drafts' }" @click="setCriteria('drafts')">
                <img src="../assets/img/drafts.png" alt="" />
                <p>Drafts</p>
            </div>
        </section>
    `,
    data() {
        return {
            activeBtn: null
        }
    },
    created() {
        this.activeBtn = 'inbox'
    },
    methods: {
        setCriteria(status) {
            this.activeBtn = status
            this.$emit('setCriteriaByStatus', status)
        },
        openCompose() {
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