<script>
    import { postsStore } from "../../stores/postsStore";
    export let likes;
    export let id;
    
  function copyLinkToclipboard() {
    navigator.clipboard.writeText(window.location.hostname +   '/share/' + id);
  }
</script>

<ul class="flex justify-between items-end w-full">
    <li class="flex justify-center items-end w-8 h-8	 m-1">
        <img class="" src="../../../assets/heart.svg" alt="" >
        <span class="mx-1">
            {likes}
        </span>
    </li>

    <li class="	m-1">
        <a href="#{$postsStore.postId}" class="">
            <img class="" on:click={() => {
                copyLinkToclipboard() ;
                }} src="../../../assets/copy.svg" alt="" />
        </a>
      </li>
</ul>