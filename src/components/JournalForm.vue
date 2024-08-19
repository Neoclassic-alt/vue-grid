<template>
  <div class="margin-top">
    <p>Лог редактирования</p>
    <ul>
      <li v-for="log in journal" :key="log.timestamp">
        <span v-if="log.action === 'add'">Добавлен пользователь {{ log.name }}</span>
        <span v-if="log.action === 'delete'">Удалён пользователь {{ log.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  journal: { type: Array }
})
</script>

<style scoped>
.margin-top {
  margin-block-start: 1em;
}
</style>
