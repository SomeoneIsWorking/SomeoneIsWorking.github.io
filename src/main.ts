import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import ProjectDetailView from "./views/ProjectDetailView.vue";
import "./styles.css";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/projects/:slug", name: "project", component: ProjectDetailView },
    { path: "/:pathMatch(.*)*", name: "not-found", component: ProjectDetailView },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

createApp(App).use(router).mount("#app");
