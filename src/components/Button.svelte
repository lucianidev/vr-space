<script>
    export let insideText;
    export let isContainigLink = false;
    export let link = "";
    export let action;
    let isButtonClicked = false;
    let currentVisibility;

    const disable = () => {
        const disabledClass = isButtonClicked ? "btn-disabled" : " ";
        isButtonClicked = true;
        currentVisibility =  disabledClass;
};
</script>

<button class="btn btn-primary rounded-full {currentVisibility}" on:click={action()} on:click={disable}>
    {#if isContainigLink}
        <a href={link}>{insideText}</a>
    {:else}
        {insideText}
    {/if}
</button>