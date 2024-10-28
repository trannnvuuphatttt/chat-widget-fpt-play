<template>
  <div class="bg-white rounded-tl-[4px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] ">
    <div class=" text-[16px] font-semibold font-sf-pro-display leading-[20.8px] ">
      <button class="tracking-[2%] font-sf-pro-display text-left p-4 hover:text-orange-500 w-full h-53px border-gray-200 border-b-[1px] last:border-b-0" v-for="(item, index) in items.movie">
        <ul>
          <li>
            <a :href="item.link" >
            🎬 Phần {{ index + 1 }} : {{ item.name }}
            </a>
          </li>
        </ul>
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
//Dùng để test giá trị items name
import data from "../movie.json"
const items = data
console.log(data, items)
const props = defineProps({
 
  timeStamp: String
});
</script>

<style></style>

 