export default {
    props: ['todo'],
    template: `
         <input ref="myRef" class="todo-checkbox" @click.stop="$emit('setTodoStatus')" type="checkbox" />
         <p :class="{done: todo.status}">{{ todo.txt }}</p>
    `,
    mounted(){
        this.$refs.myRef.checked = this.todo.status
    }
}