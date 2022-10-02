<template>
    <div class="container">
        <div class="row my-2">
            <div class="col-2">
                <img
                    src="https://patentoutsourcing.com/files/2314/3765/8544/epo.png"
                    alt="EPO"
                    width="120"
                    class="mx-auto d-table"
                />
            </div>
            <div class="col text-center">
                <div class="row">
                    <h1 class="display-5 text-danger text-decoration-underline">
                        EPO Data Extraction
                    </h1>
                    <h3>Publication, Application and Patent Numbers</h3>
                </div>
            </div>
            <div class="col-2">
                <img
                    src="https://patentoutsourcing.com/files/2314/3765/8544/epo.png"
                    alt="EPO"
                    width="120"
                    class="mx-auto d-table"
                />
            </div>
        </div>

        <div class="input-group my-2">
            <input
                type="file"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
            />
            <button
                class="btn btn-danger"
                type="button"
                id="inputGroupFileAddon04"
            >
                Extract
            </button>
        </div>
        <div class="input-group my-2">
            <textarea class="form-control" rows="4"></textarea>
            <button class="btn btn-success">Extract</button>
        </div>
    </div>
    <div class="row text-center">
        <span class="col display-6 text-danger text-decoration-underline">
            Application Numbers
        </span>
        <span class="col display-6 text-danger text-decoration-underline">
            Publication Numbers
        </span>
        <span class="col display-6 text-danger text-decoration-underline">
            Patent Numbers
        </span>
    </div>
    <div
        class="row text-center"
        style="max-height: 40vh; overflow-y: scroll; margin: 20px"
    >
        <div class="col">
            <div class="card" v-for="i in 30" :key="i">
                <h4 class="card-title">abc - {{ i }}</h4>
            </div>
        </div>
        <div class="col">
            <div class="card" v-for="i in 30" :key="i">
                <h4 class="card-title">abc - {{ i }}</h4>
            </div>
        </div>
        <div class="col">
            <div class="card" v-for="i in 30" :key="i">
                <h4 class="card-title">abc - {{ i }}</h4>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
