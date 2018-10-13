Vue.component('Product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:`
    <div class="product-card">
      <div class="product-card__image">
        <img :src="image" />
      </div>
      <div class="product-card__info product-info">
        <h1>{{ product }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else class="outOfStock">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <ul class="product-info__list">Material:
          <li class="product-info__item" v-for="detail in details">{{ detail }}</li>
        </ul>
        <div class="product-info__color"
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          :style="{ backgroundColor: variant.variantColor}"
          @mouseover="updateProduct(index)">
        </div>
        <div class="product-card__cta">
          <button @click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">
          Add to cart
          </button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: "Cap",
      inStock: true,
      selectedVariant: 0,
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
      ]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    image(){
      return this.variants[this.selectedVariant].variantImage
    },
    shipping() {
      if(this.premium) {
        return "Free"
      }
      return 3
    }
  }
})

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }

})

