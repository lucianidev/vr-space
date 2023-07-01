<script>
  import { postsStore } from "../stores/postsStore";
  export let avatarId;
  export let username;
  export let size;
  export let border;
</script>

<div class="avatar">
  <div class="w-{size} rounded-full">
    {#if avatarId}
      <img src={postsStore.preview("649aee3bd70a6aa2cb34", avatarId)} alt="" />
    {:else}
      <img
        src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`}
        alt=""
      />
    {/if}
  </div>
</div>
