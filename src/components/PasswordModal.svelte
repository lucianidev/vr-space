<script>
    import FormPassword from "./form/FormPassword.svelte";
    export let password = "";
    export let id = "";
</script>


<div class="modal" id="password_{id}">
    <div class="modal-box">
      <FormPassword inputName="Insert password" bind:input={password}></FormPassword>
      <div class="modal-action flex justify-between">
       <a href="#" class="btn">close</a>
       <a href="#">
        <slot {password}></slot>
       </a>
      </div>
    </div>
  </div>