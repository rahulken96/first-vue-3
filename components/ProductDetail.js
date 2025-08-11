app.component('product-detail', {
  props: {
    title: {
      type: String,
      required: true
    },
    isStock: {
      type: Boolean,
      required: true
    },
    shipping: {
      type: String,
      required: true
    },
    sequels: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-image', 'add-to-cart'],
  template: `
    <div class="product-info">
      <div v-if="loading" class="loading-spinner">Loading...</div>
      <input 
        type="text" 
        v-model="$parent.searchQuery" 
        placeholder="Search games..."
        class="search-input"
      >
      <!-- Product Title -->
      <h1>{{ title }}</h1>
      
      <!-- Stock Status -->
      <p class="stock-status" :class="stockClass">
        {{ stockMessage }}
      </p>
      
      <!-- Shipping Information -->
      <p class="shipping-info">
        <strong>Biaya Ongkos:</strong> {{ shipping }}
      </p>
      
      <!-- Sequels Section -->
      <div class="sequels-section">
        <h3>Sekuel dari series ini:</h3>
        <ul class="sequels-list">
          <li
            v-for="sequel in sequels"
            :key="sequel.id"
            @mouseover="updateImage(sequel)"
            @click="updateImage(sequel)"
            class="sequel-item"
            :class="{ 'out-of-stock': sequel.qty === 0 }"
            :style="{ backgroundColor: sequel.color }"
            :title="sequel.name + ' - Stock: ' + sequel.qty"
          >
            <span class="sequel-name">{{ sequel.name }}</span>
            <span class="sequel-qty">({{ sequel.qty }})</span>
          </li>
        </ul>
      </div>

      <!-- Series Section -->
      <div class="series-section">
        <h3>Macam-macam series lainnya:</h3>
        <ul class="series-list">
          <li v-for="seri in series" :key="seri.id" class="series-item">
            <strong>{{ seri.name }}</strong>
            <span v-if="seri.description" class="series-description">
              - {{ seri.description }}
            </span>
          </li>
        </ul>
      </div>
      
      <!-- Add to Cart Button -->
      <button
        class="button add-to-cart-btn"
        @click="addToCart"
        :class="{ 'disabledButton': !isStock, 'in-cart': $parent.cartQuantity > 0 }"
        :disabled="!isStock"
        :title="getButtonTitle"
      >
        <i class="fas" :class="$parent.cartQuantity > 0 ? 'fa-shopping-bag' : 'fa-cart-plus'"></i>
        {{ buttonText }}
        <span v-if="$parent.cartQuantity > 0" class="cart-quantity">({{ $parent.cartQuantity }})</span>
      </button>
    </div>
  `,
  computed: {
    stockClass() {
      return this.isStock ? 'in-stock' : 'out-of-stock';
    },
    stockMessage() {
      return this.isStock ? '✅ Tersedia' : '❌ Stok Kosong';
    },
    currentSequelId() {
      return this.sequels.find(s => s.name === this.$parent.game)?.id;
    },
    buttonText() {
      if (!this.isStock) return 'Stok Kosong';
      return this.$parent.cartQuantity > 0 ? 'Dalam Keranjang' : '+ Tambah ke Keranjang';
    },
    getButtonTitle() {
      if (!this.isStock) return 'Stok tidak tersedia';
      return this.$parent.cartQuantity > 0 
        ? `${this.$parent.cartQuantity} item dalam keranjang` 
        : 'Tambah ke keranjang';
    }
  },
  methods: {
    updateImage(sequel) {
      this.$emit('update-image', sequel);
    },
    addToCart() {
      if (this.isStock) {
        const currentSequel = this.sequels.find(s => s.name === this.$parent.game);
        if (currentSequel) {
          this.$emit('add-to-cart', currentSequel.id);
        }
      }
    }
  }
});
