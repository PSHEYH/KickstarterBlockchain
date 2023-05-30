import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(
        CampaignFactory.interface,
    ), "0x87EA3fA54cfEE2213B3481382F004a7355C658A3"
)

export default instance;