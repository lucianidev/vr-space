<script>
  import { navigate } from "svelte-routing";
  import SignupForm from "../components/form/formVariations/SignupForm.svelte";
  import { userState } from "../stores/userStores";
  import { onMount } from "svelte";

  onMount(async() => {
    await userState.isLogged().then(() => {
        navigate('/', {replace : true})
    })
  })
</script>

<SignupForm />

