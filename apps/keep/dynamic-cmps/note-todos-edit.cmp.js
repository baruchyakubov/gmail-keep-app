export default {
    props: ['note'],
    template: `
        <section class="note-todos-edit" v-if="note">
            <div class="label">
               <p>Label</p>
               <input @input="$emit('setForm' , form)" type="text" v-model="form.label" />
            </div>
            <p>Todos</p>
            <button @click="addTodos">Add todo</button>
            <section class="todo-list-edit">
               <div v-for="(todo,idx) in form.todos"  >
                   <div class="todo-edit">
                      <input @input="$emit('setForm' , form)" type="text" v-model="todo.txt" />
                      <img class="delete-icon" @click="removeTodo(idx)" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682443/pndv8blj1ovmewptmwox.png" alt="" />
                   </div>
               </div>
            </section>
        </section>
    `,
    data() {
        return {
            form: {...this.note.info}
        }
    },
    methods: {
        addTodos() {
            this.form.todos.push({ txt: "", status: false })
            this.$emit('setForm' , this.form)
        },
        removeTodo(todoIdx) {
            const idx = this.form.todos.findIndex((todo, idx) => {
                return idx === todoIdx
            })
            this.form.todos.splice(idx, 1)
            this.$emit('setForm' , this.form)
        }
    }
}