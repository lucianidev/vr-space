<script>
    export let input = "";
    export let inputName;
</script>

<div class="form-control">
    <label for={inputName} class="label">
      <span id={inputName} class="label-text text-white">{inputName}</span>
    </label>
    <textarea bind:value={input} class="placeholder:text-white textarea textarea-bordered h-24 bg-black border-white text-white" placeholder="here"></textarea>
</div>