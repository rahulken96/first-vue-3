app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: false,
      validator: function(value) {
        return typeof value === 'boolean'
      }
    }
  },
  emits: ['add-to-cart'],
  template: `
    <div class="product-display">
      <div class="product-container">
        <!-- Product Image Section -->
        <div class="product-image">
          <img 
            :src="image" 
            :alt="game"
            :class="{ 'out-of-stock-img': !isStock && isLoaded }"
          />
        </div>
        
        <!-- Product Details Section -->
        <product-detail
          :title="title"
          :is-stock="isStock"
          :shipping="shipping"
          :sequels="filteredSequels"
          :series="series"
          @update-image="updateImage"
          @add-to-cart="addToCart"
        ></product-detail>
      </div>
    </div>
  `,
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
          color: '#4A90E2',
          qty: 5,
          seriesId: 1
        },
        {
          id: 2,
          name: 'Call Of Duty 2',
          image: './assets/images/cod_dua.jpg',
          color: '#7ED321',
          qty: 0,
          seriesId: 2
        },
        {
          id: 3,
          name: 'Call Of Duty 3',
          image: './assets/images/cod_tiga.jpg',
          color: '#F5A623',
          qty: 10,
          seriesId: 3
        },
      ],
      
      series: [
        {
          id: 1,
          name: 'Black Ops',
          description: 'Covert operations and espionage'
        },
        {
          id: 2,
          name: 'Modern Warfare',
          description: 'Contemporary military combat'
        },
        {
          id: 3,
          name: 'World At War',
          description: 'World War II setting'
        },
      ],
      
      selectedSeries: null, // Tambahan untuk filter series
      cart: [], // Tracking items dalam cart
      searchQuery: '',
      loading: false
    }
  },
  mounted() {
    this.isLoaded = true;
    console.log('ProductDisplay component mounted');
  },
  methods: {
    addToCart() {
      const currentSequel = this.sequels.find(s => s.name === this.game);
      if (currentSequel && currentSequel.qty > 0) {
        currentSequel.qty--;
        this.$emit('add-to-cart', currentSequel.id);
        this.isStock = currentSequel.qty > 0;
      }
    },
    isInCart(sequelId) {
      return this.$parent.cartItems.some(item => item.id === sequelId);
    },
    updateImage(sequel) {
      this.image = sequel.image;
      this.game = sequel.name;
      this.isStock = sequel.qty > 0;
      console.log(`Updated to ${sequel.name}, Stock: ${sequel.qty}`);
    },
    filterByGameSeries(seriesId) {
      this.selectedSeries = seriesId;
    },
    
    resetFilters() {
      this.selectedSeries = null;
    }
  },
  computed: {
    title() {
      return `${this.game}`;
    },
    shipping() {
      return this.premium ? 'Gratis' : 'Berbayar';
    },
    stockStatus() {
      const currentSequel = this.sequels.find(s => s.name === this.game);
      return currentSequel && currentSequel.qty > 0 ? 'Tersedia' : 'Stok Kosong';
    },
    filteredSequels() {
      let result = this.sequels;
      if (this.searchQuery) {
        result = result.filter(sequel => 
          sequel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedSeries) {
        result = result.filter(sequel => sequel.seriesId === this.selectedSeries);
      }
      return result;
    },
    
    totalStock() {
      return this.sequels.reduce((total, sequel) => total + sequel.qty, 0);
    },
    cartQuantity() {
      const currentSequel = this.sequels.find(s => s.name === this.game);
      if (!currentSequel) return 0;
      return this.$parent.cartItems.filter(item => item.id === currentSequel.id).length;
    }
  },
});
