<script>
  import Button from "../../Button.svelte";
  import FormInput from "../FormInput.svelte";
  import FormPassword from "../FormPassword.svelte";
  import Form from "../Form.svelte";
  import { userState } from "../../../stores/userStores";
  import { onMount } from "svelte";

  let email = "";
  let password = "";

  const login = async() => {
    await userState.login(email,password)
  }
</script>

<Form formName="Login" action={async() => await userState.login(email,password)}>
  <FormInput bind:input={email} inputName="Email" />
  <FormPassword bind:input={password} inputName="Password" />
  <Button insideText="Signup" type="submit" />
</Form>
