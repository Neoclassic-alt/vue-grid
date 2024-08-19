<script setup>
import { onMounted, watch } from 'vue'
import { useGrid } from '@/composables/grid'

const props = defineProps({
  customId: { type: String },
  rows: { type: Object, required: true },
  columns: { type: Object, required: true }
})

let gridApi

onMounted(() => {
  useGrid(props.customId ? `#${props.customId}` : '#gridTable').then((res) => {
    gridApi = res
    gridApi.setGridOption('rowData', props.rows)
    gridApi.setGridOption('columnDefs', props.columns)
  })
})

watch(
  () => props.rows,
  (newData) => {
    gridApi.setGridOption('rowData', newData)
  },
  {
    deep: true
  }
)

watch(
  () => props.columns,
  (newData) => {
    gridApi.setGridOption('columnDefs', newData)
  },
  {
    deep: true
  }
)
</script>

<template>
  <div
    :id="customId ?? 'gridTable'"
    class="ag-theme-quartz"
    style="width: 1000px; height: 500px"
  ></div>
</template>
