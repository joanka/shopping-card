Vue.component('Product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:`
  <div className="product-wrapper">
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
          <button class="btn" @click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">
          Add to cart
          </button>
          <button class="btn" @click="removeFromCart"
            >
          Remove from cart
          </button>
        </div>
      </div>
    </div>
    <div class="product-review">
      <button class="btn" @click="productReview = !productReview">Write a review >></button>
      <Product-review class="product-review__form" v-if="productReview" @review-submitted="addReview"></Product-review>
      <div class="product-review__group">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul class="product-review__list" v-else>
          <li class="product-review__item" v-for="(review, index) in reviews" :key="index">
            <p>Name: {{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>Review: {{ review.review }}</p>
            <p>Recommended: {{ review.recommend }}</p>
          </li>
        </ul>
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
      ],
      productReview: false,
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    addReview(productReview) {
      this.reviews.push(productReview);
      this.productReview = false;
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


Vue.component('Product-review', {
  template: `
      <form class="review-form" @submit.prevent="onSubmit">

        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>

        <p>
          <input type="submit" value="Submit">
        </p>

    </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors.length = 0;
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if (!this.name) this.errors.push("Name required.")
        if (!this.review) this.errors.push("Review required.")
        if (!this.rating) this.errors.push("Rating required.")
        if (!this.recommend) this.errors.push("Recommendation required.")
      }
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
    },
    removeItem(id) {
      this.cart = this.cart.splice(id, 1);
    }
  }
})

