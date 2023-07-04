<script>
  import Avatar from "./Avatar.svelte";
  export let username;
  export let avatardId;
  export let userId; // when you create profile page use it when routing
</script>

<a class="card-body">
  <div class="flex bg-base-100 p-5 rounded-xl items-center justify-start">
    <Avatar avatarId={avatardId} {username} size="10" />
    <p class="m-2">{username}</p>
  </div>
</a>
