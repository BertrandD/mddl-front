import { normalize, Schema, arrayOf } from 'normalizr'

export const staticBuilding = new Schema('staticBuildings');
export const staticItem = new Schema('staticItems', { idAttribute: 'itemId'} );
export const user = new Schema('users');
export const player = new Schema('players');
export const base = new Schema('bases');
export const building = new Schema('buildings');
export const pm = new Schema('pms');
export const report = new Schema('report');
export const astralObject = new Schema('astralObject');

player.define({
    bases: arrayOf(base),
    currentBase: base
});

base.define({
    buildings: arrayOf(building),
    planet: astralObject
});

astralObject.define({
    satellites: arrayOf(astralObject)
});