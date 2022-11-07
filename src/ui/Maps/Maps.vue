<template>
  <div>
    <yandexMap
      :coords="[55.75, 37.62]"
      zoom="7"
      style="width: 100%; height: 40vh; margin-bottom: 40px"
    >
      <ymapMarker
        v-for="(coord, index) in coor"
        :key="coord[0] + index + coord[1]"
        :marker-id="coord[0] + index + coord[1]"
        :coords="coord"
      ></ymapMarker>
    </yandexMap>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default ({
  name: 'Maps',
  components: { yandexMap, ymapMarker },
  props: {
    coor: Array
  }
});
</script>
