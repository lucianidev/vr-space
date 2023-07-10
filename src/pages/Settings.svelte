<script>
    import Button from "../components/Button.svelte";
import Form from "../components/form/Form.svelte";
import FormInput from "../components/form/FormInput.svelte";
  import FormPassword from "../components/form/FormPassword.svelte";
  import AvatarChange from "../components/form/formVariations/AvatarChange.svelte";
  import { userState } from "../stores/userStores";
    let username = "";
    let email = "";
    let password = "";
    let newPassword = "";
    let oldPassword = "";
</script>

<!-- component -->
<!-- component -->
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
                        <FormPassword inputName="Insert password" bind:input={password}></FormPassword>
                        <Button insideText="Change" type="submit" action={async() => await userState.changeEmail(email, password)}></Button>
                    </div>
                    <div class='w-full md: px-3 mb-6 '>
                        <FormPassword inputName="Old password" bind:input={oldPassword}></FormPassword>
                        <FormPassword inputName="New password" bind:input={newPassword}></FormPassword>
                        <Button insideText="Change" type="submit" action={async() => await userState.changePassword(oldPassword, newPassword)}></Button>
                    </div>

                    <div class='w-full md: px-3 mb-6 '>
                        <AvatarChange></AvatarChange>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>