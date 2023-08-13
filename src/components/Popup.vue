<template>
    <div class="popup">
        <input type="text" class="popup__search" placeholder="Поиск" v-model="searchQuery">
        <div class="popup__item" v-for="(product, index) in products" >
            <div class="popup__item_inside" v-if="!displayedProducts.includes(product) && filteredList.includes(product)">
                <button class="popup__change" @click="replaceProduct(index)"><img src="../img/arrow_change.svg" alt=""></button>
                <img class="popup__img" :src="product.photo" alt="">
                <span class="popup__name">{{ product.name }}</span>
            </div>
        </div>
    </div>
</template>

<script  lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex'


export default defineComponent({
    name: 'Popup',
    setup() {
        const store = useStore()
        let displayedProducts = computed(() => store.state.displayedProducts)
        let products = computed(() => store.state.products)
        let selectedProductIndex = computed(() => store.state.selectedProductIndex)
        return {
            products,
            displayedProducts,
            selectedProductIndex,
            store,
            searchQuery: ref("")
        }
    },
    methods: {
        replaceProduct(index: number) {
            this.displayedProducts[this.selectedProductIndex] = this.products[index]
        }
    },
    computed: {
        filteredList() {
            return this.products.filter((product: any) => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    }
})

</script>

<style>

.popup {
    display: block;
    width: 421px;
    height: 336px;
    border: 1px #E3E3E3 solid;
    border-radius: 4px;
    overflow-y: auto;
    padding: 18px;
    position: absolute;
    z-index: 9999;
    background-color: #fff;
    font-family: 'Roboto', sans-serif;
}

.popup__search {
    width: 100%;
    height: 47px;
    font-size: 21px;
    font-weight: 400;
    padding: 0 16px;
    box-sizing: border-box;
    border: 1px #C1C1C1 solid;
    border-radius: 4px;
}

::placeholder {
    color: #C1C1C1;
}

.popup__item {
    margin-top: 18px;
}

.popup__item_inside {
    display: flex;
}

.popup__change {
    width: 20px;
    height: 20px;
    border: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
}

.popup__img {
    height: 50px;
    margin-left: 18px;
}

.popup__name {
    font-size: 18px;
    font-weight: 400;
    margin-left: 18px;
    text-align: left;
    margin-top: 8px;
}

</style>
