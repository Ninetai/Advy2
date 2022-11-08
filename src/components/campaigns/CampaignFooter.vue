<template>
    <div class="foot">
        <div class="foot-card card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-4 text-muted">
                        <translate>Best Campaign</translate>
                    </h6>
                    <DropMenu />
                </div>
                <h4 class="card-title fw-bold">21% - Coca Cola</h4>
                <div class="p-2"></div>
                <div class="d-flex gap-3 mt-5">
                    <span>01.09.2022</span>
                    <span>31.09.2022</span>
                </div>
            </div>
        </div>

        <div class="foot-card card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-4 text-muted">
                        <translate>Top bloggers, ER %</translate>
                    </h6>
                    <DropMenu />
                </div>
                <div class="d-flex align-items-center gap-2 pb-2 mt-1" v-for="item in bloggeritems" :key="item.id">
                    <h4 class="fw-bold mb-0">{{item.id}}</h4>
                    <img :src="item.imgsource" width="30px" alt="">
                    <span>{{item.value}} </span>
                </div>
            </div>
        </div>

        <div class="foot-card card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-4 text-muted">
                        <translate>Other companies</translate>
                    </h6>
                    <DropMenu />
                </div>
                <div class=" d-flex gap-2 pt-3">
                    <div v-for="company in companies" :key="company.name" class="foot-box">
                        <img :src="company.imgsource" alt="" style="margin-top:-25px">
                        <div class="fw-bold" style="margin-top:-15px">{{company.name}}</div>
                        <p>{{company.value}} </p>
                        <button class="btn btn-dark card-button">
                            Normal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DropMenu from "../global/DropMenu.vue"
import user1 from "@/assets/users/user1.png";
import user2 from "@/assets/users/user2.png";
import user3 from "@/assets/users/user3.png";
import Artur from "@/assets/users/Artur.png";
import Artur1 from "@/assets/users/Artur-1.png";
import Artur2 from "@/assets/users/Artur-2.png";
export default {
    components: {
        DropMenu
    },
    data() {
        return {

            bloggeritems: [
                { id: 1, imgsource: user1, value: 'Алекс - 19,1% ' },
                { id: 2, imgsource: user2, value: 'Марта - 17,8% ' },
                { id: 3, imgsource: user3, value: 'Ангелина - 17,4% ' },
            ],
            companies: [
                { name: 'StarBucks', value: 'CTR 18,47%', imgsource: Artur },
                { name: 'Mercedes', value: 'CTR 18,47%', imgsource: Artur1 },
                { name: 'BMW', value: 'CTR 18,47%', imgsource: Artur2 }
            ]
        }
    }
}
</script>

<style scoped>
@import '@/style/campaign.scss';
</style>