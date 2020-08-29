<script>
export default (context) => {
    const { props } = context
    return (
        <div id="playground">
            <h3>Child Component</h3>
            <p>Name in Playground:<strong> { props.name }</strong></p>
            <button vOn:click={props.callFunc}>Reverse Name</button>
        </div>
    )
}

// ****** JSX - even shorter, just like in React ******
// export default ({ props }) => <h1 class="red">Hallo { props.name }!</h1>
</script>

<style scoped>
    @import 'Playground.css';
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
        btw. "computed" should always have a "return"!

    * Shorthands : @ instead von v-on and : instead of v-bind

    * v-else-if : NEW!

    * vm.$data

    * ref-attr , this.$refs inside vue-instance
      (Important: using "ref" in React or Vue means accessing the DOM directly, which can be overwritten. So "ref" replaces the .querySelector())

    * v-slot : https://vuejs.org/v2/guide/components-slots.html

    * Vue Instance Lifecycle : Video #77

    * props :
        - You can manipulate the imported props in the child cmp : Video #111
        - properties of "props" -> "type", "required", "default" : Video # 112

    * $emit() : Video #113
-->
