import Units from '../ApiClient/Units'


async function getUnits() {
    let resp = await Units.unitsGet();
    return resp.data
}

export { getUnits };
  