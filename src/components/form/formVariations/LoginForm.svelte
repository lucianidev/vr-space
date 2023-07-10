<script>
  import Button from "../../Button.svelte";
  import FormInput from "../FormInput.svelte";
  import FormPassword from "../FormPassword.svelte";
  import Form from "../Form.svelte";
  import { userState } from "../../../stores/userStores";
  import router from "page"
  let email = "";
  let password = "";
</script>

<Form formName="Login">
  <FormInput bind:input={email} inputName="Email" />
  <FormPassword bind:input={password} inputName="Password" />
  <Button insideText="Signup" type="submit" action={async() => await userState.login(email,password)}/>
  <a href="/signup" class="flex justify-center items-center hover:underline">New here? Sign in now!</a>
</Form>
