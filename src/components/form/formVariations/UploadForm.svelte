<script>
  import { Client, Databases, ID } from "appwrite";
  import Button from "../../Button.svelte";
  import FormInput from "../FormInput.svelte";
  import FormTextArea from "../FormTextArea.svelte";
  import FormFile from "../FormFile.svelte";
  import Form from "../Form.svelte";
  import { postsStore } from "../../../stores/postsStore";

  let title = "";
  let description = "";
  let file = null;
</script>

<Form formName="Post" action={() => postsStore.createPost(title, description, file)}>
  <FormFile bind:input={file} inputName="file" />
  <FormInput bind:input={title} inputName="Title" />
  <FormTextArea bind:input={description} inputName="Story" />
  <Button insideText="Upload" type="submit" />
</Form>
