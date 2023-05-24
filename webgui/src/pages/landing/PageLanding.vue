<template>
  <div class="landing-page q-px-lg doc-brand">
    <doc-stars />

    <div>
      <div class="column items-center intro-section letter-spacing-375">
        <q-img src="https://enpasos.ai/logo-vertical-dark.svg" width="300px" height="270px" />

        <h1 class="letter-spacing-375 landing-my-large text-center text-white text-size-20 primary-line-height">
          Step by Step to AI
        </h1>

        <q-btn
          label="Start"
          class="call-to-action-btn shadow-bottom-small"
          to="docs"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
import { useMeta, scroll } from 'quasar'

import DocStars from 'src/components/DocStars.vue'

useMeta({
  title: 'Step by Step to AI',
  titleTemplate: ''
})

function goToSection (sectionId) {
  const el = document.getElementById(sectionId)
  el && scroll.setVerticalScrollPosition(window, el.offsetTop, 400)
}

const scrollSectionIntoView = {
  whyQuasar: () => goToSection('why-quasar-section'),
  sponsors: () => goToSection('sponsors-section')
}
</script>

<style lang="sass">
$support-quasar-background-padding: 35vw

.landing-page

  .btn-underline
    border-bottom: 1px solid rgba($color: white, $alpha: 0.54)

  .social-channels-call-to-action
    // undo margin from q-page
    margin: 0 -24px 0 -24px

  q
    display: block

  .sponsors
    margin-top: 80px
    margin-bottom: 208px

    &__list
      margin-bottom: 208px

  .showcase-section
    margin-top: 258px

  // The pseudo-element expands to the full height and width of the container,
  // the container padding is needed to allow to display the hands without cropping
  .support-quasar-section
    padding-top: 256px
    padding-bottom: $support-quasar-background-padding
    position: relative

    &:before
      background-image: url(https://cdn.quasar.dev/img/landing-page/astronaut-left-hand.png), url(https://cdn.quasar.dev/img/landing-page/astronaut-right-hand.png)
      background-size: 47%, 47%
      background-position: left bottom, calc(100% + 25px) calc(100% - #{$support-quasar-background-padding / 3})
      background-repeat: no-repeat, no-repeat
      bottom: 0px
      content: ''
      left: -24px
      position: absolute
      right: -24px
      top: 0px

    &__content
      width: 940px
      max-width: 90vw

  .sponsors-section
    margin-top: 200px

    @media screen and (min-width: $breakpoint-md-max)
      height: calc(100vh - $header-height)

  .intro-section
    margin-top: 60px
    margin-bottom: 208px

    @media screen and (min-height: 980px)
      margin-top: 100px

      &__sponsors-heading
        margin-top: 80px !important

  h2
    line-height: 1.5em

  // We need a thickness of 2px but the default is 1px, and there's no
  // prop to modify it from within quasar
  .q-btn--outline:before
    border: 2px solid $brand-accent
    box-shadow: 0 1px 1px 0 rgba(#000, 0.12)
</style>
