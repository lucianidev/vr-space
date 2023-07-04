<script>
import {Router, Link, Route} from "svelte-routing"
import UserFeed from "./pages/UserFeed.svelte";
import UserMarketplace from "./pages/UserMarketplace.svelte";
import Dashboard from "./pages/Dashboard.svelte";
import NavBar from "./components/NavBar.svelte";
import Signup from "./pages/Signup.svelte";
import Login from "./pages/Login.svelte";
import SearchPageResult from "./pages/SearchPageResult.svelte";
export let url = "/";

</script>


<Router {url}>
    <NavBar></NavBar>
    <Route path="/search/:where/:what" component={SearchPageResult}></Route>
    <Route path="/marketplace" component={UserMarketplace}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/signup" component={Signup}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/"><UserFeed></UserFeed></Route>
</Router>