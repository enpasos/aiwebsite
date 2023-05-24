<template>
  <router-view />
</template>

<script setup>
import { useMeta } from 'quasar'

import getMeta from 'assets/get-meta.js'

useMeta({
  title: 'enpasos.ai',
  titleTemplate: title => `${title} | enpasos.ai`,

  meta: getMeta(
    'enpasos.ai - step by step toward artificial intelligence',
    'Going step by step toward artificial intelligence reusing open source code.'
  )
})
</script>
