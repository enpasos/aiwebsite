<template>
  <router-view />
</template>

<script setup>
import { useMeta } from 'quasar'

import getMeta from 'assets/get-meta.js'

useMeta({
  title: 'Step by Step to AI',
  titleTemplate: title => `${title} | enpasos.ai`,

  meta: getMeta(
    'enpasos.ai - Step by Step to AI',
    'Step by step towards artificial intelligence, reusing open source code and adding little of our own.'
  )
})
</script>
