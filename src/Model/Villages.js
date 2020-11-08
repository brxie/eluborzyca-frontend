import Villages from '../ApiClient/Villages'


async function getVillages() {
    let resp = await Villages.villagesGet();
    return resp.data
}

export { getVillages };