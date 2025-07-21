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
          color: 'blue',
        },
        {
          id: 2,
          name: 'Call Of Duty 2',
          image: './assets/images/cod_dua.jpg',
          color: 'green',
        },
        {
          id: 3,
          name: 'Call Of Duty 3',
          image: './assets/images/cod_tiga.jpg',
          color: 'yellow',
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
    updateImage(sequel) {
      this.image = sequel.image
      this.game = sequel.name
    }
  },
})
