<script>
    export let inputName = "";
    export let input;
    export let multiple;
</script>

<div class="form-control w-full max-w-xs my-4" on:click>
  <label for={inputName} class="label">
    <span id={inputName} class="label-text text-white text-base">{inputName}:</span>
  </label>
  {#if multiple}
    <input type="file" bind:value={input} on:change={(e) => input = e.target.files}
     class="file-input file-input-bordered w-full max-w-xs bg-black text-white"
     multiple/>
    {:else}
    <input type="file" bind:value={input} on:change={(e) => input = e.target.files[0]}
     class="file-input file-input-bordered w-full max-w-xs bg-black text-white"
      />
    {/if}
</div>