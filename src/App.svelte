<script>
    import NavBar from "./components/NavBar.svelte";
    import Form from "./components/Form.svelte";
    import Button from "./components/Button.svelte";

    function j() {
        console.log("llll");
    }
</script>

<NavBar></NavBar>
<Button insideText="heyy" action={j}></Button>
<Form></Form>