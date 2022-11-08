<template>
    <b-modal :id="mode" size="lg" ref="modal">
        <template #modal-header="{ close }">
            <div class="d-flex gap-2" :class="load ? 'opacity-5' : ''">
                <button type="button" class="back-button mt-1" @click="close()">
                    <Icon icon="bx:arrow-back" color="#367bf2" />
                </button>
                <h4 class="modal-title fw-bold">
                    {{ title }}
                </h4>
            </div>
        </template>
        <template #default="{ hide }">
            <div v-if="load" class="loading my-2 justify-content-center load-size text-danger">
                <b-spinner class="w-40px align-middle"></b-spinner>
                <strong class="fs-4">
                    <translate>Loading...</translate>
                </strong>
            </div>
            <div :class="load ? 'opacity-5' : ''">
                <form @submit.stop.prevent="saveCampaign" :class="validation ? 'was-validated' : ''">
                    <div id="generalInfo">

                        <label class="fw-bold pb-3">
                            <translate> General Info </translate>
                        </label>
                        <b-form-input ref="name" type="text" class="input-style mb-3" placeholder="Name"
                            v-model="form.name" required>
                        </b-form-input>

                        <b-form-input ref="comment" type="text" class="input-style mb-3" placeholder="Comment"
                            v-model="form.comment" required>
                        </b-form-input>

                        <div class="d-flex gap-2 align-items-center mb-3">
                            <b-form-select ref="accountList"
                                v-if="mode === 'create' && accountsList && accountsList.length > 0"
                                class="select-style col" v-model="form.accountId" required>
                                <b-form-select-option value="">
                                    <translate>Choose an account</translate>
                                </b-form-select-option>
                                <b-form-select-option v-for="account in accountsList" :key="account.id"
                                    :value="account.id">
                                    {{ account.name }}
                                </b-form-select-option>
                            </b-form-select>

                            <b-form-input ref="budget" type="number" class="input-style col" placeholder="Budget"
                                v-model="form.budget" required></b-form-input>
                            <div class="position-relative col px-0">
                                <Icon class="calendar-icon" icon="akar-icons:calendar" color="#367bf2" width="22" />
                                <DateRangePicker class="form-control select-style ps-3 bg-white h-100"
                                    :value.sync="form.dates" placeholder="For the entire period"
                                    :class="dateflag ? '' : 'date-valid'" />
                            </div>
                        </div>

                        <b-form-textarea ref="description" class="input-style mb-3" placeholder="Description"
                            id="floatingTextarea" v-model="form.description" style="height:100px" required>
                        </b-form-textarea>
                    </div>

                    <div class="d-flex justify-content-between mb-1">
                        <div class="d-flex gap-2 flex-wrap">
                            <div class="chip" v-for="item in form.files" :key="id">
                                <Icon icon="akar-icons:file" color="gray" :horizontalFlip="true" width="16px" />
                                <span>{{ item.name }}</span>
                                <button type="button" class="btn-close" aria-label="Close" style="width:3px; height:3px"
                                    @click="deleteFile(item.id)"></button>
                            </div>
                        </div>
                        <div class="d-flex">
                            <input @change="previewfile($event)" type="file" :id="'inputGroupFile01' + mode"
                                style="width:0px;">
                            <label class="attach-file" :for="'inputGroupFile01' + mode">
                                <Icon icon="bx:cloud-upload" height="27" />
                                Attach file
                            </label>
                        </div>
                    </div>

                    <div id="targetAudience">
                        <label class="fw-bold pb-3">
                            <translate> The target audience </translate>
                        </label>

                        <div class="w-100">
                            <b-form-tags class="input-style mb-3" :input-attrs="{ 'list': 'geolocation' }"
                                input-id="tags-basic" v-model="currentGeos" remove-on-delete placeholder="Geolocation">
                            </b-form-tags>
                            <datalist id="geolocation">
                                <option v-for="item in filteredGeos" :key="item.id" :value="item.name" />
                            </datalist>
                        </div>

                        <div class="w-100">
                            <b-form-tags class="input-style mb-3" :input-attrs="{ 'list': 'topic' }"
                                input-id="tags-basic" v-model="currentBlogCategory" remove-on-delete
                                placeholder="Topic"></b-form-tags>
                            <datalist id="topic">
                                <option v-for="item in filteredTopics" :key="item.id" :value="item.name">
                                </option>
                            </datalist>
                        </div>


                        <div class="d-flex w-50 gap-2 align-items-center mb-3">
                            <label for="age" class="age-style" style="margin-top:-9px">Age</label>
                            <b-form-input type="number" class="input-style" placeholder="From"
                                v-model.number="form.ageFrom" :state="validation ? ageState : null" required />
                            <label style="margin-top:-9px"> - </label>
                            <b-form-input type="number" class="input-style" placeholder="Until"
                                v-model.number="form.ageTo" :state="validation ? ageState : null" required />
                            <b-form-select class="input-style ms-2" v-model="form.sex">
                                <b-form-select-option value="both">
                                    <translate>All</translate>
                                </b-form-select-option>
                                <b-form-select-option value="male">
                                    <translate>Male</translate>
                                </b-form-select-option>
                                <b-form-select-option value="female">
                                    <translate>Female</translate>
                                </b-form-select-option>
                            </b-form-select>
                        </div>
                        <b-form-invalid-feedback v-if="validation" :state="ageState">
                            Ensure this value is bigger than or equal to 13 and less than or equal to 65.
                        </b-form-invalid-feedback>
                    </div>

                    <div id="barter">
                        <label for="barter" class="fw-bold pb-3">
                            <translate>Barter</translate>
                        </label><br />
                        <label class="age-style pb-2">
                            <translate>Leave filed empty, if you don't use barter</translate>
                        </label>
                        <div class="d-flex gap-2 align-items-center mb-3">
                            <div class="w-50">
                                <b-form-input type="text" class="form-control input-style"
                                    placeholder="Product/service name" v-model="form.barterName" />
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <div>
                                    <b-form-input type="text" class="form-control input-style"
                                        v-model="form.barterPrice" placeholder="Price, $" />
                                </div>
                                <div class="alert alert-warning waring-style" role="alert" style="width:258px">
                                    <Icon icon="akar-icons:info" width="24px" color="#fd9f00" />
                                    Barter cost can be adjusted by the system
                                </div>
                            </div>
                        </div>
                        <b-form-textarea class="form-control input-style mb-0 " placeholder="Barter description"
                            v-model="form.barterDescription" id="floatingTextarea" style="height:100px">
                        </b-form-textarea>
                    </div>
                </form>
            </div>
        </template>
        <template #modal-footer="{ cancel, hide }">
            <div class="d-flex w-100 gap-2" :class="load ? 'opacity-5' : ''">
                <div class="reach-style">
                    <translate>Reach:</translate>
                    <span class="fw-bold">{{ parseInt(form.budget * 57.347) }}</span>
                </div>
                <b-button class="input-style" @click="cancel()" variant="outline-primary">
                    Cancel
                </b-button>
                <b-button class="input-style" variant="dark" @click="handleOk($event)">
                    {{ save }}
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
  
<script>

import DateRangePicker from '@/components/global/DateRangePicker.vue'
import Multiselect from 'vue-multiselect';
import { mapActions, mapState } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
    name: 'CampaignCreatePopup',
    props: ['mode', "id"], // mode === 'create' || 'edit' || 'influencer'
    components: {
        Icon,
        DateRangePicker,
        Multiselect,
    },
    data() {
        return {
            title: '',
            save: "",
            validation: false,
            dateflag: true,
            filteredGeos: [],
            filteredTopics: [],
            currentGeos: [],
            currentBlogCategory: [],
            state: {
                name: null,
                age: null,
                comment: null,
                accountId: null,
                budget: null,
                description: null,
            },
            form: {
                name: '',
                comment: '',
                accountId: '',
                budget: '',
                description: '',
                dates: null,
                blogCategory: [],
                geos: [],
                ageFrom: '',
                ageTo: '',
                sex: 'both',
                barterId: null,
                barterName: null,
                barterPrice: '',
                barterDescription: '',
                files: [],
            },
            load: false,
        }
    },
    computed: {
        ...mapState(['accountsList']),
        ageState() {
            return this.form.ageFrom >= 13 && this.form.ageTo >= this.form.ageFrom;
        }
    },
    watch: {
        id: {
            handler(val) {
                this.loadfunction();
            }
        },
        'form.dates': {
            handler(val) {
                this.validfunc();
            }
        },
    },
    created() {
        this.getGeoList('all').then(response => this.filteredGeos = response.data);
        this.getTopicsList('all').then(response => this.filteredTopics = response.data);
        this.loadfunction();
    },
    methods: {
        ...mapActions([
            'getGeoList',
            'getTopicsList',
            'getCampaign',
            'postCampaignCreate',
            'postCampaignFiles',
            'postInfluencerCampaignCreate',
            'putCampaignData',
        ]),

        handleOk(bvModalEvent) {
            bvModalEvent.preventDefault();
            this.saveCampaign()
        },
        checkFormValidity() {
            this.validation = true;
            let flag = true;
            this.state.age = this.form.ageFrom >= 13 && this.form.ageTo >= this.form.ageFrom && this.form.ageTo <= 65;
            flag = flag && this.state.age;
            this.state.name = this.$refs.name.checkValidity();
            flag = flag && this.state.name;
            this.state.comment = this.$refs.comment.checkValidity();
            flag = flag && this.state.comment;
            if (this.mode !== "edit") {
                this.state.accountId = this.form.accountId ? true : false;
                flag = flag && this.state.accountId;
            }
            this.state.budget = this.$refs.budget.checkValidity();
            flag = flag && this.state.budget;
            this.state.description = this.$refs.description.checkValidity();
            flag = flag && this.state.description;
            this.dateflag = this.form.dates ? true : false;
            return flag;
        },
        validfunc() {
            if (this.validation)
                this.dateflag = this.form.dates ? true : false;
            else
                this.dateflag = true;
        },
        loadGeoTopicsList() {
            this.form.geos = [];
            this.form.blogCategory = [];
            this.currentGeos.map(res => {
                const tmp = this.filteredGeos.filter(geo => geo.name === res);
                this.form.geos.push(tmp[0]);
            });
            this.currentBlogCategory.map(res => {
                const tmp = this.filteredTopics.filter(topic => topic.name === res);
                this.form.blogCategory.push(tmp[0]);
            })
        },
        loadfunction() {
            this.dateflag = true;
            this.validation = false;
            if (this.mode == "create") {
                this.save = "Create"
                this.title = "Creation of a New ad Campaign";
            }
            else if (this.mode == "edit") {
                this.save = "Save";
                this.title = "Campaign Editing"
                this.getCampaign(this.id).then(response => {
                    let dates = [];
                    if (response.start_date) {
                        dates.push(new Date(response.start_date).toLocaleDateString("en-GB").split('/').join('.'))
                    }
                    if (response.end_date) {
                        dates.push(new Date(response.end_date).toLocaleDateString("en-GB").split('/').join('.'))
                    }
                    this.form = {
                        ...this.form,
                        name: response.name || '',
                        comment: response.comment || '',
                        budget: response.budget || '',
                        dates: dates ? dates.join(' — ') : null,
                        description: response.initial_description || '',
                        blogCategory: response.blog_category || [],
                        files: response.files || [],
                        geos: response.geos || [],
                        ageFrom: response.desired_age[0] || '',
                        ageTo: response.desired_age[1] || '',
                        sex: response.sex || 'both',
                    }
                    this.form.geos.map(res => {
                        this.currentGeos.push(res.name);
                    })
                    this.form.blogCategory.map(res => {
                        this.currentBlogCategory.push(res.name);
                    })
                    if (response.barters.length) {
                        this.form['barterId'] = response.barters[0].id;
                        this.form['barterName'] = response.barters[0].name || '';
                        this.form['barterPrice'] = response.barters[0].price || '';
                        this.form['barterDescription'] = response.barters[0].description || '';
                    }
                })
            }
        },
        previewfile(event) {
            const fileList = event.target.files;
            if (fileList.length) {
                this.currentFile = [...fileList];
                this.currentFile.map(file => {
                    const formData = new FormData();
                    formData.append('attachment', file);
                    this.postCampaignFiles(formData).then(response => {
                        this.form.files.push(response.data);
                        console.log(response.data);
                    });
                })
            }
        },
        deleteFile(id) {
            this.form.files = this.form.files.filter(file => file.id !== id);
        },
        async saveCampaign() {

            console.log("this.form.files=>", this.form.files)
            await this.loadGeoTopicsList();
            if (!this.checkFormValidity()) {
                return
            }
            this.load = true;
            const [dateFrom, separator, dateTo] = this.form.dates.split(' ');

            const reqData = {
                name: this.form.name,
                comment: this.form.comment,
                account_id: this.form.accountId,
                budget: this.form.budget,
                initial_description: this.form.description,
                start_date: dateFrom.split('.').reverse().join('-'),
                end_date: dateTo.split('.').reverse().join('-'),
                blog_category: this.form.blogCategory.map(category => category.id),
                geos: this.form.geos.map(geo => geo.id),
                desired_age: [this.form.ageFrom, this.form.ageTo],
                sex: this.form.sex,
                barters: [
                    {
                        id: this.form.barterId ?? null,
                        name: this.form.barterName ?? null,
                        price: this.form.barterPrice ?? 0,
                        description: this.form.barterDescription ?? null
                    }
                ],
                files: this.form.files.map(file => file.id),
            };
            if (this.mode === 'create') {

                this.postCampaignCreate(reqData).then(res => {
                    console.log(res, '===========');
                    this.load = false;
                    this.$bvModal.hide(this.mode);
                    this.$router.push({ name: 'onboarding' });
                }).catch(err => {
                    this.load = false;
                });
            }
            else if (this.mode === 'edit') {
                reqData.campaignId = this.id;
                this.putCampaignData(reqData)
                    .then(res => {
                        console.log(res, '=======');
                        this.load = false;
                        this.validation = false;
                        this.dateflag = true;
                        this.$bvModal.hide(this.mode);
                    })
                    .catch(err => {
                        this.load = false;
                    });
            }
        },
    },
}
</script>
  
<style scoped lang="scss">
@import '@/style/campaign.scss';
@import 'vue-multiselect/dist/vue-multiselect.min.css';

.date-valid {
    border-color: red !important;
}

.load-size {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
}
</style>
  