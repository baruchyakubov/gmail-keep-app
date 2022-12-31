import { keepService } from "../services/keep-app.service.js"
import noteList from "../apps/keep/cmps/note-list.cmp.js"

export default {
    template: `
        <section v-if="notes" class="keep-app main-layout">
            <h1>keep-app</h1>
            <note-list :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        keepService.query()
            .then(notes => {
                this.notes = notes
            })
    },
    components:{
        noteList
    }
}