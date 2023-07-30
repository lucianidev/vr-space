<script>
    import Button from "../components/Button.svelte";
import Form from "../components/form/Form.svelte";
import FormInput from "../components/form/FormInput.svelte";
  import FormPassword from "../components/form/FormPassword.svelte";
  import AvatarChange from "../components/form/formVariations/AvatarChange.svelte";
  import { userState } from "../stores/userStores";
  import PasswordModal from "../components/PasswordModal.svelte";
  import User from "../components/User.svelte";
  import { onMount } from "svelte";
    let username = "";
    let email = "";
    let newPassword = "";


    onMount(async() => {
        await userState.isLogged();
    })
</script>

<!-- component -->
<!-- component -->
{#if $userState.isLogged}
<div class="text-white min-h-screen pt-2 my-16">
    <div class="container mx-auto">
        <div class="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 class="text-2xl ">Account Setting</h2>
            <form class="mt-6 border-t border-gray-400 pt-4">
                <div class='flex flex-wrap -mx-3 mb-6'>
                    <div class='w-full md: px-3 mb-6'>
                        <FormInput inputName="Username" bind:input={username}></FormInput>
                        <Button insideText="Change" type="submit" action={async() => await userState.changeUsername(username)}></Button>
                    </div>
                    
                    <div class='w-full md: px-3 mb-6'>
                        <FormInput inputName="Email address" bind:input={email}></FormInput>
                        <PasswordModal let:password id="email">
                            <Button insideText="Change" type="submit" action={async() => await userState.changeEmail(email, password)}></Button>
                            {password}
                        </PasswordModal>      
                        <a href="#password_email" class="btn btn-primary">Change</a>                  
                    </div>
                    <div class='w-full md: px-3 mb-6 '>
                        <FormPassword inputName="New password" bind:input={newPassword}></FormPassword>
                        <PasswordModal let:password let:updatePassword id="newPassword">
                            <Button  insideText="Change" type="submit" action={async() => await userState.changePassword(password, newPassword)}></Button>
                            {password}
                        </PasswordModal>
                        <a href="#password_newPassword" class="btn btn-primary">Change</a>              
                    </div>

                    <div class='w-full md: px-3 mb-6 '>
                        <AvatarChange></AvatarChange>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
{:else}
<p>redirecting to signup</p>

{/if}
<!-- Put this part before </body> tag -->
