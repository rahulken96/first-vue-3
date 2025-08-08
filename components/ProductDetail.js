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
    <ul>
      <li
        v-for="sequel in sequels"
        :key="sequel.id"
        @mouseover="$emit('update-image', sequel)"
        style="cursor: pointer"
        :style="{backgroundColor: sequel.color}"
        class="color-circle"
      >
        {{ sequel.name }}
      </li>
    </ul>

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
