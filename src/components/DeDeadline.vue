<template>
  <header px-5 overflow-auto>
    <h1 mt-10 text-5xl font-light >{{ title }}</h1>
    <p mt-1 mb-4 text-md text-gray-5 >{{ description }}</p>
  </header>
</template>

<script setup>
    const props = defineProps({
        title: String,
        description: String
    })
</script>
