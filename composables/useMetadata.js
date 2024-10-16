import axios from "axios";
import * as cheerio from "cheerio";

export function useMetadata() {
  const getMetadataForLinks = async (link) => {
    const metadataArray = [];

    try {
      const response = await axios.get(link);
      const $ = cheerio.load(response.data);

      const title = $("head title").text();
      const description = $('meta[name="description"]').attr("content");
      const image = $('meta[property="og:image"]').attr("content");

      metadataArray.push({
        link: link,
        title,
        description,
        image,
      });
    } catch (error) {
      console.error(`Lỗi khi lấy metadata cho link: ${link}`, error);
      metadataArray.push({
        link: link,
        error: "Không thể lấy metadata",
      });
    }

    console.log(metadataArray);
    return metadataArray;
  };

  return { getMetadataForLinks };
}
