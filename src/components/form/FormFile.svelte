<script>
    export let inputName = "";
    export let input;
</script>

<div class="form-control w-full max-w-xs">
    <label for={inputName} class="label">
      <span id={inputName} class="label-text text-white">{inputName}:</span>
    </label>
    <input type="file" bind:value={input} on:change={(e) => input = e.target.files[0]}
     class="file-input file-input-bordered file-input-primary w-full max-w-xs bg-black text-white"
      />
</div>