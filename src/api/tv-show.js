import axios from "axios"  
import { BASE_URL, API_KEY_PARAM } from "../config.js"

export class TVShowAPI {
    static async fetchPopulars() {
        const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`)
        console.log("response.data.results populars:",response.data.results)
        return response.data.results
    }
    static async fetchRecommendations(tvShowId) {
        const response = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`)
        console.log("response.data.results reco :",response.data.results)
        return response.data.results
    }
    static async fetchByTitle(title) {
        const response = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`)
        console.log("response.data.results reco :",response.data.results)
        return response.data.results
    }
}