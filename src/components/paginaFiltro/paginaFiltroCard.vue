<script setup>
//import { addCarrinho } from '@/utils/cartUtils'
//import { toggleFavorito, isFavorito } from '@/utils/favoritosUtils'
//import { formataPreco } from '@/utils/currencyUtils'

const props = defineProps(['id', 'nome', 'sigla', 'municipio', 'uf', 'categoria', 'situacao', 'site', 'rating'])
console.log(props.id)

//function adicionarAoCarrinho() {
//  addCarrinho(props.id, 1)
//}

//function favoritar() {
//  toggleFavorito(props.id)
//}
</script>

<template>
  <div class="container">
    {{ props.id }}
    <h2>{{ nome }}</h2>
      <p>{{  }}</p>
      <h3>{{  }}</h3>
      <!--
        <div class="botoes">
          <button class="btn-carrinho" @click="adicionarAoCarrinho">Adicionar ao Carrinho</button>
          <button class="btn-favorito" @click="favoritar">
            <font-awesome-icon :icon="isFavorito(id) ? 'fas fa-heart' : 'far fa-heart'" />
          </button>
        </div>
        -->
  </div>
</template>

<style scoped>

</style>
