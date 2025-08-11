const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      games: [
        { 
          id: 1, 
          name: 'Call Of Duty', 
          price: 299000, 
          image: './assets/images/cod_satu.jpg',
          qty: 5
        },
        { 
          id: 2, 
          name: 'Call Of Duty 2', 
          price: 399000, 
          image: './assets/images/cod_dua.jpg',
          qty: 8
        },
        { 
          id: 3, 
          name: 'Call Of Duty 3', 
          price: 499000, 
          image: './assets/images/cod_tiga.jpg',
          qty: 10
        },
      ]
    }
  },
  computed: {
    groupedItems() {
      return this.cartItems.map(item => {
        const game = this.games.find(g => g.id === item.id);
        return {
          ...game,
          quantity: item.quantity || 1
        };
      });
    },
    totalPrice() {
      return this.formatPrice(this.groupedItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0));
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async updateQuantity(gameId, change) {
      const item = this.cartItems.find(item => item.id === gameId);
      const game = this.games.find(g => g.id === gameId);
      
      if (!item || !game) return;

      if (change > 0) {
        if (item.quantity < game.qty) {
          item.quantity = (item.quantity || 1) + 1;
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Stok Tidak Cukup',
            text: 'Jumlah stok tidak mencukupi untuk menambah quantity'
          });
        }
      } else if (change < 0) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          const result = await Swal.fire({
            title: 'Konfirmasi Hapus',
            text: "Apakah anda yakin ingin menghapus item ini dari keranjang?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
          });

          if (result.isConfirmed) {
            this.removeItem(gameId);
            Swal.fire(
              'Terhapus!',
              'Item telah dihapus dari keranjang.',
              'success'
            );
          }
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },

    removeItem(gameId) {
      this.cartItems = this.cartItems.filter(item => item.id !== gameId);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
});
