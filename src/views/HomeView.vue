<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import CountryItem from '@/components/CountryItem.vue'
</script>

<template>
    <main class="container">
        <h1 class="text-center text-danger display-3 text-decoration-underline">
            Patent Legal Status Extractor
        </h1>
        <div class="row">
            <CountryItem
                srcimg="https://upload.wikimedia.org/wikipedia/commons/7/75/Seal_of_the_United_States_Patent_and_Trademark_Office.svg"
                ptoDesc="Click here to go to the USPTO related page for bulk
                        download of Status, Assignment Changes etc.."
                ptoName="USPTO"
                pageRoute="/uspto"
            />
            <CountryItem
                srcimg="https://patentoutsourcing.com/files/2314/3765/8544/epo.png"
                ptoDesc="Click here to go to the EPO related page for bulk
                        download of Status, Assignment Changes etc.."
                ptoName="EPO"
                pageRoute="/epo"
            />
        </div>
    </main>
</template>

<style></style>
