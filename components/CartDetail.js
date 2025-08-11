app.component('cart-detail', {
  template: `
    <div class="cart-detail">
      <h2>Shopping Cart Detail</h2>
      <table class="cart-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td><img :src="getGameImage(item.id)" class="cart-item-image"></td>
            <td>{{ getGameName(item.id) }}</td>
            <td>Rp {{ getGamePrice(item.id) }}</td>
            <td>
              <button class="btn-sm" @click="removeFromCart(item.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total:</td>
            <td colspan="2">Rp {{ totalPrice }}</td>
          </tr>
        </tfoot>
      </table>
      <button class="button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Back to Shop
      </button>
    </div>
  `,
  data() {
    return {
      games: [
        { id: 1, name: 'Call Of Duty', price: 299000, image: './assets/images/cod_satu.jpg' },
        { id: 2, name: 'Call Of Duty 2', price: 399000, image: './assets/images/cod_dua.jpg' },
        { id: 3, name: 'Call Of Duty 3', price: 499000, image: './assets/images/cod_tiga.jpg' },
      ]
    }
  },
  computed: {
    cartItems() {
      return this.$parent.cartItems;
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        const game = this.games.find(g => g.id === item.id);
        return total + (game ? game.price : 0);
      }, 0);
    }
  },
  methods: {
    getGameImage(id) {
      return this.games.find(g => g.id === id)?.image;
    },
    getGameName(id) {
      return this.games.find(g => g.id === id)?.name;
    },
    getGamePrice(id) {
      return this.games.find(g => g.id === id)?.price;
    },
    removeFromCart(id) {
      this.$parent.cartItems = this.$parent.cartItems.filter(item => item.id !== id);
    },
    goBack() {
      this.$parent.currentView = 'product-display';
    }
  }
});
