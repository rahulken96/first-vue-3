const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: true,
    }
  },
  mounted() {
    this.isLoaded = true;
  },
  methods: {
    updateCart() {
      this.cart += 1
    },
    decrementCart() {
      this.cart -= 1
    },
  },
})
