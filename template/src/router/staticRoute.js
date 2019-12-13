const staticRoute = [
    {
        path: "/",
        component: (resolve) => {
            require(["../pages/Hello.vue"], resolve)
        }
    },
    {
        path: "/about",
        component: (resolve) => {
            require(["../pages/About.vue"], resolve)
        }
    }
]

export default staticRoute