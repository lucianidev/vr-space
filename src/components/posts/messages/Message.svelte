<script>
      import Icons from "../Icons.svelte";
      import {cutText} from "../../../utils/cutText"
      export let title;
      export let message;
// create icons for actions
</script>


<div class="card bg-base-100 w-full shadow-xl">
    <div class="card-body">
      <div class="avatar flex items-center	justify-start">
        <div class="w-10 rounded-full">
          <img src="https://images.everyeye.it/img-notizie/fast-furious-saga-rivelato-passato-dom-toretto-v3-505357.jpg" />
        </div>
        <p class="m-2 ">don_toretto</p>
      </div>
      <h2 class="card-title">{title}</h2>
      <p>{cutText(message)}</p>
      <div class="card-actions justify-start">
        <Icons></Icons>
      </div>
    </div>
  </div>