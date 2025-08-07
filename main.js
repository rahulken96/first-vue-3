const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      game: 'Call Of Duty',
      brand: 'Kenz\'s Game',
      image: './assets/images/cod_satu.jpg',
      isStock: true,
      isLoaded: false,
      
      sequels: [
        {
          id: 1,
          name: 'Call Of Duty',
          image: './assets/images/cod_satu.jpg',
          color: 'blue',
          qty: 5,
        },
        {
          id: 2,
          name: 'Call Of Duty 2',
          image: './assets/images/cod_dua.jpg',
          color: 'green',
          qty: 0,
        },
        {
          id: 3,
          name: 'Call Of Duty 3',
          image: './assets/images/cod_tiga.jpg',
          color: 'yellow',
          qty: 10,
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
  mounted() {
    this.isLoaded = true;
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
      this.isStock = sequel.qty < 1 ? false : true
    }
  },
  computed: {
    title() {
      return this.brand + ' : ' + this.game
    }
  }
})
