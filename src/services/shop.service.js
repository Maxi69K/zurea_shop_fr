import axios from "axios";

class ShopService {
    static GetRandomBestAds(numberOfAds, bestProduct) {
        return axios.get(`/home/${numberOfAds}/${bestProduct}}`);
    }

    static initPayment(payload) {
        return axios.post('user/init-payment', payload);
    }
}

export default ShopService;