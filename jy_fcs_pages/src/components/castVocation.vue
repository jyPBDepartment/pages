<template>
    <div class="mc-user-info">
    {{name}}
    </div>
</template>
<script>
    import ApiPath from "@/api/ApiPath";
    import api from "@/axios/api";

    export default {
        data() {
            return {
                name: null,
                id:this.vocationId

            }
        },
        methods: {
            getUserName() {
               let params = {
                    id: this.id
                };
                api
                    .testAxiosGet(ApiPath.url.vocationInfoFindId, params)
                    .then((res) => {
                        let code = res.state;
                        this.name = res.data.name;
                    })
                    .catch(function (error) {});
                        }
        },
        watch: {

        },
        mounted: function () {
            console.log(this.id);
            this.getUserName();

        },
        props: {
            vocationId: String,
            required: true
        }
    }
</script>

<style>

</style>