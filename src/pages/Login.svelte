<script>
  import { Link, navigate } from "svelte-routing";
  import LoginForm from "../components/form/formVariations/LoginForm.svelte";
  import { userState } from "../stores/userStores";
  import { onMount } from "svelte";

  onMount(async() => {
    await userState.isLogged().then(() => {
        //navigate('/', {replace : true})
    })
  })
</script>

<LoginForm></LoginForm>
