<template>
    <flat-pickr v-model="dataValue" :config="config" :placeholder="placeholder"></flat-pickr>
</template>
  
<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { getLanguage } from "@/services/locale.service";
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import { Polish } from 'flatpickr/dist/l10n/pl.js'
var English = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",],
    },
    months: {
        shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 1,
    ordinal: function (nth) {
        const s = nth % 100;
        if (s > 3 && s < 21) return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " - ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false,
};
export default {
    name: 'UiDateRangePicker',
    components: {
        flatPickr,
    },
    props: ['value', 'placeholder'],
    data() {
        return {
            config: {
                mode: 'range',
                dateFormat: 'd.m.Y',
                maxDate: new Date(new Date().getFullYear() + 2, 11, 31),
                minDate: '2020.12.30',
                conjunction: ' \u2013 ',
                locale: null,
            },
        }
    },
    computed: {
        dataValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('update:value', value);
            },
        },
    },
    mounted() {
        const lang = getLanguage();
        if (lang === "ru")
            this.config.locale = Russian;
        else if (lang == "en")
            this.config.locale = English;
        else if (lang == "pl")
            this.config.locale = Polish;
    },
    methods: {
    }
}
</script>
  
<style scoped>

</style>
  
