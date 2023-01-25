import todoPreview from "../cmps/todo-preview.cmp.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
    <section class="note-todos">
        <h1>{{ note.info.label }}</h1>
        <div class="todo-list" v-for="(todo , idx) in note.info.todos" :key="todo + idx">
            <todo-preview @setTodoStatus="setTodoStatus(idx)" :todo="todo"></todo-preview>
        </div>
    </section>
    `,
    methods: {
        setTodoStatus(idx) {
            const note = {...this.note}
            note.info.todos[idx].status = !note.info.todos[idx].status
            eventBus.emit('edit' , note)
        }
    },
    components: {
        todoPreview
    }
}