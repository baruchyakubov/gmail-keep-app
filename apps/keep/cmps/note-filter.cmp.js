

export default {
    template: `
        <section  class="keep-app-filter">
            <div class="filter-add-container">
                <input v-model="filterBy.txt" @input="setFilter" placeholder="Search notes" type="search" />
                <button @click="$router.push('/keep-app/edit')">Add note</button>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy:{
                txt:''
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('setFilter' , {...this.filterBy})
        }
    }
}