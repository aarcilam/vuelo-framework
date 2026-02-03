<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Gráfico de Ejemplo con Chart.js</h2>
    <div class="mb-4">
      <button
        @click="changeChartType"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 mr-2"
      >
        Cambiar Tipo de Gráfico
      </button>
      <span class="text-gray-700">Tipo actual: {{ chartType }}</span>
    </div>
    <div class="relative h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <p class="text-sm text-gray-600 mt-4">
      Este componente demuestra el uso de Chart.js como librería externa.
      La librería se carga automáticamente desde esm.sh CDN.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Registrar los componentes de Chart.js
// Hacer esto de forma segura en caso de que Chart.js aún no esté cargado
try {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarController,
    LineController,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  )
} catch (error) {
  console.warn('Chart.js aún no está disponible, se registrará más tarde:', error)
}

const chartCanvas = ref(null)
const chartType = ref('bar')
let chartInstance = null

const chartTypes = ['bar', 'line']
let currentTypeIndex = 0

const changeChartType = () => {
  currentTypeIndex = (currentTypeIndex + 1) % chartTypes.length
  chartType.value = chartTypes[currentTypeIndex]
}

const createChart = () => {
  if (!chartCanvas.value) return
  
  // Verificar que Chart.js esté disponible
  if (typeof Chart === 'undefined') {
    console.error('Chart.js no está disponible')
    return
  }

  // Asegurar que el canvas tenga un ID único para Chart.js
  if (!chartCanvas.value.id) {
    chartCanvas.value.id = `chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Asegurar que Chart esté registrado
  try {
    Chart.register(
      CategoryScale,
      LinearScale,
      BarController,
      LineController,
      BarElement,
      LineElement,
      PointElement,
      Title,
      Tooltip,
      Legend
    )
  } catch (e) {
    // Ya está registrado, continuar
  }

  // Destruir el gráfico anterior si existe
  if (chartInstance) {
    try {
      chartInstance.destroy()
      chartInstance = null
    } catch (e) {
      console.warn('Error al destruir el gráfico anterior:', e)
    }
  }

  // Verificar si el canvas ya tiene un Chart asociado
  // Chart.js almacena instancias en Chart.instances usando el ID del canvas
  // Necesitamos obtener el Chart asociado al canvas y destruirlo
  try {
    // Chart.js v4+ usa Chart.getChart() para obtener la instancia del canvas
    if (typeof Chart.getChart === 'function') {
      const existingChart = Chart.getChart(chartCanvas.value)
      if (existingChart) {
        existingChart.destroy()
      }
    }
    // Fallback para versiones anteriores o si getChart no está disponible
    else if (Chart.instances) {
      // Buscar la instancia del Chart asociada a este canvas
      const canvasId = chartCanvas.value.id || chartCanvas.value.getAttribute('id')
      if (canvasId && Chart.instances[canvasId]) {
        Chart.instances[canvasId].destroy()
      }
      // Si no tiene ID, buscar por referencia del canvas
      else {
        for (const id in Chart.instances) {
          if (Chart.instances[id] && Chart.instances[id].canvas === chartCanvas.value) {
            Chart.instances[id].destroy()
            break
          }
        }
      }
    }
  } catch (e) {
    // Ignorar errores, continuar con la creación del nuevo Chart
    console.warn('Error al verificar Chart existente:', e)
  }

  const ctx = chartCanvas.value.getContext('2d')
  
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [{
      label: 'Ventas 2024',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    }]
  }

  const config = {
    type: chartType.value,
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Gráfico de ${chartType.value === 'bar' ? 'Barras' : 'Líneas'}`
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: chartType.value === 'bar' ? {
        y: {
          beginAtZero: true
        }
      } : {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  chartInstance = new Chart(ctx, config)
}

// Crear el gráfico cuando el componente se monte
onMounted(() => {
  // Esperar un momento para asegurar que Chart.js se haya cargado desde el CDN
  setTimeout(() => {
    createChart()
  }, 200)
})

// Actualizar el gráfico cuando cambie el tipo
watch(chartType, () => {
  setTimeout(() => {
    createChart()
  }, 100)
})

// Limpiar el gráfico cuando el componente se desmonte
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
