<script>
  import router from "page";
  import SignupForm from "../components/form/formVariations/SignupForm.svelte";
  import { userState } from "../stores/userStores";
  import { onMount } from "svelte";

  onMount(async() => {

    await userState.isLogged();
    if(!$userState.isLogged) return;
    router.redirect('/')
  })
</script>

<SignupForm />

