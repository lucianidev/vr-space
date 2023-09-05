<script>
  import Avatar from "./Avatar.svelte";
  export let username;
  export let avatardId;
</script>

<a href={`/profile/${username}`} class="card-body">
  <div class="flex bg-base-100 p-5 rounded-xl items-center justify-start">
    <Avatar avatarId={avatardId} username={username} size={"small"} />
    <p class="m-2">{username}</p>
  </div>
</a>
