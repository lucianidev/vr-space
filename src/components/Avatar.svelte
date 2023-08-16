<script>
  import { userState } from "../stores/userStores";
  import { postsStore } from "../stores/postsStore";

  export let avatarId;
  export let username;
  export let size;
</script>

<div class="avatar items-center  justify-center">


    {#if size==="big"}
      <div class="w-48 rounded-full flex">
        {#if $userState.avatarId}
        <img src={postsStore.preview("649aee3bd70a6aa2cb34",avatarId)} alt="" />
      {:else}
        <img
          src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`}
          alt=""
        />
      {/if}
    </div>
    {:else if size==="medium"}
    <div class="w-20 rounded-full flex">
      {#if $userState.avatarId}
      <img src={postsStore.preview("649aee3bd70a6aa2cb34",avatarId)} alt="" />
    {:else}
      <img
        src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`}
        alt=""
      />
    {/if}
  </div>
  {:else if size === "small"}
  <div class="w-10 rounded-full flex">
    {#if $userState.avatarId}
    <img src={postsStore.preview("649aee3bd70a6aa2cb34",avatarId)} alt="" />
  {:else}
    <img
      src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`}
      alt=""
    />
  {/if}
</div>
  {/if}
  <slot></slot>
</div>
