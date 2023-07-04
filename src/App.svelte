<script>
import router from "page"
import UserFeed from "./pages/UserFeed.svelte";
import UserMarketplace from "./pages/UserMarketplace.svelte";
import Dashboard from "./pages/Dashboard.svelte";
import NavBar from "./components/NavBar.svelte";
import Signup from "./pages/Signup.svelte";
import Login from "./pages/Login.svelte";
import SearchPageResult from "./pages/SearchPageResult.svelte";

let page;
let params;
router('/', () => page = UserFeed)
router('/login', () => page = Login)
router('/signup', () => page = Signup)
router('/marketplace', () => page = UserMarketplace)
router('/dashboard', () => page = Dashboard)
router('/search/:where/:what', (ctx,next) => {
    params = ctx.params
    next();
},() => page = SearchPageResult)

router.start();
</script>
<NavBar></NavBar>
<main>
    <svelte:component this="{page}" params="{params}" />
</main>