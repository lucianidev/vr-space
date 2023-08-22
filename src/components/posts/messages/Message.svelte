<script>
      import { Client, Storage } from "appwrite";
      import {cutText} from "../../../utils/cutText"
      import { fade } from "svelte/transition"
  import Avatar from "../../Avatar.svelte";
  import { postsStore } from "../../../stores/postsStore";
  import FormInput from "../../form/FormInput.svelte";
  import FormTextArea from "../../form/FormTextArea.svelte";
  import Button from "../../Button.svelte";
  import Icons from "../Icons.svelte";
      export let title;
      export let message;
      export let username;
      export let image;
      export let avatar;
      export let showActions;
      export let id;
      let newTitle = title;
      let newDescription = message;
      const client = new Client();
      const storage = new Storage(client);

        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18");
// create icons for actions

</script>

<div transition:fade on:click|stopPropagation class="card bg-black gradient-border rounded-2xl w-full shadow-xl">
  {#if image}
    <div class="card-body">
      <div class="flex items-center	justify-center">
        <Avatar avatarId={avatar} username={username} size={"small"}></Avatar>
        <p class="m-2 ">{username}</p>
        {#if showActions}
        <div class="dropdown dropdown-left">
          <label tabindex="0" class="btn m-1 bg-black">Options</label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li on:click={async() => {
              await postsStore.removeDocument("6492fa03477ec93ae650", "6492fa0b59b3b4f615fa", id);
              await postsStore.removeImage("6499546407c2dc5f2d10", image);
              window.location.reload();
            }}><a>Delete</a></li>
                          <li>
                            <a href="#{id}" >Modify</a>
                          </li>
          </ul>
        </div>
        

        <div  class="modal" id="{id}">
          <div class="modal-box">
            <FormInput bind:input={newTitle} inputName="Title" />
            <FormTextArea bind:input={newDescription} inputName="Description" />
            <Button insideText="Upload" type="submit" action={async() => await postsStore.modifyDocument("6492fa03477ec93ae650", "6492fa0b59b3b4f615fa", id, {
              title : newTitle,
              description : newDescription,
            })} />
              <a href="#" class="btn mx-2">close</a>
            </div>
          </div>
        {/if}
      </div>
        <figure><img src={postsStore.preview('6499546407c2dc5f2d10', image)} alt="Shoes" /></figure>
      <h2 class="py-1 card-title gradient-text">{title}</h2>
      <p class="py-5">{message}</p>
      <slot></slot>
    </div>

    {:else}
    <div class="card-body">
      <div class="flex items-center	justify-center">
        <Avatar avatarId={avatar} username={username} size={"small"}></Avatar>
        <p class="m-2 ">{username}</p>
          {#if showActions}
          <div class="dropdown dropdown-left">
            <label tabindex="0" class="btn m-1 bg-black">Options</label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li on:click={async() => {
              await postsStore.removeDocument("6492fa03477ec93ae650", "6492fa0b59b3b4f615fa", id);
              window.location.reload();
              }}><a>Delete</a></li>

              <li>
                <a href="#{id}" >Modify</a>
              </li>

            </ul>
          </div>

          <div  class="modal" id="{id}">
            <div class="modal-box">
              <FormInput bind:input={newTitle} inputName="Title" />
              <FormTextArea bind:input={newDescription} inputName="Description" />
              <Button insideText="Upload" type="submit" action={async() => await postsStore.modifyDocument("6492fa03477ec93ae650", "6492fa0b59b3b4f615fa", id, {
                title : newTitle,
                description : newDescription,
              })} />
                <a href="#" class="btn mx-2">close</a>
              </div>
            </div>

          {/if}
      </div>
      <h2 class="card-title gradient-text">{title}</h2>
      <p>{cutText(message)}</p>
      <slot></slot>
</div>

  {/if}

</div>