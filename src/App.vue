<template>
    <div class="header">
        <h1 class="header__menu">Каталог</h1>
        <div class="header__right">
            <p class="header__name">Сравнение</p>
            <a href="#" class="header__personal">Личный кабинет</a>
        </div>
    </div>
    <div class="body">
        <div class="body__header">
            <h1 class="body__header_name">Смартфоны</h1>
            <div class="body__header_options">
                Отобразить товары:
                    <div class="display-counts">
                        <span class="body__header_option" v-for="count in allowedDisplayCounts"
                            :key="count"
                            :class="{ 'selected': count === displayCount }"
                            @click="updateDisplayedProducts(count)">
                            {{ count }}
                        </span>
                    </div>
            </div>
        </div>
        <div class="body__main">
            <table class="body__table">
                <thead class="body__table_thead">
                    <th class="body__table_th">
                        <input type="checkbox" class="body__table_check" id="diff" name="diff" v-model="showDifferences">
                        <label for="diff" class="body__table_label">Показать различия</label>
                    </th>
                    <th class="body__table_th" v-for="product, index in displayedProducts" :key="index">
                        <img class="body__table_th_photo" :src="product.photo" :alt=product.name />
                        <button class="body__table_th_arrow"  @click="showModal(index)"><img src="./img/arrow_down.svg" alt=""></button>
                        <Popup v-if="modalVisible === index"></Popup>
                        <br><span class="body__table_th_name">{{ product.name }}</span>
                    </th>
                </thead>
                <tbody class="body__table_tbody">
                    <tr class="body__table_tr" v-for="(critname, crit) in criteria" :key="crit">
                        <td class="body__table_td first">{{ critname }}</td>
                        <td class="body__table_td" v-for="(product, index) in displayedProducts" :key="index"> {{ product.parameters[crit] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore, mapState, mapActions } from 'vuex'
import Popup from './components/Popup.vue';

export default defineComponent({
    name: 'App',
    setup() {
        const store = useStore()
        let displayedProducts = computed(() => store.state.displayedProducts)
        let products = computed(() => store.state.products)
        let selectedProductIndex = computed(() => store.state.selectedProductIndex)
        return {
            products,
            displayedProducts,
            selectedProductIndex,
            store
        }
    },
    data() {
        return {
            displayCount: 3,
            allowedDisplayCounts: [2, 3, 4, 5, 6],
            isAllProductsDisplayed: false,
            criteria: {
                "screen": "Экран", 
                "processor": "Процессор",
                "memory": "Память", 
                "battery": "Аккумулятор", 
                "network": "Поддержка сетей", 
                "scanner": "Сканер отпечатка пальцев", 
                "size": "Размеры (ШхВхТ)"
            },
            showDifferences: false,
            modalVisible: -1
        };
    },
    components: { Popup},
    computed: {
        ...mapState(['products', 'displayedProducts'])
    },
    methods: {
        ...mapActions(['setDisplayedProducts']),
        ...mapActions(['setSelectedProductIndex']),
        updateDisplayedProducts(count: number) {
            this.displayCount = count
            if (this.displayCount >= this.products.length) {
                this.isAllProductsDisplayed = true;
                this.setDisplayedProducts = this.products
            } else {
                this.isAllProductsDisplayed = false;
                const newDisplayedValues = this.products.slice(0, this.displayCount);
                this.setDisplayedProducts(newDisplayedValues)
            }
        },
        showModal(index: number) {
            this.setSelectedProductIndex(index)
            if (this.modalVisible === index) this.modalVisible = -1
            else this.modalVisible = index;
        },
    },
    watch: {
        showDifferences(newValue: boolean) {
            if (newValue) {
                for (let crit in this.criteria) {
                    let unicValues = new Set<string>()
                    for (let product of this.displayedProducts) {
                        unicValues.add(product.parameters[crit])
                    }
                    if (unicValues.size === 1) delete this.criteria[crit as keyof typeof this.criteria]
                }
            } else {
                this.criteria = {
                    "screen": "Экран", 
                    "processor": "Процессор",
                    "memory": "Память", 
                    "battery": "Аккумулятор", 
                    "network": "Поддержка сетей", 
                    "scanner": "Сканер отпечатка пальцев", 
                    "size": "Размеры (ШхВхТ)"
                };
            }
        },
    },
});
</script>