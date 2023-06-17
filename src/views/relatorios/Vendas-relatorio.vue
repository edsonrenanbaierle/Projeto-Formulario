<!-- eslint-disable vue/valid-v-slot -->
<template>
  <Fragment>
    <v-container>
      <v-col cols="10" class="mx-auto">
        <v-data-table
          :headers="headersProducts"
          :items="$products_controller.all_products"
          :loading="$products_controller.loading_table"
          :items-per-page="10"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50],
            itemsPerPageText: 'Produtos por página:',
          }"
          loading-text="Buscando Produtos..."
          no-data-text="Não há produtos"
          class="mt-10"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              small
              color="red"
              @click="openDeleteModal(item.produtoId)"
            >
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-container>
  </Fragment>
</template>
<script>
export default {
  name: "vendasRelatorios",
};
</script>
