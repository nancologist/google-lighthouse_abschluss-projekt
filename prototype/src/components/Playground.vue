<script>
// ****** JSX - in Vue : ******

// export default {
//     name: 'Playground',
//     data () {
//         return {
//             isGreen: false,
//             names: ['David', 'Michael', 'Paul', 'Oliver'],
//             movie: {
//                 title: 'Lord of the Rings',
//                 author: 'J.R.R Tolkiens',
//                 books: 3
//             }
//         }
//     },
//     render () {
//         return (
//             <div>
//                 <h1>Hallo Helmut!</h1>
//             </div>
//         )
//     }
// }

// ****** JSX - even shorter, just like in React ******

export default (x) => {
    console.log(x)
    return <h1 class="red">Hallo { x.props.name }!</h1>
}
</script>

<style>
    @import './Playground.css';
</style>

<!--
IMPORTANT:
(If there's no explanation, please look at the README.md of the Vue Course on Github.)
    * Avoid using arrow functions in Vue! It saves you a lot of headachase.

    * v-on:keydown.enter

    * v-on:EVENT_NAME.stop

    * v-model (input-element two way binding)

    * computed vs methods : Video #26

    * computed vs watch : They are similar but in "watch" you can run an async code liek setTimeout(), what is not possible with "computed"

    * Shorthands : @ instead von v-on and : instead of v-bind

    * v-else-if : NEW!

    * vm.$data

    * ref-attr , this.$refs inside vue-instance
      (Important: using "ref" in React or Vue means accessing the DOM directly, which can be overwritten. So "ref" replaces the .querySelector())
-->
