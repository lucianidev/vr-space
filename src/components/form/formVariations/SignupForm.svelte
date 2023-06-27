<script>
  import Button from "../../Button.svelte";
  import FormInput from "../FormInput.svelte";
  import FormPassword from "../FormPassword.svelte";
  import Form from "../Form.svelte";
  import { userState } from "../../../stores/userStores";
  let username = "";
  let email = "";
  let password = "";

  const signup = async() => {
    await userState.signup(email, password, username).
    then(async() => await userState.login(email,password))
  }
</script>

<Form
  formName="Signup"
  action={signup}
>
  <FormInput bind:input={username} inputName="Username" />
  <FormInput bind:input={email} inputName="Email" />
  <FormPassword bind:input={password} inputName="Password" />
  <Button insideText="Signup" type="submit" />
</Form>
