import { appConfig } from "../config";
import { http } from "./http";

class NewsService {
  #endpoint = "";
  #key = "";
  constructor() {
    const { endpoint, key } = appConfig.api.news;
    this.#endpoint = endpoint;
    this.#key = key;
  }
  async fetchTopHeadlines() {
    const topHeadlines = await http.get(
      `${this.#endpoint}?country=in&apiKey=${this.#key}`
    );
    return topHeadlines ? topHeadlines["articles"] : [];
  }
}
const newsService = new NewsService();

export { newsService };
