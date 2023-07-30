<script>
    export let likes;
</script>

<ul class="flex justify-between items-end w-full">
    <li class="flex justify-center items-end w-8 h-8	 m-1">
        <img class="" src="../../../assets/heart.svg" alt="" >
        <span class="mx-1">
            {likes}
        </span>
    </li>

    <li class="	 m-1">
        <img class="" src="../../../assets/send.svg" alt="">
    </li>
</ul>