<template>
  <div class="main">
    <header class="header">
      <button class="header__button" @click="createPoints">Создать массив</button>
      <span class="header__text">version 0.1</span>
    </header>
    <div class="content">
      <Maps v-if="Object.keys(dataCoords).length" :coor="pointsMap"/>
      <Chart
        v-if="Object.keys(dataCoords).length"
        :data="dataCoords"
        @click="(value) => selectArea(value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Maps from '@/ui/Maps/Maps.vue';
import Chart from '@/ui/Chart/Chart.vue';
import pointInPolygon from '@turf/boolean-point-in-polygon';
import data from '@/data/data.json';
import { computed, defineComponent, reactive } from 'vue';

type dataTypes = {
  type: string,
  properties: {
    NAME: string,
    OKATO: string,
    ABBREV: string,
  },
  geometry: {
    type: any,
    coordinates: any[]
  }
}

export default defineComponent({
  components: {
    Chart,
    Maps,
  },
  setup() {
    let dataCoords = reactive<any[]>([])
    let choiceArea = reactive<string[]>([])

    const createPoints = () => {
      dataCoords.splice(0)
      let i = 0

      while (i < 100) {
        const theta: number = Math.random() * 2 * Math.PI;
        const r: number = Math.sqrt(Math.random());

        const x:number = 55 + Number(((Math.cos(theta) * r / 0.0062 + 74) / 100).toFixed(2));
        const y:number = 37 + Number(((Math.sin(theta) * r / 0.0047 + 62) / 100).toFixed(2));

        data.features.forEach((item: dataTypes) => {
          if (pointInPolygon([y, x], item.geometry)) {
            let index:number = dataCoords.findIndex((district: { name: string; }) => district.name === item.properties.ABBREV);

            if(index > -1) {
              dataCoords[index].lengthCoor = dataCoords[index].lengthCoor + 1;
              dataCoords[index].coor.push([x, y])
            } else {
              dataCoords.push({ name: item.properties.ABBREV, lengthCoor: 1, coor: [[x, y]] });
            }
            i++
          }
        });
      }
    }

    const selectArea = (name) => {
      choiceArea.includes(name)
        ? choiceArea.splice(choiceArea.indexOf(name), 1)
        : choiceArea.push(name)
    }

    // eslint-disable-next-line vue/return-in-computed-property
    const pointsMap = computed(() => {
      return choiceArea.length
        ? dataCoords.filter(item => choiceArea.includes(item.name)).reduce((prev, next) => [...prev, ...next.coor], [])
        : dataCoords.reduce((prev, next) => [...prev, ...next.coor], [])
    })

    return {
      createPoints,
      selectArea,
      dataCoords,
      pointsMap
    }

  }
});
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #457b45;
  color: white;
  &__button {
    border: 1px solid white;
    border-radius: 20px;
    background-color: #457b45;
    padding: 10px 15px;
    color: white;
  }
}
.content {
  margin-top: 150px;
}
</style>
