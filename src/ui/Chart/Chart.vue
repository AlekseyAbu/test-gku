<template>
  <div class="hello" ref="chart"/>
</template>

<script lang="ts">
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {
  defineComponent, onMounted, ref, toRaw,
} from 'vue';

export default defineComponent({
  name: 'Chart',
  props: {
    data: Object,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const chart = ref<HTMLDivElement>();

    onMounted(() => {
      let chartD = am4core.create(chart.value, am4charts.PieChart);

      let json = [];
      for (let dataKey in props.data) {
        json.push(toRaw(props.data[`${dataKey}`]))
      }

      chartD.data = json;

      const pieSeries = chartD.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'lengthCoor';
      pieSeries.dataFields.category = 'name';

      pieSeries.slices.template.events.on('hit', (ev) => {
        emit("click", ev.target.dataItem.properties.category);
      });
    });

    return {
      chart,
    };
  },
});
</script>
