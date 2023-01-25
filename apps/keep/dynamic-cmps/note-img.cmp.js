import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
    <section class="note-img">
        <h1>{{ note.info.title }}</h1>
        <img :src="note.info.url" />
    </section>
    `
}

// :src="'data:' + note.info.url + ';base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='" 
// :data-src="note.info.url"
