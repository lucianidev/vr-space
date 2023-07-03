<script>
    import { postsStore } from "../../stores/postsStore";


    const likedPostUser = $postsStore.username;
    const postdId = $postsStore.postId;
    // implement like calls database and do stuff 
    // share copy to clipboard the id of the post
    // for openig a shared link read it through the parameters of the link, then open it with in a single page. show content in a card
    // implement change of heart on click
</script>

<ul class="flex justify-between w-full">
    <li class="w-8 h-8	 m-1">
        <img class="" src="../../../assets/heart.svg" alt="" on:click={() => postsStore.ispostIsLiked(postdId).then(async isLiked => {
            if(isLiked) return;
            postsStore.likePost(postdId, likedPostUser);
        })}>
    </li>

    <li class="	 m-1">
        <img class="" src="../../../assets/send.svg" alt="">
    </li>

    <li class="	 m-1">
        <img class="" src="../../../assets/report.svg" alt="">
    </li>
</ul>