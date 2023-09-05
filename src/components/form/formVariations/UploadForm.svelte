<script>
  import Button from "../../Button.svelte";
  import FormInput from "../FormInput.svelte";
  import FormTextArea from "../FormTextArea.svelte";
  import FormFile from "../FormFile.svelte";
  import Form from "../Form.svelte";
  import { postsStore } from "../../../stores/postsStore";

  let title = "";
  let description = "";
  let tags;
  let file = null;
  let price = 0;
  export let isProduct;
</script>
{#if !isProduct}
<Form formName="Post">

  <FormFile bind:input={file} inputName="file" />
  <FormInput bind:input={title} inputName="Title" />
  <FormTextArea bind:input={description} inputName="Story" />
  <Button insideText="Upload" type="submit" action={async() => await postsStore.createPost(title, description, file)} />
</Form>
{:else}
<Form formName="Post">
  <FormInput bind:input={title} inputName="Title" />
  <FormFile bind:input={file} multiple={true} inputName="file"/>
  <FormTextArea bind:input={description} inputName="description" />
  <FormTextArea bind:input={tags} inputName="tags" />
  <FormInput bind:input={price} inputName="Price" />
  <Button insideText="Upload" type="Upload" action={async() => await postsStore.createProduct(title, description, file,tags,price)}/>
</Form>
{/if}