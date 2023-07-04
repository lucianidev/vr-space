<script>
  import router from "page";
  import LoginForm from "../components/form/formVariations/LoginForm.svelte";
  import { userState } from "../stores/userStores";
  import { onMount } from "svelte";

  onMount(async() => {
    await userState.isLogged().then(() => {
       router.redirect('/');
    })
  })
</script>

<LoginForm></LoginForm>
