<template>
  <main ref="grid">
    <AddNewUser @add="(data) => users.push(transform(data))" />
    <GridTable custom-id="myGrid" :rows="users" :columns="columns" />
    <JournalForm :journal="journal" />
  </main>
</template>

<script setup>
import { onMounted, ref, reactive, watchPostEffect } from 'vue'
import axios from 'axios'
import GridTable from '@/components/GridTable.vue'
import DeleteButtonComponent from '@/composables/deleteButton'
import AddNewUser from '@/components/AddNewUser.vue'
import JournalForm from '@/components/JournalForm.vue'

const users = ref([])
const grid = ref(null)

onMounted(() => {
  axios
    .get('https://randomuser.me/api/?results=5&inc=name,gender,email,dob')
    .then((response) => {
      users.value = response.data.results
    })
    .catch((error) => {
      console.error(error)
    })
})

DeleteButtonComponent.users = users // придумал послать данные через статическое свойство. Если кто-то может сделать лучше, скажите

const columns = reactive([
  { field: 'name.first', headerName: 'First name' },
  { field: 'gender' },
  { field: 'email' },
  { field: 'dob.age', headerName: 'Age' },
  { field: 'action', headerName: 'Action', cellRenderer: DeleteButtonComponent }
])

function transform(user) {
  const row = user
  row.name = {
    first: user.name
  }
  row.dob = {
    age: user.age
  }
  return row
}

watchPostEffect(() => {
  grid.value.addEventListener('add-row', (e) => {
    journal.push({
      action: 'add',
      name: e.detail.name,
      timestamp: Date.now()
    })
  })

  grid.value.addEventListener('delete-row', (e) => {
    journal.push({
      action: 'delete',
      name: e.detail.name.first,
      timestamp: Date.now()
    })
  })
})

const journal = reactive([])
</script>
