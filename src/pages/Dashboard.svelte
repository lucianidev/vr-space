<script>
  import { onMount } from "svelte";
  import Avatar from "../components/Avatar.svelte";
  import { userState } from "../stores/userStores";

  onMount(async () => {
    await userState.isLogged();
  });
</script>

{#if $userState.isLogged}
<div class="grid place-items-center">
    <div class="flex w-3/12 items-center justify-between">
        <Avatar size="48"/>
        <h1 class="text-2xl">{$userState.username}</h1>
      </div>
      <div class="grid place-items-center w-2/12">
            
        <div />
      </div>
</div>
{:else}
<p>redirecting to signup</p>
{/if}
