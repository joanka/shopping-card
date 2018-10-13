var app = new Vue({
  el: "#app",
  data: {
    product: "Cap",
    image: "img/cap-blue.jpg",
    inStock: true,
    details: ["90% wool", "10% cashmere"],
    variants: [
      {
        variantId: 3476,
        variantColor: "#232c79",
        variantImage: "img/cap-blue.jpg"
      },
      {
        variantId: 8471,
        variantColor: "#558352",
        variantImage: "img/cap-green.jpg"
      },
      {
        variantId: 2563,
        variantColor: "#8a0214",
        variantImage: "img/cap-red.jpg"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart () {
      this.cart +=1
    },
    updateProduct (img) {
      this.image = img
    }
  }
})