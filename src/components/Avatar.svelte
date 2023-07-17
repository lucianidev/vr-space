<script>
  import { postsStore } from "../stores/postsStore";
  export let avatarId;
  export let username;
  export let size;
</script>

<div class="avatar items-center justify-center">
  <div class="{`w-${size}`} rounded-full flex">
    {#if avatarId}
      <img src={postsStore.preview("649aee3bd70a6aa2cb34", avatarId)} alt="" />
    {:else}
      <img
        src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`}
        alt=""
      />
    {/if}
  </div>
  <slot></slot>
</div>
