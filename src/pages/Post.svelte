<script>
    import Message from "../components/posts/messages/Message.svelte";
    import Icons from "../components/posts/Icons.svelte";
    import { userState } from "../stores/userStores";
    import { postsStore } from "../stores/postsStore";
    import { onMount } from "svelte";

    export let params;
    let id = params.id;
    let post = postsStore.getPost(id).then(data => data);
    console.log(post);
    console.log(id)
    onMount(async () => {
    await userState.isLogged();
  });
</script>
<div class="flex items-center	justify-center w-full my-10">
  <div class="w-full lg:w-9/12">
    {#await post then sharedPost}
    <Message
    username={sharedPost.username}
    title={sharedPost.title}
    message={sharedPost.description}
    image={sharedPost.image_id}
    avatar={sharedPost.avatar_id}
    >
    <Icons></Icons>
    </Message>
  {/await}
  </div>
</div>


