app.component('product-detail', {
  props: {
    title: String,
    isStock: Boolean,
    shipping: String,
    sequels: Array,
    series: Array
  },
  emits: ['update-image', 'add-to-cart'],
  template: 
  /* html */
  `<div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="isStock">Tersedia</p>
    <p v-else>Stok Kosong</p>
    
    <p>Biaya Ongkos : {{ shipping }}</p>
    <p>Sekuel dari series ini :</p>
    <div class="sequel-list">
      <div
        v-for="sequel in sequels"
        :key="sequel.id"
        class="sequel-item"
      >
        <button
          class="color-btn"
          :style="{ backgroundColor: sequel.color }"
          @mouseover="$emit('update-image', sequel)"
        >
          {{ sequel.name }}
          <span class="qty-badge" v-if="sequel.qty > 0">{{ sequel.qty }}</span>
          <span class="qty-badge sold-out" v-else>Habis</span>
        </button>
      </div>
    </div>

    <p>Macam - macam series lainnya :</p>
    <ul>
      <li v-for="seri in series" :key="seri.id">
        ID: {{ seri.id }} - {{ seri.name }}
      </li>
    </ul>
    <button
      class="button"
      @click="$emit('add-to-cart')"
      :class="{disabledButton: !isStock}"
      :disabled="!isStock"
    >
      + Tambah
    </button>
  </div>`,
})
