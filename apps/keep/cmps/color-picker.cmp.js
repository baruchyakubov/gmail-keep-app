export default {
    template: `
    <section class="colors-container">
        <div @click="setNoteColor(color)" v-for="color in colorList" :style="{ 'background-color': color }"></div>
    </section>
    `,
    data() {
        return {
            colorList: ['#e8eaed', '#e6c9a8', '#fdcfe8', '#d7aefb', '#aecbfa', '#cbf0f8', '#a7ffeb', '#ccff90', '#fff475', '#f28b82', '#fbbc04']
        }
    },
    methods: {
        setNoteColor(color) {
            this.$emit('setNoteColor' , color)
        }
    }
}