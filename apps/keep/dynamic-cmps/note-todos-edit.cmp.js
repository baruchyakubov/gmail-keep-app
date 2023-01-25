export default {
    props: ['note'],
    template: `
        <section class="note-todos-edit" v-if="note">
            <input @input="$emit('setForm' , form)" type="text" v-model="form.label" />
            <div v-for="(todo,idx) in form.todos" :key="todo.doneAt" >
                <input @input="$emit('setForm' , form)" type="text" v-model="todo.txt" />
                <button @click="removeTodo(idx)">X</button>
            </div>
            <button @click="addTodos">Add todos</button>
        </section>
    `,
    data() {
        return {
            form: { label: { ...this.note.info }.label, todos: [...this.note.info.todos] }
        }
    },
    methods: {
        addTodos() {
            this.form.todos.push({ txt: "", status: false })
        },
        removeTodo(todoIdx) {
            const idx = this.form.todos.findIndex((todo, idx) => {
                return idx === todoIdx
            })
            this.form.todos.splice(idx, 1)
        }
    }
}