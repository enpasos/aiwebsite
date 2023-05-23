<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-toolbar class="bg-brand-primary text-white">
        <q-toolbar-title class="text-center">
          {{imprint[language]}}
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="layout-padding privacy-policy">
        <p>
          <br/>
          <span class="enpasos"><b>enpasos</b> - Enterprise Patterns &amp; Solutions GmbH</span><br/>
          {{title[language]}}: Dr. Matthias Unverzagt
        </p>
        <p>
          <q-icon name="email"/>&nbsp;
          <a class="text-brand-primary" href="mailto:info@enpasos.com" >
            info@enpasos.com</a><br/>
          <!--q-icon name="phone"/>
          +49 6174 3020<br/-->
          <q-icon name="map"/>&nbsp;
          <a class="text-brand-primary" href="https://www.google.de/maps/place/ENPASOS+-+Enterprise+Patterns+%26+Solutions+GmbH/@50.181903,8.4635701,17z/data=!4m5!3m4!1s0x47bda5c2a51a268b:0x5b66de1d56294f78!8m2!3d50.184026!4d8.463941?hl=de">
            Haint&uuml;rchenstr. 2, D-61462 K&ouml;nigstein</a>
        </p>
        <div class="text-weight-light" v-html="legal[language]"/>
        <div class="text-weight-light" v-html="disclaimer[language]"/>
      </q-card-section>
      <q-toolbar class="bg-brand-primary text-white">
        <q-btn class="full-width" flat  @click="onCancelClick">
          {{back[language]}}
        </q-btn>
      </q-toolbar>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      // onOKClick () {
      //   // on OK, it is REQUIRED to
      //   // call onDialogOK (with optional payload)
      //   onDialogOK()
      //   // or with payload: onDialogOK({ ... })
      //   // ...and it will also hide the dialog automatically
      // },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  },

  data () {
    return {
      language: 'en',
      // opened: false,
      title: {
        de: 'Geschäftsführer',
        en: 'Managing Director'
      },
      back: {
        de: 'zurück',
        en: 'back'
      },
      imprint: {
        de: 'Impressum',
        en: 'Imprint'
      },
      legal: {
        en: `<p>VAT ID: DE 245617005<br/>
             Legal registration at K&ouml;nigstein: HRB 6597</p>`,
        de: `<p>Umsatzsteuer-ID: DE 245617005<br/>
             Registergericht: Amtsgericht K&ouml;nigstein, HRB 6597</p>`
      },
      disclaimer: {
        en: `<p>Disclaimer:<br/>
             Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. If we become aware of any infringements, we will remove such links immediately.</p>`,
        de: `<p>Haftungsausschluß:<br/>
             Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber  der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>`
      }
    }
  }
})
</script>
<style lang="sass">
.q-card__section
  h6
    margin-top: 0px
    margin-bottom: 10px

  p.caption
    margin-top: 0
    &:first-child
      margin-bottom: 0px
</style>
