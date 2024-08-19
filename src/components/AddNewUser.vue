<template>
  <form class="horizontal-form" @submit.prevent="(event) => validate(onSubmit, event)">
    <input type="text" placeholder="name" v-model.trim="data.name" />
    <select v-model="data.gender">
      <option>male</option>
      <option>female</option>
    </select>
    <input type="email" placeholder="email" v-model.trim="data.email" />
    <input type="number" placeholder="age" v-model.number="data.age" />
    <button type="submit">Добавить</button>
  </form>
  <p v-if="errorMessage" class="red-text">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const getInitialData = () => ({
  name: '',
  gender: 'male',
  email: '',
  age: ''
})

const data = ref(getInitialData())

function validate(action, event) {
  if (data.value.name === '') {
    errorMessage.value = 'Имя не должно быть пустым'
    return
  }
  if (data.value.email === '') {
    errorMessage.value = 'E-mail не должен быть пустым'
    return
  }
  if (data.value.age === '') {
    errorMessage.value = 'Возраст не должен быть пустым'
    return
  }
  errorMessage.value = ''
  action(event)
}

function onSubmit(e) {
  e.target.dispatchEvent(new CustomEvent('add-row', { bubbles: true, detail: { ...data.value } }))
  emit('add', { ...data.value })
  data.value = getInitialData()
}

const errorMessage = ref('')
</script>

<style scoped>
.horizontal-form {
  display: flex;
  gap: 10px;
  margin-block-end: 10px;
}
.red-text {
  color: red;
}
</style>
