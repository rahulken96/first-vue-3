app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: 
  /* html */
  `<div class="product-display">
      <div class="product-container">
        <div class="product-image-container">
          <div class="image-frame">
            <img :src="image" :class="{'out-of-stock-img': !isStock && isLoaded}"/>
          </div>
        </div>
        
        <!-- Kirim props + event handler ke product-detail -->
        <product-detail
          :title="title"
          :is-stock="isStock"
          :shipping="shipping"
          :sequels="sequels"
          :series="series"
          @update-image="updateImage"
          @add-to-cart="addToCart"
        ></product-detail>
      </div>
    </div>`,
  data() {
    return {
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
      this.$emit('add-to-cart')
    },
    updateImage(sequel) {
      this.image = sequel.image
      this.game = sequel.name
      this.isStock = sequel.qty > 0
    }
  },
  computed: {
    title() {
      return this.brand + ' : ' + this.game
    },
    shipping() {
      return this.premium ? 'Gratis' : 'Berbayar'
    },
  },
})
