import { normalize, Schema } from 'normalizr'

export const staticBuilding = new Schema('staticBuildings');
export const user = new Schema('users');
export const player = new Schema('players');
export const base = new Schema('bases');

base.define({
    owner: player
});