const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [], // menyimpan array of ids
      premium: true,
      isLoaded: false,
      currentView: 'product-display'
    }
  },
  watch: {
    cartItems: {
      handler(newVal) {
        localStorage.setItem('cart', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  mounted() {
    this.isLoaded = true;
    console.log('Vue app mounted successfully');
  },
  methods: {
    updateCart(gameId) {
      const productDisplay = this.$refs.productDisplay;
      const game = productDisplay.sequels.find(g => g.id === gameId);
      
      if (!game) return;

      const existingItem = this.cartItems.find(item => item.id === gameId);
      
      if (existingItem) {
        if (game.qty > existingItem.quantity) {
          existingItem.quantity = (existingItem.quantity || 0) + 1;
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Stok Tidak Cukup',
            text: 'Jumlah stok tidak mencukupi untuk menambah quantity'
          });
        }
      } else {
        if (game.qty > 0) {
          this.cartItems.push({ id: gameId, quantity: 1 });
        }
      }
    },
    
    decrementCart() {
      if (this.cartItems.length > 0) {
        this.cartItems.pop();
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      }
    },
    showCart() {
      this.currentView = 'cart-detail';
    }
  },
  computed: {
    cart() {
      return this.cartItems.length;
    },
    cartStatus() {
      return this.cart > 0 ? `${this.cart} item(s)` : 'Empty';
    }
  }
});
