import Vue from "vue";



const btns = {
    template:"#works__btns",
    components: {

    },
    props:["currentIndex", "works"],
    methods:{
        slide(direct){
            this.$emit('changeSlide', direct);
        }
    },
    computed:{
        diseblePrev(){
            return this.currentIndex === 0 ?true:false;
        },
        disebleNext(){
            return this.currentIndex === this.works.length-1 ? true:false;
        },
    },
    mounted(){
    }
}
const preview = {
    template:"#works__preview",
    components: {
        btns
    },
    props:["works", "currentWork", "currentIndex"],
    methods:{
        slideWork(direct){
            this.$emit("slide", direct);
        }
    },
    mounted(){
    },
}
const pictures = {
    template:"#works__pictures",
    components: {
        preview
    },
    props:{
        currentIndex: Number, 
        works: Array, 
        currentWork: Object
    },
    methods:{
        handleSlide(direct){
            this.$emit("slide", direct);
        }
    },
    mounted(){
    },
};
const tags = {
    template:"#works__tags",
    components: {},
    props:["currentTags"],
    computed:{
        tags(){
            return this.currentTags.split(',')
        },
    },
    mounted(){
    },
};
const info = {
    template:"#works__info",
    components: {
        tags
    },
    props: ["currentWork"],
    mounted(){
    },
};



new Vue({
    el: "#works__container",
    template: "#works__content",
    components:{
        pictures,
        info,
    },
    data() {
        return {
            currentIndex:0,
            works:''
        };
    },
    methods: {
        changeImagePath(works){
            works.map((item)=> {
                let newPath = require(`../images/content/${item.photo}`)
                    .default;
                item.photo = newPath;
                return item;
            });
            return works;
        },
        changeSlide(direct){
            switch(direct){
                case 'next':
                    this.currentIndex++;
                    break;
                case 'prev':
                    this.currentIndex--;
                    break;
            }
        }
    },
    computed:{
        currentWork(){
            return this.works[this.currentIndex];
        },
    },
    created(){
        let data = require('../data/works.json');
        this.works = this.changeImagePath(data);
        console.log(this.works);
    },
});

