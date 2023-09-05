<script>
  import { fade } from "svelte/transition";
  import { postsStore } from "../../../stores/postsStore";
  import { cutText } from "../../../utils/cutText";
  import { imagesToId } from "../../../utils/convertImagesToId";
  import Button from "../../Button.svelte";
  import Carousel from "../../Carousel.svelte";
  import Avatar from "../../Avatar.svelte";
  import FormInput from "../../form/FormInput.svelte";
  import FormTextArea from "../../form/FormTextArea.svelte";
  import FormFile from "../../form/FormFile.svelte";
  import { ID, Storage, Client } from "appwrite";

  export let title;
  export let description;
  export let username;
  export let price;
  export let images;
  export let avatar;
  export let id;
  export let showActions;

  let newTitle = title;
  let newDescription = description;
  let newPrice = price;
  let newImages = images;
  let files = null;
  const client = new Client();
  const storage = new Storage(client);
        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18"); // Your project ID
</script>

<div
  transition:fade
  on:click|stopPropagation
  class="card  gradient-border rounded-2xl w-full shadow-xl"
>
  <div class="card-body justify-between">
    <div class="flex items-center	justify-center">
        <Avatar avatarId={avatar} username={username} size={"small"}></Avatar>
      <p class="m-2">{username}</p>
      {#if showActions}
      <div class="dropdown dropdown-left">
        <label tabindex="0" class="btn m-1 bg-black">Options</label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a on:click={async() => {
              await postsStore.removeDocument("6492fa03477ec93ae650", "649c37a515560d0fd35f", id);

              images.forEach(async(imageId) => {
                await postsStore.removeImage("6499546407c2dc5f2d10", imageId);
              });
              window.location.reload();
          }}>Delete</a></li>

          <li>
            <a href="#{id}" >Modify</a>
          </li>
        </ul>
      </div>

      <div  class="modal" id="{id}">
        <div class="modal-box">
          {#each images as image, i}
          <div id={`modify-${image}`} class="carousel-item w-full">
              <img src={postsStore.preview('6499546407c2dc5f2d10', image)} class="w-full my-3" />
            </div> 
            <Button insideText="delete" action={async() => {
                            newImages = newImages.slice(i,1);
                            await postsStore.modifyDocument("6492fa03477ec93ae650", "649c37a515560d0fd35f", id, {
                              images_id : newImages
          })
                            await postsStore.removeImage("6499546407c2dc5f2d10", image);
            }} ></Button>
          {/each}
          <FormFile bind:input={files} multiple={true} inputName="file"/>
                    <FormInput bind:input={newTitle} inputName="Title" />
          <FormTextArea bind:input={newDescription} inputName="Description" />
          <FormInput bind:input={newPrice} inputName="Price" />
          <Button insideText="Upload" type="submit" action={async() => await postsStore.modifyDocument("6492fa03477ec93ae650", "649c37a515560d0fd35f", id, {
            title : newTitle,
            description : newDescription,
            price : newPrice,
            images_id : (await imagesToId(storage, files, ID.unique())).concat(images),
          })
          } />
            <a href="#" class="btn mx-2">close</a>
          </div>
        </div>
    {/if}
    </div>
    <Carousel images={images}></Carousel>
    <div>
      <h2 class="card-title">{title}</h2>  
      <p>{description}</p>
      <div>{`${price}$`}</div>
    </div>
    <a class="btn btn-primary rounded-full" href={`/product/${id}`}>
      Buy
    </a>
  </div>
</div>
