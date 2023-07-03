<script>
      import Button from "../../Button.svelte";
  import FormFile from "../FormFile.svelte";
  import Form from "../Form.svelte";
  import { userState } from "../../../stores/userStores";
    

  let file = null;
</script>

<Form formName="Avatar" action={() => userState.updateAvatar(file)}>
    <FormFile bind:input={file} inputName="file" />
    <Button insideText="Upload" type="submit" />
  </Form>