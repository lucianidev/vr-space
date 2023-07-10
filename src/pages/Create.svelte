<script>
    import UploadForm from "../components/form/formVariations/UploadForm.svelte";
    import { userState } from "../stores/userStores";
    let isPost = 'post';
</script>

{#if $userState.isLogged}
<div class="flex items-center justify-center flex-col  my-9 w-full	 lg:flex-row	">
    <h2 class="p-4 cursor-pointer lg: hover:underline" on:click={() => (isPost = true)}>POSTS</h2>
    <h2 class="p-4 cursor-pointer lg: hover:underline" on:click={() => (isPost = false)}>PRODUCTS</h2>
  </div>
{#if isPost}
<UploadForm isProduct={false}></UploadForm>
{:else}
<UploadForm isProduct={true}></UploadForm>
{/if}
{/if}