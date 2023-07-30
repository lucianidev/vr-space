<script>
import router from "page"
import UserFeed from "./pages/UserFeed.svelte";
import UserMarketplace from "./pages/UserMarketplace.svelte";
import Dashboard from "./pages/Dashboard.svelte";
import NavBar from "./components/NavBar.svelte";
import Signup from "./pages/Signup.svelte";
import Login from "./pages/Login.svelte";
import SearchPageResult from "./pages/SearchPageResult.svelte";
import ProfilePage from "./pages/ProfilePage.svelte";
import ProductPage from "./pages/ProductPage.svelte";
import Options from "./pages/Settings.svelte";
import Create from "./pages/Create.svelte";

let page;
let params;
router('/', () => page = UserFeed)
router('/login', () => page = Login)
router('/signup', () => page = Signup)
router('/create',() =>  page = Create)
router('/marketplace', () => page = UserMarketplace)
router('/dashboard', () => page = Dashboard)
router('/settings', () => page = Options)
router('/search/:where/:what', (ctx,next) => {
    params = ctx.params;
    next();
},() => page = SearchPageResult)
router('/profile/:name',(ctx,next) => {
    params = ctx.params;
    next();
},() => page = ProfilePage)
router('/product/:id',(ctx,next) => {
    params = ctx.params;
    next();
}, () => page = ProductPage);

router.start();
</script>
<NavBar></NavBar>
<main>
    <svelte:component this="{page}" params="{params}" />
</main>