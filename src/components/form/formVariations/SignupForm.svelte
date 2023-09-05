<script>
  import Button from "../../Button.svelte";
  import FormInput from "../FormInput.svelte";
  import FormPassword from "../FormPassword.svelte";
  import Form from "../Form.svelte";
  import { userState } from "../../../stores/userStores";
  let username = "";
  let email = "";
  let password = "";

</script>

<Form
  formName="Signup"
>
  <FormInput bind:input={username} inputName="Username" />
  <FormInput bind:input={email} inputName="Email" />
  <FormPassword bind:input={password} inputName="Password" />
  <Button insideText="Signup" type="submit" action={async() => await userState.signup(email, password, username)}/>
  <a href="/login" class="flex justify-center items-center hover:underline">Already an account? Log in now!</a>
</Form>
