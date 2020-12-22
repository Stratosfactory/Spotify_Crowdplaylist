import { createWebHistory, createRouter } from "vue-router";
import userView from "../components/userview/userview"
import adminView from "../components/admin/adminView"

const routes = [{
        path: "/",
        name: "Home",
        component: userView,
    },
    {
        path: "/admin",
        name: "Admin",
        component: adminView,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;