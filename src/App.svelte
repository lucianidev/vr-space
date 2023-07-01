<script>
import {Router, Link, Route} from "svelte-routing"
import UserFeed from "./pages/UserFeed.svelte";
import UserMarketplace from "./pages/UserMarketplace.svelte";
import Dashboard from "./pages/Dashboard.svelte";
import NavBar from "./components/NavBar.svelte";
</script>


<Router>
    <NavBar></NavBar>
    <Route path="/" component={UserFeed}></Route>
    <Route path="/marketplace" component={UserMarketplace}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
</Router>