import { eventBus } from '../services/event-bus.service.js'

export default {
	template: `
        <section :class="msg.type" :class="{shown:isShown}" class="user-msg">
            {{ msg.txt }}
        </section>
    `,
	data() {
		return {
			msg: { txt: '', type: 'success' },
			isShown:false
		}
	},
	created() {
		eventBus.on('show-msg', this.showMsg)
	},
	methods: {
		showMsg(msg) {
			this.isShown = true
			this.msg = msg
			setTimeout(() => (this.isShown = false), this.msg.timeout || 4000)
		},
	},
}
