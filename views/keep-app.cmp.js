import { keepService } from "../services/keep-app.service.js"
import noteList from "../apps/keep/cmps/note-list.cmp.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="notes" class="keep-app main-layout">
            <h1>keep-app</h1>
            <div class="list-container">
               <h1 v-if="pinnedNotes.length && unPinnedNotes.length">Pinned</h1>
               <note-list :notes="pinnedNotes"></note-list>
               <h1 v-if="unPinnedNotes.length && pinnedNotes.length">Unpinned</h1>
               <note-list :notes="unPinnedNotes"></note-list>
            </div>
            <router-view></router-view>
        </section>
    `,
    data() {
        return {
            notes: null,
            unsubscribe1: null,
            unsubscribe2: null,
            unsubscribe3: null
        }
    },
    created() {
        keepService.query()
            .then(notes => {
                this.notes = notes
            })
        this.unsubscribe1 = eventBus.on('setNoteColor', this.setNoteColor)
        this.unsubscribe2 = eventBus.on('deleteEmail', this.deleteEmail)
        this.unsubscribe3 = eventBus.on('edit', this.editNote)
    },
    methods: {
        setNoteColor({ note, color }) {
            let Note = { ...note }
            Note.style.backgroundColor = color
            keepService.save(Note)
                .then(updatedNote => {
                    const idx = this.notes.findIndex(note => {
                        return note.id === updatedNote.id
                    })
                    this.notes[idx].style.backgroundColor = color
                })
        },
        deleteEmail(noteId) {
            keepService.remove(noteId)
                .then(noteId => {
                    const idx = this.notes.findIndex(note => {
                        return note.id === noteId
                    })
                    this.notes.splice(idx, 1)
                })
        },
        editNote(note) {
            keepService.save(note)
                .then(note => {
                    const idx = this.notes.findIndex(n => {
                        return note.id === n.id
                    })
                    this.notes.splice(idx, 1, note)
                })
        }
    },
    unmounted(){
        this.unsubscribe1()
        this.unsubscribe2()
        this.unsubscribe3()
    },
    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned)
        },
        unPinnedNotes() {
            return this.notes.filter(note => !note.isPinned)
        }
    },
    components: {
        noteList
    }
}