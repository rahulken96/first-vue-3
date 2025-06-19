const app = Vue.createApp({
  data() {
    return {
      game: 'Call Of Duty',
      image: './assets/images/cod_satu.jpg',
      isStock: false,
      sequels: [
        'Call Of Duty',
        'Call Of Duty 2',
        'Call Of Duty 3',
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
})
