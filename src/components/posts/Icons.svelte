<script>
  import { postsStore } from "../../stores/postsStore";

  console.log($postsStore.postId);
  function copyLinkToclipboard() {
    const id = $postsStore.postId;
    navigator.clipboard.writeText(window.location.hostname +   '/share/' + id);
    console.log('hhh');
  }

  let showNotification = false;

  console.log(window.location.hostname);
  // implement like calls database and do stuff
  // share copy to clipboard the id of the post
  // for openig a shared link read it through the parameters of the link, then open it with in a single page. show content in a card
  // implement change of heart on click
</script>

<ul class="flex justify-between items-end w-full">
  <li class="w-8 h-8 m-1">
    <img
      class=""
      src="../../../assets/heart.svg"
      alt=""
      on:click={() =>
        postsStore.ispostIsLiked(postdId).then(async (isLiked) => {
          if (isLiked) return;
          postsStore.likePost($postsStore.postId, $postsStore.username);
        })}
    />
  </li>

  <li class="	 m-1">
    <a href="#{$postsStore.postId}" class="">
        <img class="" on:click={() => {
            copyLinkToclipboard() ;
            }} src="../../../assets/copy.svg" alt="" />
    </a>
  </li>


</ul>
{#if showNotification}
<div class="modal" id="{$postsStore.postId}">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">copied link</p>
      <div class="modal-action">
       <a href="#" class="btn">Yay!</a>
      </div>
    </div>
  </div>
 
{/if}