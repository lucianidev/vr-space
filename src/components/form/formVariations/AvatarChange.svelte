<script>
      import Button from "../../Button.svelte";
  import FormFile from "../FormFile.svelte";
  import { userState } from "../../../stores/userStores";
    

  let file = null;
</script>
<div class="flex flex-col items-start">
  <FormFile bind:input={file} inputName="Change avatar" />
  <Button insideText="Upload" type="submit" action={async() => await userState.updateAvatar(file)}/>
</div>
