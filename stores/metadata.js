// stores/metadataStore.js
import { defineStore } from "pinia";
import axios from "axios";
import * as cheerio from "cheerio";

export const useMetadataStore = defineStore("metadata", {
  state: () => ({
    metadataList: [],
  }),

  actions: {
    async fetchMetadata(link) {
      this.metadataList = []; // Reset danh sách metadata

      try {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);

        const title = $("head title").text();
        const description = $('meta[name="description"]').attr("content");
        const image = $('meta[property="og:image"]').attr("content");

        this.metadataList = {
          link: link,
          title,
          description,
          image,
        };
      } catch (error) {
        console.error(`Lỗi khi lấy metadata cho link: ${link}`, error);
        this.metadataList.push({
          link: link,
          error: "Không thể lấy metadata",
        });
      }

      console.log(this.metadataList); // In ra metadata
    },
  },
});
