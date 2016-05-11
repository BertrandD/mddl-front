import map from 'lodash/map'

export default function populateBase(baseId, entities) {
    const base = {...entities.bases[baseId]};
    const buildings = [];
    map(base.buildings, (id) => {
        buildings.push(entities.buildings[id])
    });
    base.buildings = buildings;
    return base;
}