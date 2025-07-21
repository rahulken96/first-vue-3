const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      game: 'Call Of Duty',
      image: './assets/images/cod_satu.jpg',
      isStock: false,
      
      sequels: [
        {
          id: 1,
          name: 'Call Of Duty',
          image: './assets/images/cod_satu.jpg',
        },
        {
          id: 2,
          name: 'Call Of Duty 2',
          image: './assets/images/cod_dua.jpg',
        },
        {
          id: 3,
          name: 'Call Of Duty 3',
          image: './assets/images/cod_tiga.jpg',
        },
      ],
      series: [
        {
          id: 1,
          name: 'Black Ops'
        },
        {
          id: 2,
          name: 'Modern Warfare'
        },
        {
          id: 3,
          name: 'World At War'
        },
      ],
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    decrementCart() {
      this.cart -= 1
    },
    updateImage(image) {
      this.image = image
    }
  },
})
